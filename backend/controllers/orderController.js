const mongoose = require('mongoose');

const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {

  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {

    const {
  fullName,
  address,
  phone
} = req.body;

    const cart =
      await Cart.findOne({
        userId: req.user._id
      }).populate('items.productId');

    if (
      !cart ||
      cart.items.length === 0
    ) {

      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    let totalAmount = 0;

    const products = [];

    for (const item of cart.items) {

      const product =
        await Product.findById(
          item.productId._id
        ).session(session);

      if (!product) {

        throw new Error(
          'Product not found'
        );
      }

      if (
        product.stock <
        item.quantity
      ) {

        throw new Error(
          `${product.name} out of stock`
        );
      }

      product.stock -=
        item.quantity;

      await product.save({
        session
      });

      products.push({

        productId:
          product._id,

        quantity:
          item.quantity,

        price:
          product.price
      });

      totalAmount +=
        product.price *
        item.quantity;
    }

    const order =
      await Order.create(
        [
          {
            userId:
              req.user._id,

            products,

            totalAmount,

            userDetails: {

              name: fullName,

              email:
                req.user.email,

              address,

              phone
            }
          }
        ],
        { session }
      );

    cart.items = [];

    cart.markModified('items');

    await cart.save({
      session
    });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message:
        'Order placed successfully',
      order: order[0]
    });

  } catch (error) {

    await session.abortTransaction();

    res.status(500).json({
      success: false,
      message: error.message
    });

  } finally {

    session.endSession();
  }
};

const getOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find({
        userId: req.user._id
      })
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOrderById = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.orderId
      ).populate(
        'products.productId'
      );

    if (!order) {

      return res.status(404).json({
        success: false,
        message:
          'Order not found'
      });
    }

    if (
      order.userId.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};