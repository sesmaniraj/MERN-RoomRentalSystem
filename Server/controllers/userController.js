import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//for signUp
export const registerUser = async (req, res, next) => {
  const { username, email, password, phoneNumber, address, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  //now creating the new user
  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  try {
    await newUser.save();
    res.status(201).json({ messsage: "User Register successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, SameSite: "None" })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
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
