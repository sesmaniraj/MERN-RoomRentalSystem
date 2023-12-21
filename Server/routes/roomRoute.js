import express from "express";
import { registerRoom, getUserRoom } from "../controllers/roomController.js";
import { verifyToken } from "../utils/verifyUser.js";
const roomRouter = express.Router();

roomRouter.post("/registerroom", verifyToken, registerRoom);
roomRouter.get("/room/:id", verifyToken, getUserRoom);

export default roomRouter;
