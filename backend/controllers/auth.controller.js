const generateToken = require('../config/generate.token');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please Enter all the Fields.');
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      res.status(400);
      throw new Error('Try with another Email.');
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Registration Failed.');
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid Email or Password.');
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports = { register, login };
