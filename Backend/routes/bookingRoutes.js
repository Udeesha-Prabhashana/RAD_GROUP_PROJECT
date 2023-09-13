import express from "express"; 

import { getBooking, getBookings, createBooking, updateBookin, deleteBooking} from "../controllers/bookingController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create booking
router.post("/",verifyAdmin, createBooking);

// Update booking Details
router.put("/:id", verifyAdmin,updateBookin);

// Delete booking
router.delete("/:id",verifyAdmin, deleteBooking);

//Get all bookings
router.get("/" ,getBookings);
//get specific booking
router.get("/find/:id", getBooking);


export default router