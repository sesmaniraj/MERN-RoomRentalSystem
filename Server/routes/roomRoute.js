import express from "express";
import { registerRoom } from "../controllers/roomController.js";
import { verifyToken } from "../utils/verifyUser.js";
const roomRouter = express.Router();

roomRouter.post("/registerroom", verifyToken, registerRoom);

export default roomRouter;
