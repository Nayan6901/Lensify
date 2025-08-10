import categoryModel from "../model/category.model.js";
import uploadImageToCloudinary from "../utils/uploadimageColudnary.js";

export async function createCategoryController(req, res) {
  try {
    const { name, description, status } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Prepare category data
    const categoryData = {
      name,
      description,
      status: status || "active",
    };

    // Handle image upload
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file);
      categoryData.image = uploadResult.secure_url;
    }

    const category = await categoryModel.create(categoryData);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllCategoriesController(req, res) {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getCategoryByIdController(req, res) {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
