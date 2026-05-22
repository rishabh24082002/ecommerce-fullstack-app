const express = require('express');

const {
  getUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct
} = require('../controllers/adminController');

const {
  protect,
  admin
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/users',
  protect,
  admin,
  getUsers
);

router.get(
  '/orders',
  protect,
  admin,
  getAllOrders
);

router.put(
  '/orders/:orderId/status',
  protect,
  admin,
  updateOrderStatus
);

router.delete(
  '/products/:id',
  protect,
  admin,
  deleteProduct
);

module.exports = router;