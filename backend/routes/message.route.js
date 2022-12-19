const { Router } = require('express');
const {
  getAllMessage,
  sendMessage,
} = require('../controllers/message.controller');
const messageRoute = Router();
const authMiddleware = require('../middleware/auth.middleware');

messageRoute.route('/:chatId').get(authMiddleware, getAllMessage);
messageRoute.route('/').post(authMiddleware, sendMessage);

module.exports = messageRoute;
