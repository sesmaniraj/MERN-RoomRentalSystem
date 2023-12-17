import express from "express";
import {
  getRoom,
  getRoomById,
  registerRoom,
} from "../controllers/roomController.js";
const roomRouter = express.Router();

roomRouter.post("/registerroom", registerRoom);
roomRouter.get("/getroom", getRoom);
roomRouter.get("/getroom/:id", getRoomById);

export default roomRouter;
