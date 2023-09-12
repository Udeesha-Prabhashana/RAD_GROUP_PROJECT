import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        FName: {
            type: String,
            require: true,
        },
        LName: {
            type: String,
            require: true,
        },
        Gender: {
            type: String,
            require: true,
        },
        Email: {
            type: String,
            require: false,
        },
        MobileNo: {
            type: String,
            require: true,
        },
        NIC: {
            type: String,
            require: true,
        },
        Address: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);