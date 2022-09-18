const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    namr: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avtar: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('chatusr', userSchema);
module.exports = User;
