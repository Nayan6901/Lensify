import e from "express";
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
    image: {
      type: String,
      required: [true, "Category image is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    parentCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
