import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    room_No: {
      type: String,
      require: true,
    },
    room_type:{
      type: String,
      require: true,
    },
    room_ac:{
      type: String,
      require: true,
    },
    price:{
      type: String,
      require: true,
    },
    availability:{
      type:String,
      require: true,
    },
    no_of_beds:{
      type: Number,
      require: true,
    },
    no_of_chairs:{
      type: Number,
      require: true,
    },
    tv:{
      type:String,
      require: true,
    },
    bathroom:{
      type:String,
      require: true,
    },
    balcony:{
      type:String,
      require: true,
    },
    wifi:{
      type:String,
      require: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);



