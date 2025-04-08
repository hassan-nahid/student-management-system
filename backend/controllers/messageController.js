// controllers/messageController.js

import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderEmail, senderName, recipientType, className, message } = req.body;

    if (!senderEmail || !senderName || !recipientType || !message) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    if (recipientType === "class" && !className) {
      return res.status(400).json({ error: "Class name is required for class messages." });
    }

    const newMessage = new Message({
      sender: { email: senderEmail, name: senderName },
      recipientType,
      className,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
