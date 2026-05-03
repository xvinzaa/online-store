# Vincent Store — Full Stack Online Store

Aplikasi toko online lengkap dengan autentikasi JWT, shopping cart, checkout, deployment, dan monitoring.

## Fitur

| Fitur | Deskripsi |
|-------|-----------|
| **LO1** | Frontend React — Home, Produk, Detail, Cart, Login, Register |
| **LO2** | Backend REST API — CRUD produk, autentikasi |
| **LO3** | JWT Authentication — login, register, proteksi route |
| **LO4** | Deployment — Backend ke Render, Frontend ke Netlify |
| **LO4** | Monitoring — Google Analytics 4 |

---

## Struktur Proyek

```
online-store/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── models/
│   │   ├── Product.js       # Product schema
│   │   └── User.js         # User schema (bcrypt hashed)
│   ├── routes/
│   │   ├── auth.js          # Auth endpoints (login/register/me)
│   │   └── products.js      # Product CRUD endpoints
│   ├── server.js            # Express entry point
│   ├── seed.js              # Seed script
│   ├── render.yaml          # Render deployment config
│   ├── .env                 # Environment variables
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── PrivateRoute.jsx   # Route guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state management
│   │   │   └── CartContext.jsx   # Cart state management
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx          # Protected (login required)
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios + auth headers
│   │   ├── App.jsx
│   │   └── App.css
│   ├── index.html                 # GA4 script included
│   ├── netlify.toml               # Netlify deployment config
│   ├── .env                       # VITE_API_URL dev
│   └── .env.example
├── README.md
└── seed.js
```

---

## Cara Menjalankan (Local)

### Prasyarat
- Node.js v18+
- MongoDB (local atau MongoDB Atlas)
- npm / yarn

### 1. Backend

```bash
cd backend

# Install dependencies
npm install

# Buat file .env
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/online-store
# JWT_SECRET=your_secret_key_here

# Jalankan server
npm start
# atau development mode (auto-reload):
npm run dev
```

Backend berjalan di `http://localhost:5000`

### 2. Frontend (terminal baru)

```bash
cd frontend

# Install dependencies
npm install

# Jalankan React app
npm run dev
```

Frontend berjalan di `http://localhost:5000`

### 3. Seed Data (Opsional)

```bash
node seed.js
```

---

## API Endpoints

### Auth API (`/api/auth`)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/auth/register` | Registrasi user baru |
| `POST` | `/api/auth/login` | Login, returns JWT token |
| `GET`  | `/api/auth/me` | Verifikasi token & get user info |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Products API (`/api/products`)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET`  | `/api/products` | Ambil semua produk |
| `GET`  | `/api/products/:id` | Ambil produk by ID |
| `POST` | `/api/products` | Tambah produk baru |
| `PUT`  | `/api/products/:id` | Update produk |
| `DELETE` | `/api/products/:id` | Hapus produk |

**Query Params (`GET /api/products`):**

| Param | Contoh | Keterangan |
|-------|--------|-----------|
| `category` | `?category=Electronics` | Filter kategori |
| `search` | `?search=laptop` | Cari nama (case-insensitive) |
| `sort` | `?sort=price_asc` | `price_asc`, `price_desc`, `name_asc`, `newest` |

---

## Fitur Keamanan (LO3)

### JWT Authentication Flow
1. User registrasi/login → server kirim JWT token
2. Token disimpan di `localStorage`
3. Setiap request API, token dikirim via header `Authorization: Bearer <token>`
4. Route `/cart` dan checkout hanya bisa diakses user login
5. Tombol "Add to Cart" redirect ke login jika belum autentikasi

### Proteksi Route
- `/cart` — Protected (PrivateRoute) → redirect ke `/login`
- `/login`, `/register` — Public
- `/`, `/products`, `/products/:id` — Public

---

## Deployment (LO4)

### Langkah 1 — Deploy Backend ke Render

> Backend menggunakan Node.js + Express + MongoDB. Render adalah pilihan gratis yang mudah.

1. Buka [render.com](https://render.com) → buat akun → **New → Web Service**
2. Connect repository GitHub Anda
3. Konfigurasi:
   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `backend` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
4. Klik **Add Environment Variable** dan isi:
   - `MONGO_URI` → URI MongoDB Atlas Anda (contoh: `mongodb+srv://user:pass@cluster.mongodb.net/vincent-store`)
   - `JWT_SECRET` → String acak min. 32 karakter
   - `NODE_ENV` → `production`
   - `PORT` → `10000` (opsional, Render auto-assigns)
