import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  recipientType: { type: String, enum: ["admin","class", "teacher"], required: true },

  // Optional fields based on recipientType
  className: { type: String },         // Only used when recipientType is 'class'
  teacherEmail: { type: String },      // Only used when recipientType is 'teacher'

  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
