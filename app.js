const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { globalErrorHandler } = require('./controllers/errorsController');

const { usersRouter } = require('./routes/usersRoutes');
const { productsRouter } = require('./routes/productsRouter');
const { cartRouter } = require('./routes/cartRouter');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // Significa 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/cart', cartRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
