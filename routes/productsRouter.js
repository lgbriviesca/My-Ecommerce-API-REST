const express = require('express');

const { protectToken } = require('../middlewares/usersMiddlewares');

const { protectProductsOwner } = require('../middlewares/productsMiddlewares');

const { upload } = require('../utils/multer');

const {
  createProductValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

const {
  getAllCategories,
  createCategory,
  updateCategory,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

const {
  getAllProductImgs,
  createProductImgs,
} = require('../controllers/productImgController');

const router = express.Router();

router.use(protectToken);

router.get('/categories', getAllCategories);

router.post('/categories', createCategory);

router.patch('/categories/:id', updateCategory);

router.get('/', getAllProducts);

router.get('/images/', getAllProductImgs);

router.post('/images/', upload.single('imgUrl'), createProductImgs);

router.get('/:id', getProductById);

router.post('/', createProductValidations, checkValidations, createProduct);

router
  .route('/:id')
  .patch(protectProductsOwner, updateProduct)
  .delete(protectProductsOwner, deleteProduct);

module.exports = { productsRouter: router };
