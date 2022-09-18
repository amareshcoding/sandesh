const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chatMane: { type: String, trim: true, required: true },
    isGroupChat: { type: Boolean, default: false },
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'message' },
    groupAdmins: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Chat = mongoose.model('chat', chatSchema);
module.exports = Chat;
