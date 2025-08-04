import cors from "cors";
import express, { request } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import axios from "axios";


const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
const PORT = 8000 || process.env.PORT;

app.get("/", (request, response) => {
  //response from server
  response.json({
    message: "Hello from Lensify server",
    PORT: PORT,
  });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
app.use("/api/user", userRouter);
