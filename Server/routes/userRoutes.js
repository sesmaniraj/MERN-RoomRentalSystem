import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  google,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//API FOR USER
//for registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", google);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.put("/update", protect, updateUserProfile);
router.post("/google", google);

export default router;
