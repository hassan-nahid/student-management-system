import Marks from "../models/marksModel.js";


// Submit marks
export const submitMarks = async (req, res) => {
  try {
    const { class: className, examName, subject, marks, teacherEmail, maxMark } = req.body;

    if (!className || !examName || !subject || !marks.length || !teacherEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if the exam already exists for this class & subject
    const existing = await Marks.findOne({ class: className, subject, examName });

    if (existing) {
      return res.status(409).json({
        error: "Exam with this name already exists for the selected class and subject. Please choose a different name.",
      });
    }

    // ✅ Save new marks
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
    console.error(error);
    res.status(500).json({ error: "Failed to submit marks" });
  }
};


export const getMarksByTeacher = async (req, res) => {
  const { email } = req.params;
  try {
    const marks = await Marks.find({ teacherEmail: email });
    if (!marks.length) {
      return res.status(404).json({ message: "No marks found for this teacher" });
    }
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching marks", error });
  }
};