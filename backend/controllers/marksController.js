import Marks from "../models/marksModel.js";


// Submit marks
export const submitMarks = async (req, res) => {
  try {
    const { class: className, examName, subject, marks, teacherEmail, maxMark } = req.body;

    if (!className || !examName || !subject || !marks.length || !teacherEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMarksEntry = new Marks({
      class: className,
      examName,
      subject,
      marks,
      teacherEmail,
      maxMark, 
    });

    await newMarksEntry.save();
    res.json({ message: "Marks submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit marks" });
  }
};
