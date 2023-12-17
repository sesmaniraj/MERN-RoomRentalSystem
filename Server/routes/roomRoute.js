import express from "express";
import { registerRoom } from "../controllers/roomController.js";
const roomRouter = express.Router();

roomRouter.post("/registerroom", registerRoom);

export default roomRouter;
