import express from "express";
import asyncHandler from "express-async-handler";
import User from "./../Models/UserModel.js";
import generateToken from "./../Utils/GenerateToken.js";
import protect from "./../Middleware/AuthMiddleware.js";
import sendEmail from "./emailRoute.js";

const userRoute = express.Router();
// Register Users
userRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, comfirmPassword } = req.body;
    console.log(req.body);
    if (!email || !password || !name) {
      res.status(400);
      throw new Error("please add all fieldss");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({
      email,
      name,
      password,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  })
);

// Login Users
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      throw new Error("Please fill all fields");
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        wishlist: user.wishlist,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

// Get all Users
userRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// Get user details
userRoute.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (user) {
      res.json({
        wishlist: user.wishlist,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//Update User
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password !== "") {
        user.password = password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
        createdAt: updateUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Forgotten password
userRoute.post(
  "/forgot-password-token",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetUrl = `Hi, please follow this link to reset your password<a href='http://localhost:5000/api/users/reset-password/${token}'>Click Here</a>`;
        const data = {
          to: email,
          text: "Hey user",
          subject: "Forgot password link",
          htm: resetUrl,
        };
        sendEmail(data);
        console.log(sendEmail(data));
        res.json(token);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("user not found");
    }
  })
);

// Reset password
userRoute.get(
  "/rest-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = User.findOne({ email });
    if (user) {
      try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetUrl = `Hi, please follow this link to reset your password<a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
        const data = {
          to: email,
          text: "Hey user",
          subject: "Forgot password link",
          htm: resetUrl,
        };
      } catch (error) {}
    }
  })
);

// UPDATE USER
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(req.body.name);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
        createdAt: updateUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRoute;
