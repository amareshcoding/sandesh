const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    content:{ type: String, trim: true, required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'chat' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Message = mongoose.model('message', messageSchema);
module.exports = Message;
