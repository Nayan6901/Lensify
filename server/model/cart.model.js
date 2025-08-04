import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    productid: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    quntity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
