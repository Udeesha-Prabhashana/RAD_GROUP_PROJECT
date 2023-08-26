import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
// import usersRoute from "./routes/users.js";
// import hotelsRoute from "./routes/hotels.js";
// import roomRoute from "./routes/room.js";
// import cookieParser from "cookie-parser";
import cors from "cors"; //The cors package is used in Node.js applications to handle Cross-Origin Resource Sharing (CORS) headers.

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

//middlewares

// app.use((req, res, next) => {
//   console.log("hi im a middleware");
//   next(); //go to the next middleware
// });

app.use(cors()); //but it is not want now because this -> "proxy": "http://localhost:8800/api"
// app.use(cookieParser());
app.use(express.json()); //Express application to parse incoming request bodies with JSON payloads.

app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomRoute);

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
