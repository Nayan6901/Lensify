import { Router } from "express";
import {
  createSubCategoryController,
  getAllSubCategoriesController,
  getSubCategoryByIdController,
  updateSubCategoryController,
  deleteSubCategoryController,
  getSubCategoriesByCategoryController,
} from "../controllers/subcategory.controllers.js";
import upload from "../middlewear/multers.js";

const subcategoryRouter = Router();

subcategoryRouter.post(
  "/addsubcategory",
  upload.single("image"),
  createSubCategoryController
);
subcategoryRouter.get("/allsubcategories", getAllSubCategoriesController);
subcategoryRouter.get(
  "/category/:categoryId",
  getSubCategoriesByCategoryController
);
subcategoryRouter.get("/:id", getSubCategoryByIdController);
subcategoryRouter.put(
  "/:id",
  upload.single("image"),
  updateSubCategoryController
);
subcategoryRouter.delete("/:id", deleteSubCategoryController);

export default subcategoryRouter;
