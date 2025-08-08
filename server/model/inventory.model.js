import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    status: {
      type: String,
      enum: ["in_stock", "out_of_stock", "discontinued"],
      default: "in_stock",
      required: [true, "Inventory status is required"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Inventory", inventorySchema);
