import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderid: {
      type: String,
      required: [true, "Order ID is required"],
      unique: true,
    },
    productid: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    product_details: {
      name: String,
      image: [],
    },
    paymentID: {
      type: String,
      deafault: "",
    },
    paymentstatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    },
    subtotalamyount: {
      type: Number,
      default: 0,
    },
    totalamount: {
      type: Number,
      default: 0,
    },
    invoicerecipt: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
