import mongoose from 'mongoose';

// Address subdocument schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

// Teacher schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: {type: String, default: 'teacher'},
  address: { type: addressSchema, required: true }, // Embed address schema
});

// Create the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
