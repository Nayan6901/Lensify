import subcategoryModel from "../model/subcategory.model.js";
import uploadImageToCloudinary from "../utils/uploadimageColudnary.js";

export async function createSubCategoryController(req, res) {
  try {
    const { name, description, parentCategory, status } = req.body;

    if (!name || !description || !parentCategory) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Prepare subcategory data
    const subcategoryData = {
      name,
      description,
      parentCategory,
      status: status || "active",
    };

    // Handle image upload
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file);
      subcategoryData.image = uploadResult.secure_url;
    }

    const subcategory = await subcategoryModel.create(subcategoryData);

    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllSubCategoriesController(req, res) {
  try {
    const subcategories = await subcategoryModel
      .find()
      .populate("parentCategory");
    res.status(200).json({
      success: true,
      message: "SubCategories fetched successfully",
      data: subcategories,
      count: subcategories.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getSubCategoryByIdController(req, res) {
  try {
    const { id } = req.params;
    const subcategory = await subcategoryModel
      .findById(id)
      .populate("parentCategory");
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "SubCategory fetched successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name, description, parentCategory, status } = req.body;

    // Prepare update data
    const updateData = {
      name,
      description,
      parentCategory,
      status,
    };

    // Handle image upload
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file);
      updateData.image = uploadResult.secure_url;
    }

    const subcategory = await subcategoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("parentCategory");

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    await subcategoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getSubCategoriesByCategoryController(req, res) {
  try {
    const { categoryId } = req.params;
    const subcategories = await subcategoryModel
      .find({ parentCategory: categoryId })
      .populate("parentCategory");
    res.status(200).json({
      success: true,
      message: "SubCategories fetched successfully",
      data: subcategories,
      count: subcategories.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
