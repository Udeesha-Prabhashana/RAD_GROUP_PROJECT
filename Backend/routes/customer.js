import express from "express"; //

import { createCustomer, updateCustomer, deleteCustomer, getCustomers, getCustomer, getCustomerIds, getCustomerNICByCustomerId } from "../controllers/customer.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create user
router.post("/", verifyAdmin, createCustomer);

// Update user Details
router.put("/:id", verifyAdmin, updateCustomer);

// Delete customer
router.delete("/:id", verifyAdmin, deleteCustomer);

router.get("/getCustomerIds", getCustomerIds);

//Get all customers
router.get("/", getCustomers);
//get specific user
router.get("/find/:id", getCustomer);

router.get("/nic/:customerId", getCustomerNICByCustomerId);



export default router