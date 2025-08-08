import mongoose from "mongoose";
const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
    },
    description: {
      type: String,
      required: [true, "Subcategory description is required"],
    },
    image: {
      type: String,
      required: [true, "Subcategory image is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    parentCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Parent category is required"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Subcategory", SubcategorySchema);
