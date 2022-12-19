const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const User = require('../models/user.model');

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name avtar')
      .populate('chat');
    res.send(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).send('Invalid data passed into request');
  }
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate('sender', 'name avtar');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name avtar email',
    });
    console.log('message: ', message);

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(201).send(message);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getAllMessage, sendMessage };
