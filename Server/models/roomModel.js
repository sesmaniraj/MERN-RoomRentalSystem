import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
      type: String,
      required: true,
    },
    available: { type: String, default: true },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
