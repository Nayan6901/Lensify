import mongoose from "mongoose";
const productschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    brand: {
      type: String,
      required: [true, "Product brand is required"],
    },
    sku: {
      //unique code for the product
      type: String,
      required: [true, "Product SKU is required"],
    },
    category: {
      type: String, // mongoose.Schema.ObjectId,temporary for testing
      // ref: "Category",
      required: [true, "Product category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
    },
    images: {
      type: [String],
      required: [true, "Product images are required"],
    },
    subcategory: {
      type: String, //mongoose.Schema.ObjectId, temporary for testing
      // ref: "SubCategory",
      required: [true, "Product subcategory is required"],
    },
    lensType: {
      type: [String],
      required: [true, "Lens type is required"],
    },
    currentPrice: {
      type: Number,
      required: [true, "Product price is required"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
    },
    frameType: {
      type: String,
      required: [true, "Frame type is required"],
    },
    frameColors: {
      type: [String],
      required: [true, "Frame colors are required"],
    },
    material: {
      type: String,
      required: [true, "Material is required"],
    },
    tags: {
      type: [String],
      required: [true, "Product tags are required"],
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: [true, "User ID is required for reviews"],
        },
        comment: {
          type: String,
          required: [true, "Review comment is required"],
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
          required: [true, "Review rating is required"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productschema);
export default productModel;
