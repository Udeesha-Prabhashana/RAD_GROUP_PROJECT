import express from "express";
import Payment from "../models/Payment.js";

import { createPayment, updatePayment, deletePayment, getPayments, getPayment } from "../controllers/payment.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPayment);

//UPDATE
router.put("/:id",verifyAdmin,updatePayment);

//DELETE
router.delete("/:id",verifyAdmin, deletePayment);

//GET ALL
router.get("/", getPayments);
//get food
router.get("/find/:id", getPayment);

export default router