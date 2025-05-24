import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    bloodType: String,
    neededOrgans: [String],
    urgency: String,
    location: String,
    contact: String,
    status: {
      type: String,
      enum: ["active", "matched", "transplanted", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
