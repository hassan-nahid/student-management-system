import Notice from "../models/noticeModel.js";

export const createNotice = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNotice = new Notice({
            title,
            content,
        });

        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (error) {
        res.status(500).json({ message: "Failed to create notice", error });
    }
};

export const getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 }); // Sort by most recent
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notices", error });
    }
};

export const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotice = await Notice.findByIdAndDelete(id);
        if (!deletedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete notice", error });
    }
};
