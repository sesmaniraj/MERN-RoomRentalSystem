import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  google,
  deleteUserProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

//API FOR USER
//for registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", google);
router.get("/logout", logoutUser);
router.post("/update/:id", verifyToken, updateUserProfile);
router.delete("/delete/:id", verifyToken, deleteUserProfile);

export default router;
