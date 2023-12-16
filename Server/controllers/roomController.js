import RoomModel from "../models/roomModel";
import UserModel from "../models/userModel";

export const registerRoom = async (req, res) => {
  const { name, description, price, location, available } = req.body;
  const existingRoom = await RoomModel.findOne({
    name: name,
  });
  if (existingRoom) {
    res.status(400).json({ message: "Room already exists" });
  } else {
    const room = await UserModel.create({
      name,
      description,
      location,
      price,
      available,
    });
    res.status(200).json({ room });
  }
};