5. Klik **Deploy Web Service**
6. Tunggu sampai deploy selesai. URL backend Anda akan terlihat di dashboard, contoh:
   **`https://vincent-store-api.onrender.com`**

> ⚠️ Setelah backend berhasil di-deploy, **copy URL-nya** (tanpa trailing slash) untuk langkah berikutnya.

---

### Langkah 2 — Deploy Frontend ke Netlify

> Frontend adalah React + Vite yang butuh `VITE_API_URL` menunjuk ke backend Render.

1. Buka [netlify.com](https://netlify.com) → buat akun → **Add new site → Import an existing project → GitHub**
2. Pastikan settings ini sudah benar:
   | Setting | Value |
   |---------|-------|
   | **Base directory** | `frontend` |
   | **Build command** | `npm run build` |
   | **Publish directory** | `dist` |
3. Klik **Add environment variables**:
   - `VITE_API_URL` = `https://your-render-url.onrender.com/api` ← ganti dengan URL Render Anda
4. Klik **Deploy site**

> Alternatif: edit `frontend/netlify.toml` (sudah dikonfigurasi) — Netlify akan auto-read.

---

### Langkah 2b — Deploy Frontend ke Vercel (Opsional)

> Jika memilih Vercel sebagai alternatif Netlify.

1. Buka [vercel.com](https://vercel.com) → Import project → pilih repo
2. Set:
   - **Framework Preset:** Vite (atau "Other")
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Di **Environment Variables**:
   - `VITE_API_URL` = `https://your-render-url.onrender.com/api`
4. Klik **Deploy**

> File `frontend/vercel.json` sudah dikonfigurasi untuk auto-configure routing SPA.

---

### Langkah 3 — Verifikasi Deployment

Setelah kedua service deploy:

1. Buka URL frontend Netlify/Vercel Anda
2. Buka DevTools → Network tab
3. Cek apakah produk muncul (artinya frontend bisa fetch dari backend)
4. Jika ada error CORS/network, pastikan:
   - `VITE_API_URL` di Netlify/Vercel sudah benar (termasuk `/api`)
   - Backend Render sudah selesai deploy (tunggu ~2-3 menit setelah push)
   - `MONGO_URI` dan `JWT_SECRET` sudah diset di Render dashboard

---

### Ringkasan Link Deployment

| Service | URL |
|---------|-----|
| **Frontend (Netlify)** | `https://vincent-store.netlify.app` |
| **Backend (Render)** | `https://vincent-store-api.onrender.com` |

> ⚠️ Ganti link di atas dengan link deployment aktual Anda.

---

## Monitoring (LO4)

### Google Analytics 4

1. Buka [Google Analytics](https://analytics.google.com)
2. Buat property baru → pilih **Web**
3. Masukkan URL website deployment
4. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)
5. Paste ke `frontend/index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

**Yang Dipantau GA4:**
- Page views (setiap halaman yang dibuka)
- User sessions
- Traffic sources
- E-commerce events (jika dikonfigurasi)
- Checkout funnel

---

## Teknologi

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| State | Context API (Auth + Cart) |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Deployment | Render (backend) + Netlify (frontend) |
| Monitoring | Google Analytics 4 |
| Styles | CSS3 (Flexbox, Grid, CSS Variables) |

---

## Link Deployment

| Service | URL |
|---------|-----|
| **Frontend (Netlify)** | `https://vincent-store.netlify.app` |
| **Backend (Render)** | `https://vincent-store-api.onrender.com` |

> ⚠️ Ganti link di atas dengan link deployment aktual Anda.

---

## Kategori Produk

- Electronics
- Clothing
- Books
- Home & Garden
- Sports
- Toys
