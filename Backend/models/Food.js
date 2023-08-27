import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
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
  },
);

export default mongoose.model("Food", FoodSchema);
