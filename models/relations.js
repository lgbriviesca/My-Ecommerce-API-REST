const { Cart } = require('./cartModel');
const { Order } = require('./ordersModel');
const { ProductsInCart } = require('./productsInCartModel.js');
const { Products } = require('./productsModel.js');
const { User } = require('./usersModel.js');
const { Category } = require('./categoriesModel.js');
const { ProductImgs } = require('../models/productImgModel');

const initRelations = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasOne(Cart);
  Cart.belongsTo(User);

  User.hasMany(Products);
  Products.belongsTo(User);

  Cart.hasOne(Order);
  Order.belongsTo(Cart);

  Cart.hasMany(ProductsInCart);
  ProductsInCart.belongsTo(Cart);

  Products.hasOne(ProductsInCart);
  ProductsInCart.belongsTo(Products);

  Category.hasOne(Products);
  Products.belongsTo(Category);

  Products.hasMany(ProductImgs);
  ProductImgs.belongsTo(Products);
};

module.exports = { initRelations };
