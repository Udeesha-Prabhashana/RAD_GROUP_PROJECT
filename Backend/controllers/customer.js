import Customer from "../models/Customer.js";

export const createCustomer = async (req, res, next) => {
    const newCustomer = new Customer({
        CustomerId: req.body.CustomerId,
        FName: req.body.FName,
        LName: req.body.LName,
        Gender: req.body.Gender,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        NIC: req.body.NIC,
        Address: req.body.Address,
    });

    try {
        const savedCustomer = await newCustomer.save();
        res.status(200).json(savedCustomer);
    } catch (err) {
        next(err);
    }
};

export const updateCustomer = async (req, res, next) => {
    const newCustomer = new Customer(req.body);
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCustomer);
    } catch (err) {
        next(err);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json("Customer has been delete");
    } catch (err) {
        next(err);
    }
};

// Get all Customers
export const getCustomers = async (req, res, next) => { //
    try {
        const customer = await Customer.find();
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
};
// hello

export const getCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
};

export const getCustomerIds = async (req, res, next) => {
    try {
        const customers = await Customer.find({}, 'CustomerId'); 
        const customerIds = customers.map(customer => customer.CustomerId);
        console.log(customerIds);
        res.status(200).json(customerIds);
    } catch (err) {
        next(err);
    }
};

export const getCustomerNICByCustomerId = async (req, res, next) => {
    const { customerId } = req.params; 
    try {
        const customer = await Customer.findOne({ CustomerId: customerId }, 'NIC');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        const customerNIC = customer.NIC;
        console.log(customerNIC);
        res.status(200).json(customerNIC);
    } catch (err) {
        next(err);
    }
};