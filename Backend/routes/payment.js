import express from "express";
import Payment from "../models/Payment.js";

import { createPayment, updatePayment, deletePayment, getPayments, getPayment } from "../controllers/payment.js";

const router = express.Router();

//CREATE
router.post("/", createPayment);

//UPDATE
router.put("/:id",updatePayment);

//DELETE
router.delete("/:id", deletePayment);

//GET ALL
router.get("/", getPayments);
//get food
router.get("/find/:id", getPayment);

export default router