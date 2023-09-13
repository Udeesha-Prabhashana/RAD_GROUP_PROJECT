import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    FoodId: {
      type: String,
      require: true,
    },
    Name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },{ timestamps: true }
);

export default mongoose.model("Food", FoodSchema);
