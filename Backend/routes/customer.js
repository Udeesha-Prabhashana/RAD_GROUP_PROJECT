import express from "express"; //

import { createCustomer, updateCustomer, deleteCustomer, getCustomers, getCustomer } from "../controllers/customer.js";

const router = express.Router();

// create user
router.post("/", createCustomer);

// Update user Details
router.put("/:id",updateCustomer);

// Delete customer
router.delete("/:id", deleteCustomer);

//Get all customers
router.get("/", getCustomers);
//get specific user
router.get("/find/:id", getCustomer);

export default router