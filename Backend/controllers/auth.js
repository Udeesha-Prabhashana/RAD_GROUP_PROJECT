import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //try-catch block to handle any potential errors that may occur during the authentication process.
    const user = await User.findOne({ username: req.body.username }); //User.findOne() method is used to find a user document in the database
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      //bcrypt.compare() to compare the provided password value from the request body with the hashed password
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
      console.log(user)
    if (!user.isAdmin) {
      return next(createError(403, "You don't have admin privileges"));
    }
    
    console.log("user._id:", user._id);
    console.log("user.isAdmin:", user.isAdmin);
    console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET
    ); //"sdfsdfs" shoud have change but i can not install openssl

    const { password, isAdmin , ...otherDetails } = user._doc; //excluding the password and isAdmin properties.

    res
      .cookie("access_token", token, {
        httpOnly: true, //used to any client can not reach this cookies
      })
      .status(200)
      .json({ isAdmin, ...otherDetails });
  } catch (err) {
    next(err);
  }
};