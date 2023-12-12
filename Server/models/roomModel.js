import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
      type: Number,
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
