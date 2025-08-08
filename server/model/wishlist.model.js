import mongoose from "mongoose";
const whishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: [true, "Wishlist status is required"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Wishlist", whishlistSchema);
