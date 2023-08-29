import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    room_Type: {
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

export default mongoose.model("Room", RoomSchema);



