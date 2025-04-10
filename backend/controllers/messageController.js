// controllers/messageController.js

import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderEmail, senderName, recipientType, className,teacherEmail, message } = req.body;

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
      teacherEmail,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message." });
  }
};

// Get messages by class name
export const getMessagesByClass = async (req, res) => {
  try {
    const className = req.params.className;

    const messages = await Message.find({ className: className }).sort({ createdAt: -1 });;

    if (!messages.length) {
      return res.status(404).json({ message: "No messages found for this class." });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipientType: 'admin' }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin messages" });
  }
};

export const getTeacherMessages = async (req, res) => {
  const { teacherEmail } = req.params; // teacher email from the URL

  try {
    // Find messages where the teacher is the recipient
    const messages = await Message.find({
      recipientType: 'teacher',
      teacherEmail,  // Ensure this matches the field in your schema
    }).sort({ timestamp: -1 });  // Sort by timestamp field

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teacher messages" });
  }
};
