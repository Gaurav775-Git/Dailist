const mongoose = require('mongoose');

const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const User = require('../models/user_account');
const UserProfile = require('../models/user_profile');

exports.createChat = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
      isGroup: false,
    });

    if (!chat) {
      chat = await Chat.create({
        members: [senderId, receiverId],
      });
    }

    const populated = await Chat.findById(chat._id)
      .populate('members', 'name')
      .populate({ path: 'lastMessage', select: 'text createdAt' })
      .lean();

    const otherMember = populated.members?.find((m) => String(m._id) !== String(senderId));
    let otherImage = null;
    if (otherMember) {
      const profile = await UserProfile.findOne({ user_id: otherMember._id }).select('image').lean();
      otherImage = profile?.image || null;
    }
    res.json({
      _id: String(populated._id),
      members: populated.members?.map((m) => ({ _id: String(m._id), name: m.name })) || [],
      otherMember: otherMember ? {
        _id: String(otherMember._id),
        name: otherMember.name,
        image: otherImage,
      } : null,
      lastMessage: populated.lastMessage || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getChats = async (req, res) => {
  const userId = req.user.id;

  try {
    const chats = await Chat.find({ members: userId, isGroup: false })
      .populate('members', 'name')
      .populate({ path: 'lastMessage', select: 'text createdAt' })
      .sort({ updatedAt: -1 })
      .lean();

    const userIdStr = String(userId);
    const otherIds = [...new Set(chats.flatMap((c) => c.members.filter((m) => String(m._id) !== userIdStr).map((m) => m._id)))];
    const profiles = await UserProfile.find({ user_id: { $in: otherIds } }).select('user_id image').lean();
    const profileByUser = Object.fromEntries(profiles.map((p) => [String(p.user_id), p.image]));

    const chatsWithOther = chats.map((chat) => {
      const otherMember = chat.members.find((m) => String(m._id) !== userIdStr);
      return {
        _id: String(chat._id),
        otherMember: otherMember ? {
          _id: String(otherMember._id),
          name: otherMember.name || 'Unknown',
          image: profileByUser[String(otherMember._id)] || null,
        } : null,
        lastMessage: chat.lastMessage ? { text: chat.lastMessage.text, createdAt: chat.lastMessage.createdAt } : null,
      };
    });

    res.json(chatsWithOther);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getUsersForChat = async (req, res) => {
  const userId = req.user.id;

  try {
    const users = await User.find({ _id: { $ne: userId } }).select('_id name').lean();
    const userIds = users.map((u) => u._id);
    const profiles = await UserProfile.find({ user_id: { $in: userIds } }).select('user_id image').lean();
    const profileByUser = Object.fromEntries(profiles.map((p) => [String(p.user_id), p.image]));
    res.json(users.map((u) => ({
      _id: String(u._id),
      name: u.name || 'Unknown',
      image: profileByUser[String(u._id)] || null,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
