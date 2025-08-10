import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controllers.js";
import upload from "../middlewear/multers.js";

const categoryRouter = Router();

categoryRouter.post(
  "/addcategory",
  upload.single("image"),
  createCategoryController
);
categoryRouter.get("/allcategories", getAllCategoriesController);
categoryRouter.get("/:id", getCategoryByIdController);
categoryRouter.put("/:id", upload.single("image"), updateCategoryController);
categoryRouter.delete("/:id", deleteCategoryController);

export default categoryRouter;
