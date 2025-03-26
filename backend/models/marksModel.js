import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    marks: [
      {
        roll: { type: Number, required: true },
        mark: { type: Number, required: true },
      },
    ],
    teacherEmail: {
      type: String,
      required: true,
    },
    maxMark: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Marks", MarksSchema);
