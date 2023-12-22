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
export const getRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    if (!room) {
      return next(errorHandler(404, "Room not found"));
    }
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
export const deleteRoom = async (req, res, next) => {
  const room = await RoomModel.findById(req.params.id);
  if (!room) {
    return next(errorHandler(404, "Room not found"));
  }
  if (req.user.id != room.userRef) {
    return next(errorHandler(401, "you can only delete your room"));
  }
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Room has been deleted" });
  } catch (error) {
    next(error);
  }
};
export const updateRoom = async (req, res, next) => {
  const rooms = await RoomModel.findById(req.params.id);
  if (!rooms) {
    return next(errorHandler(404, "Room not found"));
  }
  if (req.user.id !== rooms.userRef) {
    return next(errorHandler(401, "you can only update your room"));
  }
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
