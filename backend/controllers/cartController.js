const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');


const addToCart = async (
  req,
  res
) => {

  try {

    const {
      productId,
      quantity
    } = req.body;

    let cart = await Cart.findOne({
      userId: req.user._id
    });

    if (!cart) {

      cart = await Cart.create({
        userId: req.user._id,
        items: []
      });
    }

    const existingItem =
      cart.items.find(
        item =>
          item.productId.toString() ===
          productId
      );

    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.items.push({
        productId,
        quantity
      });
    }

    await cart.save();

    const populatedCart =
      await Cart.findOne({
        userId: req.user._id
      }).populate({
        path: 'items.productId',
        select:
          'name price images stock'
      });

    res.status(200).json({
      success: true,
      message: 'Added To Cart',
      cart: populatedCart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getCart = async (
  req,
  res
) => {

  try {

    const cart = await Cart.findOne({
      userId: req.user._id
    }).populate({
      path: 'items.productId',
      select:
        'name price images stock'
    });

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateCartItem =
  async (req, res) => {

    try {

      const { quantity } =
        req.body;

      const cart =
        await Cart.findOne({
          userId: req.user._id
        });

      if (!cart) {

        return res.status(404).json({
          success: false,
          message: 'Cart Not Found'
        });
      }

      const item = cart.items.find(
        item =>
          item.productId.toString() ===
          req.params.productId
      );

      if (!item) {

        return res.status(404).json({
          success: false,
          message: 'Item Not Found'
        });
      }

      item.quantity = quantity;

      await cart.save();
      
      const populatedCart =
        await Cart.findOne({
          userId: req.user._id
        }).populate({
          path: 'items.productId',
          select:
            'name price images stock'
        });

      res.status(200).json({
        success: true,
        message: 'Cart Updated',
        cart: populatedCart
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
};

const removeCartItem =
  async (req, res) => {

    try {

      const cart =
        await Cart.findOne({
          userId: req.user._id
        });

      if (!cart) {

        return res.status(404).json({
          success: false,
          message: 'Cart Not Found'
        });
      }

      cart.items = cart.items.filter(
        item =>
          item.productId.toString() !==
          req.params.productId
      );

      await cart.save();

      const populatedCart =
        await Cart.findOne({
          userId: req.user._id
        }).populate({
          path: 'items.productId',
          select:
            'name price images stock'
        });

      res.status(200).json({
        success: true,
        message: 'Item Removed',
        cart: populatedCart
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
};

const clearCart =
  async (req, res) => {

    try {

      const cart =
        await Cart.findOne({
          userId: req.user._id
        });

      if (!cart) {

        return res.status(404).json({
          success: false,
          message: 'Cart Not Found'
        });
      }

      cart.items = [];

      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Cart Cleared',
        cart
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
};