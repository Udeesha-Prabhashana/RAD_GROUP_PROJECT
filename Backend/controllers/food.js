import Food from "../models/Food.js";

export const createFood = async (req, res, next) => {
  const newFood = new Food(req.body);

  try {
    const savedFood = await newFood.save();
    res.status(200).json(savedFood);
  } catch (err) {
    next(err);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedFood);
  } catch (err) {
    next(err);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json("Food has been delete");
  } catch (err) {
    next(err);
  }
};

// Get all Food
export const getFoods = async (req, res, next) => {
  try {
    const Foods = await Food.find();
    res.status(200).json(Foods);
  } catch (err) {
    next(err);
  }
};

export const getFood = async (req, res, next) => {
  try {
    const Food = await Food.findById(req.params.id);
    res.status(200).json(Food);
  } catch (err) {
    next(err);
  }
};
