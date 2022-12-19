const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'chatuser' },
    content: { type: String, trim: true, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Message = mongoose.model('message', messageSchema);
module.exports = Message;
