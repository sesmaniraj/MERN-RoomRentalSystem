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

export const getRoom = async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(201).json({ rooms });
  } catch (error) {
    res.status(404).json({ message: "Room not found" });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }

    const room = await RoomModel.findById(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ room });
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
