import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";

export async function addToCartController(req, res) {
  try {
    const { user, items } = req.body;
    const product = items[0].product;
    const quantity = items[0].quantity;

    if (!user || !product || !quantity) {
      return res.status(400).json({
        success: false,
        message: "User ID, Product ID and Quantity are required",
      });
    }
    let existingCart = await cartModel.findOne({ user });
    if (existingCart) {
      const productDetails = await productModel.findById(product);
      if (!productDetails) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const existingItem = existingCart.items.find(
        (item) => item.product.toString() === product
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        existingCart.items.push({ product, quantity });
      }

      // Recalculate total price for all items
      let totalPrice = 0;
      for (let item of existingCart.items) {
        const prodDetails = await productModel.findById(item.product);
        if (prodDetails) {
          totalPrice += prodDetails.currentPrice * item.quantity;
        }
      }
      existingCart.totalPrice = totalPrice;

      await existingCart.save();
      return res.status(200).json({
        success: true,
        message: "Product added to existing cart",
        cart: existingCart,
      });
    }
    const cart = await cartModel.create({
      user,
      items: [
        {
          product,
          quantity,
        },
      ],
      totalPrice: 0, // This will be calculated later
    });
    // Calculate total price (you'll need the product price)

    let totalPrice = 0;
    for (let item of cart.items) {
      const productDetails = await productModel.findById(item.product);
      if (productDetails) {
        totalPrice += productDetails.currentPrice * item.quantity;
      }
    }
    cart.totalPrice = totalPrice;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
}
export async function getCartController(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
}
export async function updateitemquntity(req, res) {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        message: "User ID, Product ID and Quantity are required",
        success: false,
      });
    }
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than zero",
        success: false,
      });
    }
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
}
