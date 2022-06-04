const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddlewares');

const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

// Controller
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken,
  getUserOrders,
  getUserOrdersById,
  getUserProducts,
} = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', login);

router.use(protectToken);

router.get('/me', getUserProducts);

router.get('/orders', getUserOrders);

router.get('/orders/:id', getUserOrdersById);

router.get('/check-token', checkToken);

router
  .use('/:id', userExists, protectAccountOwner)
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };
