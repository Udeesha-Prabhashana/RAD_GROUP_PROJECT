import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    NIC: {
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
  },{ timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
