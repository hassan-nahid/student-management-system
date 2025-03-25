import Subject from "../models/subjectModel.js";

// Add a new subject
export const addSubject = async (req, res) => {
  try {
    const { name, code, class: subjectClass, session } = req.body;
    const newSubject = new Subject({ name, code, class: subjectClass, session });
    await newSubject.save();
    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    res.status(400).json({ message: 'Error adding subject', error });
  }
};

export const getSubjectsByClass = async (req, res) => {
  try {
    const { class: subjectClass } = req.params;
    const subjects = await Subject.find({ class: subjectClass });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ message: "Error fetching subjects", error });
  }
};
