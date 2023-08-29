import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    guestID: {
      type: String,
      require: true,
    },
    payment: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
);

export default mongoose.model("Payment", PaymentSchema);
