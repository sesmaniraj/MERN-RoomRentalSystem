import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    roomsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    roomsRented: [
      {
        roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
        startDate: Date,
        endDate: Date,
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
