const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('username').notEmpty().withMessage('Username cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createProductValidations = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('description').notEmpty().withMessage('Description cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isInt({ min: 1 })
    .withMessage('Price cannot be 0'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be empty')
    .isInt({ min: 1 })
    .withMessage('Quantity cannot be 0'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = {
  createUserValidations,
  createProductValidations,
  checkValidations,
};
