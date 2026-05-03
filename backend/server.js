require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const FRONTEND_URLS = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',')
  : ['http://localhost:5173', 'http://localhost:5000'];

app.use(
  cors({
    origin: FRONTEND_URLS,
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Vincent Store API is running',
    endpoints: {
      register:      'POST /api/auth/register',
      login:         'POST /api/auth/login',
      me:            'GET  /api/auth/me',
      products:      'GET  /api/products',
      productById:   'GET  /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT  /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err.message));

module.exports = app;
