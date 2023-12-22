import express from "express";
import {
  registerRoom,
  getUserRoom,
  deleteRoom,
  updateRoom,
  getRoom,
} from "../controllers/roomController.js";
import { verifyToken } from "../utils/verifyUser.js";
const roomRouter = express.Router();

roomRouter.post("/registerroom", verifyToken, registerRoom);
roomRouter.get("/room/:id", verifyToken, getUserRoom);
roomRouter.get("/rooms/:id", getRoom);
roomRouter.delete("/deleteroom/:id", verifyToken, deleteRoom);
roomRouter.post("/updateroom/:id", verifyToken, updateRoom);

export default roomRouter;
