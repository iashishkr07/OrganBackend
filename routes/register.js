import express from "express";
import Donor from "../models/donor.js";
import Patient from "../models/patient.js";

const router = express.Router();

router.post("/register/donor", async (req, res) => {
  try {
    const { name, age, bloodType, organs, location, contact } = req.body;
    const newDonor = new Donor({
      name,
      age,
      bloodType,
      organs,
      location,
      contact,
    });
    await newDonor.save();
    res.status(201).json({ message: "Donor registration successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Donor registration failed", error: err.message });
  }
});

router.post("/register/patient", async (req, res) => {
  try {
    const { name, age, bloodType, neededOrgans, urgency, location, contact } =
      req.body;
    const newPatient = new Patient({
      name,
      age,
      bloodType,
      neededOrgans,
      urgency,
      location,
      contact,
      status: "active",
    });
    await newPatient.save();
    res.status(201).json({ message: "Patient registration successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Patient registration failed", error: err.message });
  }
});

router.get("/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch donors", error: err.message });
  }
});

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch patients", error: err.message });
  }
});

router.get("/donors/verified", async (req, res) => {
  try {
    const verifiedDonors = await Donor.find({ status: "verified" });
    res.status(200).json(verifiedDonors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch verified donors", error: err.message });
  }
});

router.patch("/donors/update", async (req, res) => {
  try {
    const { _id, name, age, bloodType, organs, location, contact, status } =
      req.body;

    if (!_id) {
      return res
        .status(400)
        .json({ message: "Donor ID is required for updating donor" });
    }

    if (
      bloodType &&
      !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodType)
    ) {
      return res.status(400).json({ message: "Invalid blood type" });
    }

    if (
      status &&
      !["active", "inactive", "pending", "verified"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedDonor = await Donor.findByIdAndUpdate(
      _id,
      { name, age, bloodType, organs, location, contact, status },
      { new: true, runValidators: true }
    );

    if (!updatedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({
      message: "Donor updated successfully",
      donor: updatedDonor,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update donor",
      error: err.message,
    });
  }
});

router.patch("/patients/update", async (req, res) => {
  try {
    const {
      _id,
      name,
      age,
      bloodType,
      neededOrgans,
      urgency,
      location,
      contact,
      status,
    } = req.body;

    if (!_id) {
      return res
        .status(400)
        .json({ message: "Patient ID is required for updating patient" });
    }

    if (
      bloodType &&
      !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodType)
    ) {
      return res.status(400).json({ message: "Invalid blood type" });
    }

    if (
      urgency &&
      !["low", "medium", "high", "critical"].includes(urgency.toLowerCase())
    ) {
      return res.status(400).json({ message: "Invalid urgency level" });
    }

    if (
      status &&
      !["active", "matched", "transplanted", "inactive"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      _id,
      {
        name,
        age,
        bloodType,
        neededOrgans,
        urgency,
        location,
        contact,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update patient",
      error: err.message,
    });
  }
});

router.get("/patients/transplanted", async (req, res) => {
  try {
    const transplantedPatients = await Patient.find({ status: "transplanted" });
    res.status(200).json(transplantedPatients);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch transplanted patients",
      error: err.message,
    });
  }
});

export default router;
