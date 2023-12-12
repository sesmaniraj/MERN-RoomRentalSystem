import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//for signup
export const signUp = async (req, res) => {
  const { username, email, password, phoneNumber, address, role } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 characters" });
  }
  try {
    //to check if the user is existing or not
    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      //password hashing using bcrypt
      const hashedPassword = bcrypt.hashSync(password, 10);
      //now creating the new user
      const newUser = await UserModel.create({
        username: username,
        email: email,
        username: username,
        password: hashedPassword,
        address: address,
        phoneNumber: phoneNumber,
        role: role,
      });

      //json token maximum limit
      const maxLimit = 3 * 60 * 60;

      //generating token using jwt
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.SECRET_KEY,
        {
          expiresIn: maxLimit,
        }
      );

      //sending cookies as res
      res.cookie("jwt", token, { httpOnly: true, maxLimit: maxLimit * 1000 });

      //finally sending responce to the user created
      res
        .status(200)
        .json({
          message: "User created successfully",
          user: newUser,
          token: token,
        });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "something went wrong !!", error: error.toString() });
  }
};
