import Booking from "../models/bookingModel.js";

export const getBookings = async (req, res, next) => {
    //res.json({mssg: 'getBookings is working'}) 
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }  
};

export const getBooking = async (req, res, next) => {
    //res.json({mssg: 'getBooking is working'})
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
};

export const createBooking = async (req, res, next) => {
    res.json({mssg: req.body})
    //const newBooking = new Booking(req.body);
    const newBooking = new Booking({
        bookingId: req.body.bookingId, // Replace with a valid booking ID
        customerId:req.body.customerId, // Replace with a valid customer ID
        roomId: req.body.roomId, // Replace with a valid room ID
        checkInDate: req.body.checkInDate, // Replace with a valid check-in date
        checkOutDate:req.body.checkOutDate, // Replace with a valid check-out date
        totalPrice: req.body.totalPrice, // Replace with a valid total price
      });

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

export const updateBookin = async (req, res, next) => {
    //res.json({mssg: 'updateBookin is working'})
    const newBooking = new Booking(req.body);
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBooking);
    } catch (err) {
        next(err);
    }
};

export const deleteBooking = async (req, res, next) => {
    //res.json({mssg: 'deleteBooking is working'})
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been delete");
    } catch (err) {
        next(err);
    }
}

