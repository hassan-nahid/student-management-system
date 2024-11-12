import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  class: {
    type: String, 
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
