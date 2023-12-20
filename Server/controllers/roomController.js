import RoomModel from "../models/roomModel.js";

export const registerRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.create(req.body);
    return res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};
