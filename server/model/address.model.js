import mongoose from "mongoose";
const adressschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    landmark: {
      type: String,
      required: [true, "Landmark is required"],
    },
    isDefault: {
      type: Boolean,
      default: false,
      required: [true, "Default address status is required"],
    },
  },
  { timestamps: true }
);
const Address = mongoose.model("Address", adressschema);
export default Address;
