const mongoose = require('mongoose');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

exports.createMessage = async (req, res) => {
  const { chatId, text } = req.body;
  const sender = req.user.id;

  try {
    const newMessage = await Message.create({
      chatId,
      sender,
      text,
    });

    await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

    const populated = await Message.findById(newMessage._id).populate('sender', 'name').lean();
    res.status(201).json({
      _id: String(populated._id),
      text: populated.text,
      sender: populated.sender ? { _id: String(populated.sender._id), name: populated.sender.name } : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate('sender', 'name')
      .lean();
    const formatted = messages.map((m) => ({
      _id: String(m._id),
      text: m.text,
      sender: m.sender ? { _id: String(m.sender._id), name: m.sender.name } : null,
    }));
    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
