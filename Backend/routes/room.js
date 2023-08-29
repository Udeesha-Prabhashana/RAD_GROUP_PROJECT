import express from "express";
import Room from "../models/Room.js";

import { createRoom, updateRoom, deleteRoom, getRooms, getRoom } from "../controllers/room.js";

const router = express.Router();

//CREATE
router.post("/", createRoom);

//UPDATE
router.put("/:id",updateRoom);

//DELETE
router.delete("/:id", deleteRoom);

//GET ALL
router.get("/", getRooms);

//get room
router.get("/find/:id", getRoom);

export default router