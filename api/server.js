import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//  Endpoints
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start server
const PORT = 5000;
// process.env.PORT ||
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
