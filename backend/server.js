require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

// 1. Validasi Environment Variables
if (!process.env.MONGO_URI) {
  console.error('❌ KESALAHAN FATAL: MONGO_URI tidak ditemukan di file .env');
  process.exit(1);
}

// 2. Konfigurasi CORS
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

// 3. Monitor Status Koneksi Mongoose (Global)
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose terhubung ke MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose koneksi error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose terputus dari database');
});

// 4. Root Route dengan Health Check Dinamis
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  res.json({
    message: 'Vincent Store API is running',
    database_status: statusMap[dbStatus] || 'Unknown',
    server_time: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} seconds`,
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login:    'POST /api/auth/login',
        me:       'GET /api/auth/me',
      },
      products: {
        list:   'GET /api/products',
        detail: 'GET /api/products/:id',
        create: 'POST /api/products',
        update: 'PUT /api/products/:id',
        delete: 'DELETE /api/products/:id',
      },
    },
  });
});

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 6. Jalankan Server & Database
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
      console.log(`📡 CORS diizinkan untuk: ${FRONTEND_URLS.join(', ')}`);
    });
  })
  .catch((err) => {
    console.error('❌ Gagal inisialisasi database:', err.message);
  });

module.exports = app;