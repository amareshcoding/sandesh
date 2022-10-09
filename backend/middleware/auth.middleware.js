const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //verify the token and the user
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(verifyToken.id).select('-password');
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorised, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
};
module.exports = authMiddleware;
