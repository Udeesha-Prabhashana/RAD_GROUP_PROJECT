import express from "express";
import Food from "../models/Food.js";

import { createFood, updateFood, deleteFood, getFoods, getFood } from "../controllers/food.js";

const router = express.Router();

//CREATE
router.post("/", createFood);

//UPDATE
router.put("/:id",updateFood);

//DELETE
router.delete("/:id", deleteFood);

//GET ALL
router.get("/", getFoods);
//get food
router.get("/find/:id", getFood);

export default router