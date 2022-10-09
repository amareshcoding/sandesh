const Router = require('express');
const { register, login } = require('../controllers/auth.controller');
const User = require('../models/user.model');

const userRouter = Router();

//authentication
userRouter.post('/register', register);
userRouter.post('/login', login);

//genaral routes
userRouter.get('/', async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
//
module.exports = userRouter;
