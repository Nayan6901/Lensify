import productModel from "../model/product.model.js";
import uploadImageToCloudinary from "../utils/uploadimageColudnary.js";

export async function createProductController(req, res) {
  try {
    const {
      name,
      description,
      brand,
      sku,
      category,
      subcategory,
      lensType,
      currentPrice,
      originalPrice,
      frameType,
      frameColors,
      material,
      tags,
      stock,
    } = req.body;

    // Handle image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadImageToCloudinary(file);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    if (
      !name ||
      !description ||
      !brand ||
      !sku ||
      !category ||
      !subcategory ||
      !lensType ||
      !currentPrice ||
      !originalPrice ||
      !frameType ||
      !frameColors ||
      !material ||
      !tags ||
      !stock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const product = await productModel.create({
      name,
      description,
      brand,
      sku,
      category,
      subcategory,
      lensType,
      currentPrice,
      originalPrice,
      frameType,
      frameColors,
      material,
      tags,
      stock,
      images: imageUrls,
    });
    res.status(201).json({
      success: true,
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getallProductController(req, res) {
  try {
    const products = await productModel.find();
    //return sucess
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getProductByIdController(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      brand,
      sku,
      category,
      subcategory,
      lensType,
      currentPrice,
      originalPrice,
      frameType,
      frameColors,
      material,
      tags,
      stock,
    } = req.body;

    // Handle image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadImageToCloudinary(file);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    // Prepare update data
    const updateData = {
      name,
      description,
      brand,
      sku,
      category,
      subcategory,
      lensType,
      currentPrice,
      originalPrice,
      frameType,
      frameColors,
      material,
      tags,
      stock,
    };

    // Only update images if new ones are uploaded
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const product = await productModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function deleteProductController(req, res) {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
