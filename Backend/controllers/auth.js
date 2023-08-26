import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "http-errors";

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
      return next(createError(400, "wrong password or username!"));
      res.status(200).send("Logging successful");
  } catch (err) {
    next(err);
  }
};