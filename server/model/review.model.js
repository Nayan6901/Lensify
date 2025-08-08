import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    minlength: [10, "Comment must be at least 10 characters long"],

    maxlength: [500, "Comment cannot exceed 500 characters"],
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
    required: [true, "Review status is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
