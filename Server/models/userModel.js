import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "9800000000",
    },
    address: {
      type: String,
      default: "Nepal",
    },
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
