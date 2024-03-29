import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import foodRoute from "./routes/food.js";
import paymentRoute from "./routes/payment.js"
import roomRoute from "./routes/room.js";
import bookingRoute from "./routes/bookingRoutes.js";
import customerRoute from "./routes/customer.js";

import cors from "cors"; //The cors package is used in Node.js applications to handle Cross-Origin Resource Sharing (CORS) headers.
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!")
})


app.get("/", (req, res) => {
  res.send("hello first request!.");
});


app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/room", roomRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/customer", customerRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8880, () => {
  //listen specific port  and ready to handle incoming request on the port
  connect();
  console.log("Connected to backend!");
});

