import Teacher from "../models/teacherModel.js";

export const addTeacher = async (req, res) => {
  const { name, email, phone, address } = req.body;
  console.log(req.body);

  try {
    // Create a new teacher instance
    const newTeacher = new Teacher({
      name,
      email,
      phone,
      address,
    });

    // Save the new teacher to the database
    await newTeacher.save();

    return res.status(201).json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
