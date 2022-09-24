const Router = require('express');
const User = require('../models/user.model');

const userRouter = Router();

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
