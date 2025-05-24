import "dotenv/config";
import express from "express";
import cors from "cors";
import adminAuthRoutes from "./routes/adminAuth.js";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/register.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminAuthRoutes);
app.use("/api", registerRoutes);
app.use("/api", contactRoutes);

// Add route logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
