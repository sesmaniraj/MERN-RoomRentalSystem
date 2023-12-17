import RoomModel from "../models/roomModel.js";

export const registerRoom = async (req, res) => {
  const { name, description, price, location, available } = req.body;
  const existingRoom = await RoomModel.findOne({
    name: name,
  });
  try {
    if (existingRoom) {
      res.status(400).json({ message: "Room already exists" });
    } else {
      const room = await RoomModel.create({
        name,
        description,
        location,
        price,
        available,
      });
      res.status(200).json({ room });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
