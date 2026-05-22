const express = require('express');
const { body } = require('express-validator');

const {
  registerUser,
  loginUser,
  getProfile
} = require('../controllers/authController');

const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .isEmail()
      .withMessage('Valid email required'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email')
      .isEmail(),

    body('password')
      .notEmpty()
  ],
  validate,
  loginUser
);

router.get('/profile', protect, getProfile);

module.exports = router;