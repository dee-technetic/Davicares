import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
  }, { timestamps: true }
);
  

export const Appointment = mongoose.model('Appointment', appointmentSchema);