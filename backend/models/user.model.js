const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avtar: {
      type: String,
      default:
        'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const saltRound = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, saltRound);
  this.password = hash;
  return next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('chatuser', userSchema);
module.exports = User;
