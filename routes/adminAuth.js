import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ success: true, token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

router.post("/login", loginAdmin);

export default router;
