const { Router } = require('express');
const chatRoute = Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  accessChat,
  getAllChat,
  createGroupChat,
  addToGroup,
  renameGroup,
  removeFromGroup,
} = require('../controllers/chat.controller');
//
chatRoute.route('/').post(authMiddleware, accessChat);
chatRoute.route('/').get(authMiddleware, getAllChat);
chatRoute.route('/group').post(authMiddleware, createGroupChat);
chatRoute.route('/group/add').put(authMiddleware, addToGroup);
chatRoute.route('/group/rename').put(authMiddleware, renameGroup);
chatRoute.route('/group/remove').put(authMiddleware, removeFromGroup);

module.exports = chatRoute;
