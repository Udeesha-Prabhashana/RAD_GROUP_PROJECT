import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String, //mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customerId: {
    type:String, //mongoose.Schema.Types.ObjectId,
    //ref: 'Customer', // Reference to the Guests table
    required: true,
  },
  roomId: {
    type:String, //mongoose.Schema.Types.ObjectId,
    //ref: 'Room', // Reference to the Rooms table
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
},{ timestamps: true });

export default mongoose.model("Booking", bookingSchema);

