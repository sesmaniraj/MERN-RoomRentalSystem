import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//dotenv config to get access file from .env
dotenv.config();
import cors from "cors";
import { connectDB } from "./database/db.js";
import userRoute from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

//app created for server
const app = express();
//call connection databae
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server is started at the port : ${port}`);
});

//routes
app.use("/api/v1", userRoute);
app.use("/api/v1", roomRoutes);
app.use("/api/v1", bookingRoute);

//errormiddleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
