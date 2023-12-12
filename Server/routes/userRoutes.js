import express from "express"
import { signUp } from "../controllers/userController.js";
const router = express.Router();

//API FOR USER
//for registration
router.post("/register",signUp);


export default router;