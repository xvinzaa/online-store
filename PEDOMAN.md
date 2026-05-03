# PEDOMAN PENGGUNAAN
# APLIKASI TOKO ONLINE
# (Frontend & Backend Development)

---

**Disusun untuk Memenuhi Tugas Mata Kuliah**
**Platform Development**

---

**Nama:** ____________________________
**NIM:** ____________________________
**Kelas:** ____________________________

---

## DAFTAR ISI

1. [Pendahuluan](#1-pendahuluan)
2. [Struktur Proyek](#2-struktur-proyek)
3. [Persyaratan Sistem](#3-persyaratan-sistem)
4. [Instalasi](#4-instalasi)
5. [Menjalankan Aplikasi](#5-menjalankan-aplikasi)
6. [Dokumentasi API](#6-dokumentasi-api)
7. [Struktur Kode](#7-struktur-kode)
8. [Panduan Penggunaan](#8-panduan-penggunaan)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. PENDAHULUAN

### 1.1 Deskripsi Proyek

Aplikasi Toko Online adalah proyek full-stack yang dibangun untuk memenuhi capaian pembelajaran:

| LO | Deskripsi | Bobot |
|----|-----------|-------|
| LO1 | Frontend Development (React) - Halaman Beranda, Daftar Produk, Detail Produk dengan React Router dan layout Flexbox/CSS Grid | 35% |
| LO2 | Backend Development (Node.js & Express) - RESTful API dengan operasi CRUD, MongoDB untuk penyimpanan data | 35% |
| LO2 | Integrasi - Frontend terintegrasi dengan backend menggunakan Axios | 30% |

### 1.2 Teknologi yang Digunakan

**Frontend:**
- React 18
- React Router DOM v6
- Axios (HTTP Client)
- Vite (Build Tool)
- CSS3 (Flexbox & Grid)

**Backend:**
- Node.js
- Express.js
- Mongoose (ODM)
- CORS
- dotenv

**Database:**
- MongoDB

---

## 2. STRUKTUR PROYEEK

```
online-store/
│
├── backend/                         # Folder Backend API
│   ├── models/
│   │   └── Product.js              # Schema produk MongoDB
│   ├── routes/
│   │   └── products.js             # Endpoint API RESTful
│   ├── server.js                   # Entry point server
│   ├── package.json                # Dependencies backend
│   └── .env                        # Konfigurasi environment
│
├── frontend/                        # Folder Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Komponen navigasi
│   │   │   └── ProductCard.jsx    # Kartu produk
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Halaman beranda
│   │   │   ├── ProductList.jsx    # Halaman daftar produk
│   │   │   └── ProductDetail.jsx # Halaman detail produk
│   │   ├── services/
│   │   │   └── api.js             # Service Axios
│   │   ├── App.jsx                # Komponen utama + Router
│   │   ├── App.css                # Styling CSS
│   │   └── main.jsx               # Entry point React
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies frontend
│   └── vite.config.js             # Konfigurasi Vite
│
├── seed.js                          # Script seed data
├── README.md                        # Dokumentasi teknis
└── PEDOMAN.md                       # Dokumen ini
```

---

## 3. PERSYARATAN SISTEM

### 3.1 Software yang Diperlukan

| Software | Versi Minimum | Keterangan |
|----------|---------------|-------------|
| Node.js | v18.x atau terbaru | Download di nodejs.org |
| MongoDB | v6.0 atau terbaru | Local installation atau Atlas cloud |
| npm | v9.x atau terbaru | Sudah termasuk dalam Node.js |
| Text Editor | - | VS Code (recommended) |

### 3.2 Spesifikasi Hardware

- RAM minimum: 4 GB
- Storage minimum: 500 MB
- Koneksi internet (untuk install dependencies)

---

## 4. INSTALASI

### 4.1 Install Node.js

1. Buka https://nodejs.org
2. Download versi LTS (Long Term Support)
3. Install dengan pengaturan default
4. Verifikasi instalasi:
   ```bash
   node --version
   npm --version
   ```

### 4.2 Install MongoDB

**Opsi A: MongoDB Local**

1. Download MongoDB Community Server di https://www.mongodb.com/try/download/community
2. Pilih versi: Community Server, Windows, MSI
3. Install dengan pengaturan default
4. Buat folder untuk data:
   ```bash
   mkdir C:\data\db
   ```
5. Jalankan MongoDB:
   ```bash
   mongod --dbpath C:\data\db
   ```

**Opsi B: MongoDB Atlas (Cloud)**

1. Buka https://www.mongodb.com/cloud/atlas
2. Daftar akun gratis
3. Buat cluster baru (Free Tier)
4. Buat database user
5. Dapatkan connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/online-store
   ```

### 4.3 Install Dependencies

**Backend:**
```bash
cd online-store/backend
npm install
```

**Frontend:**
```bash
cd online-store/frontend
npm install
```

---

## 5. MENJALANKAN APLIKASI

### 5.1 Konfigurasi Environment

Edit file `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/online-store
```

> Untuk MongoDB Atlas, gunakan connection string dari langkah 4.2

### 5.2 Langkah Menjalankan

**Langkah 1: Jalankan Backend (Terminal 1)**

```bash
cd online-store/backend
npm start
```

Output yang diharapkan:
```
Connected to MongoDB
Server running on http://localhost:5000
```

**Langkah 2: Jalankan Frontend (Terminal 2)**

```bash
cd online-store/frontend
npm run dev
```

Output yang diharapkan:
```
VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

**Langkah 3: Buka Browser**

Buka http://localhost:3000 di browser Anda.

### 5.3 Menambahkan Data Awal (Seed Data)

Untuk menambahkan 12 produk contoh:

```bash
cd online-store
node seed.js
```

Output yang diharapkan:
```
Connected to MongoDB
Cleared existing products
Successfully seeded 12 products
Disconnected from MongoDB
```

---

## 6. DOKUMENTASI API

### 6.1 Endpoint Overview

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /api/products | Mengambil semua produk |
| GET | /api/products/:id | Mengambil produk berdasarkan ID |
| POST | /api/products | Menambah produk baru |
| PUT | /api/products/:id | Mengupdate produk |
| DELETE | /api/products/:id | Menghapus produk |

### 6.2 GET /api/products

**Deskripsi:** Mengambil semua produk dengan opsi filter dan sorting

**Query Parameters:**
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| category | string | Filter berdasarkan kategori |
| search | string | Pencarian berdasarkan nama |
| sort | string | Sorting: price_asc, price_desc, name_asc, newest |

**Contoh Request:**
```bash
# Semua produk
GET http://localhost:5000/api/products

# Filter kategori Electronics
GET http://localhost:5000/api/products?category=Electronics

# Sort harga terendah
GET http://localhost:5000/api/products?sort=price_asc

# Pencarian
GET http://localhost:5000/api/products?search=laptop
```

**Contoh Response:**
```json
[
  {
    "_id": "65fxxxxx",
    "name": "Laptop ASUS VivoBook 15",
    "price": 12500000,
    "description": "Laptop ultra-tipis...",
    "category": "Electronics",
    "image": "https://images.unsplash.com/...",
    "stock": 12,
    "rating": 4.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

### 6.3 GET /api/products/:id

**Deskripsi:** Mengambil satu produk berdasarkan ID

**Contoh Request:**
```bash
GET http://localhost:5000/api/products/65fxxxxx
```

**Contoh Response:**
```json
{
  "_id": "65fxxxxx",
  "name": "Laptop ASUS VivoBook 15",
  "price": 12500000,
  "description": "Laptop ultra-tipis dengan processor...",
  "category": "Electronics",
  "image": "https://images.unsplash.com/...",
  "stock": 12,
  "rating": 4.5,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

### 6.4 POST /api/products

**Deskripsi:** Menambah produk baru

**Request Body:**
```json
{
  "name": "Nama Produk",
  "price": 1000000,
  "description": "Deskripsi produk",
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "stock": 10,
  "rating": 4.5
}
```

**Contoh Request:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produk Baru",
    "price": 500000,
    "description": "Deskripsi produk baru",
    "category": "Electronics",
    "stock": 5,
    "rating": 4.0
  }'
```

### 6.5 PUT /api/products/:id

**Deskripsi:** Mengupdate produk yang ada

**Contoh Request:**
```bash
curl -X PUT http://localhost:5000/api/products/65fxxxxx \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1500000,
    "stock": 20
  }'
```

### 6.6 DELETE /api/products/:id

**Deskripsi:** Menghapus produk

**Contoh Request:**
```bash
curl -X DELETE http://localhost:5000/api/products/65fxxxxx
```

**Contoh Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 7. STRUKTUR KODE

### 7.1 Backend - Product Model

```javascript
// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys']
  },
  image: { type: String, default: 'placeholder.jpg' },
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
```

### 7.2 Backend - Product Routes

```javascript
// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products (dengan filter & sorting)
router.get('/', async (req, res) => { ... });

// GET single product
router.get('/:id', async (req, res) => { ... });

// POST create product
router.post('/', async (req, res) => { ... });

// PUT update product
router.put('/:id', async (req, res) => { ... });

// DELETE product
router.delete('/:id', async (req, res) => { ... });

module.exports = router;
```

### 7.3 Backend - Server Entry Point

```javascript
// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, ...))
  .catch(err => console.error(err));
```

### 7.4 Frontend - API Service

```javascript
// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => { ... };
export const updateProduct = async (id, product) => { ... };
export const deleteProduct = async (id) => { ... };
```

### 7.5 Frontend - React Router Setup

```jsx
// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
```

---

## 8. PANDUAN PENGGUNAAN

### 8.1 Halaman Beranda (Home)

**URL:** http://localhost:3000/

**Fitur:**
- Hero section dengan judul toko online
- Tombol "Lihat Semua Produk" menuju ke halaman daftar produk
- 4 produk unggulan (diambil dari API)
- Section fitur toko (pengiriman, pembayaran, kualitas)

**[TAMPILKAN SCREENSHOT HALAMAN BERANDA DI SINI]**

### 8.2 Halaman Daftar Produk

**URL:** http://localhost:3000/products

**Fitur:**
- Grid/list semua produk dari database
- Filter berdasarkan kategori (Electronics, Clothing, Books, dll)
- Sorting (Terbaru, Harga Rendah-Tinggi, Tinggi-Rendah, A-Z)
- Search/pencarian produk
- Klik produk untuk melihat detail

**Opsi Filter:**
| Kategori |
|----------|
| Semua Kategori |
| Electronics |
| Clothing |
| Books |
| Home & Garden |
| Sports |
| Toys |

**[TAMPILKAN SCREENSHOT HALAMAN DAFTAR PRODUK DI SINI]**

### 8.3 Halaman Detail Produk

**URL:** http://localhost:3000/products/:id

**Fitur:**
- Gambar produk besar
- Nama, harga, kategori, rating
- Deskripsi lengkap produk
- Informasi stok
- Tombol "Tambah ke Keranjang"
- Link kembali ke daftar produk

**[TAMPILKAN SCREENSHOT HALAMAN DETAIL PRODUK DI SINI]**

### 8.4 Navigasi

**Navbar** terdapat di setiap halaman dengan link:
- Beranda (Home)
- Produk (Products)

---

## 9. TROUBLESHOOTING

### 9.1 MongoDB Connection Error

**Error:**
```
MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solusi:**
1. Pastikan MongoDB sudah diinstall
2. Jalankan `mongod --dbpath C:\data\db` di terminal
3. Atau gunakan MongoDB Atlas untuk koneksi cloud

### 9.2 Frontend Cannot Connect to Backend

**Error:**
```
Network Error atau CORS Error
```

**Solusi:**
1. Pastikan backend berjalan di port 5000
2. Cek file `backend/server.js` - CORS sudah dikonfigurasi
3. Cek `frontend/vite.config.js` - proxy sudah diset

### 9.3 Port Already in Use

**Error:**
```
Error: listen EADDRINUSE :::5000
```

**Solusi:**
1. Identifikasi proses yang menggunakan port:
   ```bash
   netstat -ano | findstr :5000
   ```
2. Kill proses atau gunakan port berbeda di `.env`

### 9.4 npm install Gagal

**Solusi:**
1. Bersihkan cache npm:
   ```bash
   npm cache clean --force
   ```
2. Hapus folder `node_modules` dan `package-lock.json`
3. Jalankan `npm install` ulang

### 9.5 Vite Build Error

**Solusi:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## LAMPIRAN

### A. Daftar Kategori Produk

1. Electronics
2. Clothing
3. Books
4. Home & Garden
5. Sports
6. Toys

### B. Daftar Produk Seed Data

| No | Nama Produk | Kategori | Harga |
|----|------------|----------|-------|
| 1 | Laptop ASUS VivoBook 15 | Electronics | Rp 12.500.000 |
| 2 | Smartphone Samsung Galaxy A54 | Electronics | Rp 4.999.000 |
| 3 | Kaos Polos Premium Cotton | Clothing | Rp 125.000 |
| 4 | Buku Panduan Pemrograman React | Books | Rp 185.000 |
| 5 | Meja Belajar Minimalis | Home & Garden | Rp 1.500.000 |
| 6 | Sepatu Running Nike Air Max | Sports | Rp 2.599.000 |
| 7 | Lego City Police Station | Toys | Rp 3.500.000 |
| 8 | Headphone Sony WH-1000XM5 | Electronics | Rp 5.999.000 |
| 9 | Jaket Hoodie Fleece | Clothing | Rp 350.000 |
| 10 | Buku Desain UI/UX Modern | Books | Rp 225.000 |
| 11 | Tanaman Hias Monstera | Home & Garden | Rp 275.000 |
| 12 | Dumbbell Set 20kg | Sports | Rp 890.000 |

### C. Referensi

- Dokumentasi React: https://react.dev
- Dokumentasi Express: https://expressjs.com
- Dokumentasi MongoDB: https://docs.mongodb.com
- Dokumentasi Mongoose: https://mongoosejs.com/docs
- Dokumentasi React Router: https://reactrouter.com

---

## CATATAN

Dokumen ini disusun untuk membantu pengguna dalam menjalankan dan memahami aplikasi Toko Online yang dibangun dengan React (Frontend) dan Node.js/Express/MongoDB (Backend).

Untuk pertanyaan lebih lanjut, silakan hubungi asisten dosen atau referensi yang tercantum di atas.

---

*© 2026 - Platform Development Assignment*
