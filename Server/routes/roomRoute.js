import express from "express";
import { registerRoom } from "../controllers/roomController";
const router = express.Router();

router.post("/registerroom", registerRoom);
