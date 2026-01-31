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

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).populate('sender', 'name');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
