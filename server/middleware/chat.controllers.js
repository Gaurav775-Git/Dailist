const mongoose = require('mongoose');

const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

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

    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
