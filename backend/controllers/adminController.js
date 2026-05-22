const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select('-password');

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate('userId')
      .sort({ createdAt: -1 });

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

const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(
      req.params.orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct
};