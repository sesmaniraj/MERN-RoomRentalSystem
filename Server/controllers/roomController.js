import RoomModel from "../models/roomModel.js";
import { errorHandler } from "../utils/error.js";

export const registerRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.create(req.body);
    return res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};
export const getUserRoom = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const room = await RoomModel.find({ userRef: req.params.id });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "Only can see your own room"));
  }
};
