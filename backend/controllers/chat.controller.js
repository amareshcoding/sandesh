const Chat = require('../models/chat.model');
const User = require('../models/user.model');

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.sendStatus(400);
  }
  try {
    var isChatExist = await Chat.find({
      isGroupChat: false,
      $and: [
        {
          user: { $elemMatch: { $eq: req.user._id } },
        },
        {
          user: { $elemMatch: { $eq: userId } },
        },
      ],
    })
      .populate('user', '-password')
      .populate('latestMessage');
    isChatExist = await User.populate(isChatExist, {
      path: 'latestMessage.sender',
      select: 'name avtar email',
    });
    if (isChatExist.length > 0) {
      res.send(isChatExist[0]);
    } else {
      const newChat = {
        chatMane: 'sender',
        isGroupChat: false,
        user: [req.user._id, userId],
      };

      const createChat = await Chat.create(newChat);

      const getChat = await Chat.findOne({ _id: createChat._id }).populate(
        'user',
        '-password'
      );
      res.status(200).send(getChat);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getAllChat = async (req, res) => {
  try {
    var allChats = await Chat.find({
      user: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('user', '-password')
      .populate('groupAdmins', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    allChats = await User.populate(allChats, {
      path: 'latestMessage.sender',
      select: 'name avtar email',
    });
    res.send(allChats);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(401).send({
      message: 'Please fill all the feilds',
    });
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(401).send({
      message: 'More than 2 users required for a group',
    });
  }
  users.push(req.user);
  try {
    const newGroupChat = await Chat.create({
      chatMane: req.body.name,
      isGroupChat: true,
      user: users,
      groupAdmin: req.user,
    });

    const groupDetails = await Chat.findOne({ _id: newGroupChat._id })
      .populate('user', '-password')
      .populate('groupAdmin', '-password');
    res.status(201).json(groupDetails);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const addOne = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { user: userId },
      },
      { new: true }
    )
      .populate('user', '-password')
      .populate('groupAdmin', '-password');
    if (!addOne) {
      res.status(404);
      throw new Error('Chat Not Found');
    } else {
      res.json(addOne);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate('user', '-password')
      .populate('groupAdmin', '-password');
    if (!updatedChat) {
      res.status(404);
      throw new Error('Chat Not Found');
    } else {
      res.json();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const removeOne = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { user: userId },
      },
      { new: true }
    )
      .populate('user', '-password')
      .populate('groupAdmin', '-password');
    if (!removeOne) {
      res.status(404);
      throw new Error('Chat Not Found');
    } else {
      res.json(removeOne);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  accessChat,
  getAllChat,
  createGroupChat,
  addToGroup,
  renameGroup,
  removeFromGroup,
};
