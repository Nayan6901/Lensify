import { Router } from "express";
import {
  createProductController,
  getallProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controllers.js";
import upload from "../middlewear/multers.js";

const productRouter = Router();
productRouter.post(
  "/addproduct",
  upload.array("images", 5),
  createProductController
);
productRouter.get("/allproducts", getallProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.put("/:id", upload.array("images", 5), updateProductController);
productRouter.delete("/:id", deleteProductController);

export default productRouter;
