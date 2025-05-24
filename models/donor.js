import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    bloodType: String,
    organs: [String],
    location: String,
    contact: String,
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "verified"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
