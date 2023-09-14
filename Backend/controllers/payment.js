import Payment from "../models/Payment.js";

export const createPayment = async (req, res, next) => {
    const newPayment = new Payment({
      customerId : req.body.customerId,
      payment: req.body.payment,
      date: req.body.date
    });
  
    try {
      const savedPayment = await newPayment.save();
      res.status(200).json(savedPayment);
    } catch (err) {
      next(err);
    }
  };
  
  export const updatePayment = async (req, res, next) => {
    try {
      const updatePayment = await Payment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatePayment);
    } catch (err) {
      next(err);
    }
  };
  
  export const deletePayment = async (req, res, next) => {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      res.status(200).json("Payemnt has been delete");
    } catch (err) {
      next(err);
    }
  };
  
  // Get all Food
  export const getPayments = async (req, res, next) => {
    try {
      const payment = await Payment.find();
      res.status(200).json(payment);
    } catch (err) {
      next(err);
    }
  };
  
  export const getPayment = async (req, res, next) => {
    try {
      const payment = await Payment.findById(req.params.id);
      res.status(200).json(payment);
    } catch (err) {
      next(err);
    }
  };
  