import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  classNumber: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    required: true,
  },
  periods: [
    {
      period: {
        type: String, // Could be numbers or strings like "1", "2", "3"
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      teacher: {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
      time: {
        type: String, // e.g., "8:00 AM - 9:00 AM"
        required: true,
      },
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
