// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  recipientType: { type: String, enum: ["admin", "class"], required: true },
  className: { type: String }, // Only if recipientType is 'class'
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
