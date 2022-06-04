const { Products } = require('../models/productsModel');
const { ProductImgs } = require('../models/productImgModel');

const { storage } = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createProductImgs = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const productExists = await Products.findOne({
    where: { id: productId },
  });

  if (!productExists) {
    return next(new AppError('Product with given id does not exist', 403));
  }

  const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const productImage = await ProductImgs.create({
    productId,
    imgUrl: imgUploaded.metadata.fullPath,
  });

  res.status(201).json({ productImage });
});

const getAllProductImgs = catchAsync(async (req, res, next) => {
  const images = await ProductImgs.findAll({
    where: { status: 'active' },
    include: [{ model: Products }],
  });

  const imagesPromises = images.map(async image => {
    const imgRef = ref(storage, image.imgUrl);

    const url = await getDownloadURL(imgRef);

    image.imgUrl = url;

    return image;
  });
  const imagesResolved = await Promise.all(imagesPromises);

  res.status(200).json({
    imagesResolved,
  });
});

module.exports = {
  createProductImgs,
  getAllProductImgs,
};
