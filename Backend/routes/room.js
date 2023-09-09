import express from "express";
import Room from "../models/Room.js";

import { createRoom, updateRoom, deleteRoom, getRooms, getRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", /*verifyAdmin,*/  createRoom);

//UPDATE
router.put("/:id", /*verifyAdmin,*/ updateRoom);

//DELETE
router.delete("/:id",/*verifyAdmin,*/ deleteRoom);

//GET ALL
router.get("/", getRooms);

//get room
router.get("/find/:id", getRoom);

export default router