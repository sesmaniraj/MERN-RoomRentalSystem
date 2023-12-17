import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateTokens.js";

//for signup
export const registerUser = async (req, res) => {
  const { username, email, password, phoneNumber, address, role } = req.body;

  //to check if the user is existing or not
  const existingUser = await UserModel.findOne({
    email: email,
  });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
  } else {
    //now creating the new user
    const user = await UserModel.create({
      username,
      email,
      password,
      address,
      phoneNumber,
      role,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({ user });
    } else {
      res.status(400).json({
        message: "Invalid User data",
      });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({
      message: "Invalid User data",
    });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout user" });
};

export const getUserProfile = async (req, res) => {
  const user = await UserModel.find();
  res.status(200).json({ user });
};

export const updateUserProfile = async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.phoneNumber = req.body.phoneNumber || user.address;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "Update user" });
};
