const Router = require('express');
const { register, login } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/user.model');

const userRouter = Router();

//authentication
userRouter.post('/register', register);
userRouter.post('/login', login);

//genaral routes
userRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const queries = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

    const user = await User.find(queries)
      .find({ _id: { $ne: req.user._id } })
      .lean()
      .exec();
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
//
module.exports = userRouter;
