import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    adress_line: {
      type: String,
      required: [true, "Address line is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    mobile_no: {
      type: number,
      required: [true, "Mobile number is required"],
    },
    status: {
      tyepe: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const AdressModel = mongoose.model("Address", addressSchema);
export default AdressModel;
