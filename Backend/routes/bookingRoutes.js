import express from "express"; 

import { getBooking, getBookings, createBooking, updateBookin, deleteBooking} from "../controllers/bookingController.js";

const router = express.Router();

// create booking
router.post("/", createBooking);

// Update booking Details
router.put("/:id",updateBookin);

// Delete booking
router.delete("/:id", deleteBooking);

//Get all bookings
router.get("/", getBookings);
//get specific booking
router.get("/find/:id", getBooking);


export default router