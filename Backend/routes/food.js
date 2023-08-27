import express from "express";
import Food from "../models/Food.js";

import { createFood, updateFood, deleteFood, getFoods } from "../controllers/food.js";

const router = express.Router();

//CREATE
router.post("/", createFood);

//UPDATE
router.put("/:id",updateFood);

//DELETE
router.delete("/:id", deleteFood);

//GET ALL
router.get("/", getFoods);

export default router