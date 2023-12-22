import express from "express";
import {
  registerRoom,
  getUserRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import { verifyToken } from "../utils/verifyUser.js";
const roomRouter = express.Router();

roomRouter.post("/registerroom", verifyToken, registerRoom);
roomRouter.get("/room/:id", verifyToken, getUserRoom);
roomRouter.delete("/deleteroom/:id", verifyToken, deleteRoom);

export default roomRouter;
