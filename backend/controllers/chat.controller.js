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
const createGroupChat = async () => {};
const addToGroup = async () => {};
const renameGroup = async () => {};
const removeFromGroup = async () => {};

module.exports = {
  accessChat,
  getAllChat,
  createGroupChat,
  addToGroup,
  renameGroup,
  removeFromGroup,
};
