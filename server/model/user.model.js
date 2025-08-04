import jwt from "jsonwebtoken";
const { verify } = jwt;

import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Username is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avtar: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    mobile: {
      type: Number,

      default: null,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    verifyemail: {
      type: Boolean,
      default: false,
    },
    last_loginDate: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
    },
    adress_details: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      default: null,
    },
    Shoping_cart: {
      type: mongoose.Schema.ObjectId,
      ref: "cart",
    },
    order_history: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    forgotPasswordOtp: {
      type: String,
      default: null,
    },
    forgotPasswordExpiry: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
