import express from "express";
import Food from "../models/Food.js";

import { createFood, updateFood, deleteFood, getFoods, getFood } from "../controllers/food.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin ,createFood);

//UPDATE
router.put("/:id", verifyAdmin, updateFood);

//DELETE
router.delete("/:id", verifyAdmin, deleteFood);

//GET ALL
router.get("/", getFoods);
//get food
router.get("/find/:id", getFood);

export default router