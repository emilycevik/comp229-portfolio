// server/backend/models/Education.js
import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /[^@\s]+@[^@\s]+\.[^@\s]+/,
    },
    completion: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
export default Education;
