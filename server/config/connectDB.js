import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.MOnGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
export default connectDB;
