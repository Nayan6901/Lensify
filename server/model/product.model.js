import mongoose, { Schema } from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    unit: {
      type: String,
      default: null,
    },
    stock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: null,
    },
    more_details: {
      type: Object,
      default: {},
    },
    rating: {
      type: Number,
      default: 0,
    },
    punlish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
export default productModel;
