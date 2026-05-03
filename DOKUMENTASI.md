# VINCENT STORE — DOKUMENTASI TEKNIS

**Proyek:** Toko Online Vincent Store
**Nama:** Vincent
**Mata Kuliah:** Full Stack Web Development
**Semester:** Genap 2026

---

## DAFTAR ISI

1. [Deskripsi Proyek](#1-deskripsi-proyek)
2. [Struktur Direktori](#2-struktur-direktori)
3. [Cara Menjalankan (Local)](#3-cara-menjalankan-local)
4. [LO3 — Autentikasi JWT](#4-lo3--autentikasi-jwt)
5. [LO4 — Deployment](#5-lo4--deployment)
6. [LO4 — Monitoring](#6-lo4--monitoring)
7. [Screenshot Hasil](#7-screenshot-hasil)
8. [Link Deployment](#8-link-deployment)
9. [Teknologi](#9-teknologi)

---

## 1. DESKRIPSI PROYEK

Vincent Store adalah aplikasi toko online full-stack dengan fitur autentikasi, deployment cloud, dan monitoring.

| No | Fitur | Bobot |
|----|-------|-------|
| 1 | Autentikasi JWT (Login & Register) | LO3 — 35% |
| 2 | Deployment (Backend + Frontend) | LO4 — 30% |
| 3 | Monitoring (Google Analytics 4) | LO4 — 35% |

---

## 2. STRUKTUR DIREKTORI

```
online-store/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── Product.js          # Schema produk
│   │   └── User.js             # Schema user (bcrypt)
│   ├── routes/
│   │   ├── auth.js             # POST /register, /login, GET /me
│   │   └── products.js         # CRUD produk
│   ├── server.js               # Entry point
│   ├── seed.js
│   ├── render.yaml             # Deploy config Render
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── PrivateRoute.jsx    # Route guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Auth state
│   │   │   └── CartContext.jsx      # Cart state
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx             # Protected
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/api.js          # Axios + interceptors
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html                   # GA4 script
│   ├── netlify.toml                 # Deploy config Netlify
│   ├── vite.config.js
│   ├── .env
│   └── package.json
├── README.md
└── seed.js
```

---

## 3. CARA MENJALANKAN (LOCAL)

### 3.1 Prasyarat

| Software | Versi |
|----------|-------|
| Node.js | v18+ |
| MongoDB | Local atau Atlas |
| npm | Latest |

### 3.2 Setup Backend

```powershell
# 1. Masuk folder backend
cd d:\test\online-store\backend

# 2. Install dependencies
npm install

# 3. Jalankan server
npm start
```

**Output yang diharapkan:**
```
Connected to MongoDB
Server running on http://localhost:5000
```

### 3.3 Setup Frontend (terminal baru)

```powershell
# 1. Masuk folder frontend
cd d:\test\online-store\frontend

# 2. Install dependencies
npm install

# 3. Jalankan aplikasi
npm run dev
```

**Output yang diharapkan:**
```
VITE ready in xxx ms
➜  Local: http://localhost:5173/
```

### 3.4 Seed Data (Opsional)

```powershell
cd d:\test\online-store
node seed.js
```

---

## 4. LO3 — AUTENTIKASI JWT

### 4.1 Arsitektur

```
Browser ──POST /api/auth/register──► Backend (Express)
◄──────── JWT Token + User ──────── bcrypt.hash → MongoDB

Browser ──POST /api/auth/login──────► Backend
◄──────── JWT Token + User ──────── bcrypt.compare → MongoDB

Browser ──GET /api/products (Header: Bearer <token>) ──► Backend
◄─────────────────── Data Produk ─────────────────── JWT verified
```

### 4.2 Proteksi Route

| Route | Proteksi | Redirect |
|-------|----------|----------|
| `/` | Public | - |
| `/products` | Public | - |
| `/products/:id` | Public | - |
| `/login` | Public | - |
| `/register` | Public | - |
| `/cart` | **Private** | → `/login` |
| Checkout | **Private** | → `/login` |

### 4.3 Auth API Endpoints

**POST /api/auth/register**
```
Request:
{
  "name": "Vincent",
  "email": "vincent@test.com",
  "password": "test123"
}

Response (201):
{
  "token": "eyJhbGci...",
  "user": { "id": "...", "name": "Vincent", "email": "vincent@test.com" }
}
```

**POST /api/auth/login**
```
Request:
{ "email": "vincent@test.com", "password": "test123" }

Response (200):
{ "token": "eyJhbGci...", "user": { "id": "...", "name": "Vincent", "email": "..." } }
```

### 4.4 Keamanan

| Aspek | Implementasi |
|-------|-------------|
| Password Hashing | bcryptjs (salt: 12) |
| Token | JWT, expires 7 hari |
| Token Storage | localStorage |
| Auth Header | `Authorization: Bearer <token>` |
| Route Guard | PrivateRoute.jsx |

---

## 5. LO4 — DEPLOYMENT

### 5.1 DEPLOY BACKEND KE RENDER

**Prasyarat:** Akun Render.com + Repository GitHub

**Langkah:**

```
1. Buka https://render.com → Login dengan GitHub

2. Klik "New +" → "Web Service"

3. Connect repository GitHub → Pilih repo "online-store"

4. Konfigurasi Web Service:
   ┌─────────────────────────────────────────┐
   │ Name:              vincent-store-api    │
   │ Region:            Singapore             │
   │ Branch:            main                  │
   │ Root Directory:    backend              │
   │ Runtime:           Node                   │
   │ Build Command:     npm install           │
   │ Start Command:     npm start             │
   │ Plan:              Free                  │
   └─────────────────────────────────────────┘

5. Klik "Create Web Service"

6. Tunggu build selesai (~2-3 menit)

7. Setelah deploy, buka tab "Environment"

8. Tambahkan Environment Variables:
   ┌──────────────────┬──────────────────────────────────────────┐
   │ Key              │ Value                                     │
   ├──────────────────┼──────────────────────────────────────────┤
   │ MONGO_URI        │ mongodb+srv://user:pass@cluster.../store  │
   │ JWT_SECRET       │ vincent_store_super_secret_key_2026       │
   │ NODE_ENV         │ production                                │
   │ PORT             │ 10000                                     │
   └──────────────────┴──────────────────────────────────────────┘

9. Klik "Save Changes"

10. Klik "Manual Deploy" → "Deploy latest version"

11. Cek apakah berhasil → catat URL backend:
    https://vincent-store-api.onrender.com
```

**Catatan MONGO_URI:**
- Buat MongoDB Atlas free tier di https://cloud.mongodb.com
- Buat cluster → Database → Connect → "Connect your application"
- Copy connection string, ganti `<password>` dengan password user database
- Contoh: `mongodb+srv://myUser:myPassword@cluster0.xxxxx.mongodb.net/online-store`

### 5.2 DEPLOY FRONTEND KE NETLIFY

**Prasyarat:** Akun Netlify.com + Repository GitHub

**Langkah:**

```
1. Buka https://app.netlify.com → Login dengan GitHub

2. Klik "Add new site" → "Import an existing project"

3. Pilih repository GitHub "online-store"

4. Konfigurasi:
   ┌─────────────────────────────────────────┐
   │ Base directory:     frontend             │
   │ Build command:      npm run build        │
   │ Publish directory:  dist                │
   └─────────────────────────────────────────┘

5. Klik "Show advanced" → "New variable"
   ┌──────────────────────────────────────────────────┐
   │ Variable: VITE_API_URL                           │
   │ Value: https://vincent-store-api.onrender.com/api │
   │ (ganti dengan URL Render Anda)                    │
   └──────────────────────────────────────────────────┘

6. Klik "Deploy site"

7. Tunggu build selesai (~3-5 menit)

8. Buka site → catat URL:
    https://random-name.netlify.app

9. (Opsional) Ganti nama site:
    Site settings → General → Change site name → "vincent-store"
    URL menjadi: https://vincent-store.netlify.app
```

### 5.3 UPDATE FRONTEND API URL

Setelah backend berhasil di-deploy, update `frontend/netlify.toml`:

```toml
[context.production.environment]
  VITE_API_URL = "https://vincent-store-api.onrender.com/api"
  # ↑ Ganti dengan URL Render aktual Anda
```

Lakukan commit & push → Netlify auto-deploy.

### 5.4 ALUR DEPLOYMENT

```
GitHub Repo
    │
    ├── backend/
    │       │
    │       └──► Render Web Service
    │                    │
    │                    ├── Build: npm install
    │                    ├── Start: npm start
    │                    └── URL: https://vincent-store-api.onrender.com
    │
    └── frontend/
            │
            └──► Netlify
                     │
                     ├── Build: npm run build
                     ├── Env: VITE_API_URL = https://vincent-store-api.onrender.com/api
                     └── URL: https://vincent-store.netlify.app
```

### 5.5 VERIFIKASI DEPLOYMENT

```
Backend Health Check:
https://vincent-store-api.onrender.com/

→ Response: { "message": "Vincent Store API is running", "endpoints": {...} }


Frontend API Connection:
Buka https://vincent-store.netlify.app/products
→ Pastikan produk tampil dari API Render


Auth Test:
1. Buka https://vincent-store.netlify.app/register
2. Register user baru
3. Login dengan user tersebut
4. Buka https://vincent-store.netlify.app/cart
→ Harus bisa akses tanpa redirect
```

---

## 6. LO4 — MONITORING

### 6.1 SETUP GOOGLE ANALYTICS 4

**Langkah:**

```
1. Buka https://analytics.google.com → Login Google

2. Klik "Start measuring"

3. Isi formulir:
   - Account Name: Vincent Store
   - Property Name: Vincent Store
   - Website URL: https://vincent-store.netlify.app
     (ganti dengan URL Netlify Anda)

4. Klik "Create"

5. Copy "Measurement ID" → format: G-XXXXXXXXXX

6. Buka file: frontend/index.html

7. Ganti YOUR_GA_MEASUREMENT_ID dengan ID Anda:
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>

8. Commit & push ke GitHub → Netlify auto-deploy

9. Buka GA4 Dashboard → Cek real-time report
```

### 6.2 YANG DIPANTAU GA4

| Metric | Deskripsi |
|--------|-----------|
| Active Users | User yang sedang online |
| Sessions | Sesi kunjungan |
| Pageviews | Jumlah halaman dilihat |
| Bounce Rate | User langsung keluar |
| Session Duration | Durasi rata-rata |
| Traffic Sources | Asal traffic |
| User Locations | Lokasi geografis |
| Devices | Desktop / Mobile / Tablet |
| Real-time | User aktif sekarang |

### 6.3 ACCESSING GA4 DASHBOARD

```
URL: https://analytics.google.com
Login dengan akun Google yang sama saat setup
Property: Vincent Store
```

---

## 7. SCREENSHOT HASIL

> Tempelkan screenshot hasil di bagian ini

### 7.1 Halaman Register
```
URL: https://localhost:5173/register (local)
File: screenshot-register.png
```

### 7.2 Halaman Login
```
URL: https://localhost:5173/login (local)
File: screenshot-login.png
```

### 7.3 Halaman Home
```
URL: https://localhost:5173/ (local)
File: screenshot-home.png
```

### 7.4 Halaman Produk
```
URL: https://localhost:5173/products (local)
File: screenshot-products.png
```

### 7.5 Halaman Detail Produk
```
URL: https://localhost:5173/products/:id (local)
File: screenshot-detail.png
```

### 7.6 Cart (Setalah Login)
```
URL: https://localhost:5173/cart (setelah login)
File: screenshot-cart.png
```

### 7.7 Checkout Modal
```
URL: https://localhost:5173/cart → Klik "Checkout Now"
File: screenshot-checkout.png
```

### 7.8 Order Sukses
```
URL: https://localhost:5173/cart → Place Order
File: screenshot-success.png
```

### 7.9 Redirect ke Login (Cart Protected)
```
URL: https://localhost:5173/cart (tanpa login)
File: screenshot-redirect-login.png
```

### 7.10 Navbar User Login
```
URL: Setelah login, navbar menampilkan nama user + logout
File: screenshot-navbar-user.png
```

---

## 8. LINK DEPLOYMENT

> ⚠️ Ganti dengan link deployment aktual Anda

### Frontend — Netlify

```
URL:        https://vincent-store.netlify.app
Status:     ✅ Production
Deploy:     Mei 2026
```

### Backend — Render

```
URL:        https://vincent-store-api.onrender.com
Status:     ✅ Production
Region:     Singapore
Plan:       Free
```

### Google Analytics 4

```
Property:   Vincent Store
Measurement ID: G-XXXXXXXXXX
Dashboard:   https://analytics.google.com
Status:     ✅ Active
```

---

## 9. TEKNOLOGI

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| State | Context API |
| HTTP | Axios |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Deploy Backend | Render |
| Deploy Frontend | Netlify |
| Monitoring | Google Analytics 4 |
| Styles | CSS3 (Flexbox, Grid, CSS Variables) |

---

## 10. API ENDPOINTS

### Auth API — /api/auth

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | /api/auth/register | ❌ | Registrasi user baru |
| POST | /api/auth/login | ❌ | Login, dapat JWT |
| GET | /api/auth/me | ✅ | Verifikasi token |

### Products API — /api/products

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /api/products | Ambil semua produk |
| GET | /api/products/:id | Ambil produk by ID |
| POST | /api/products | Tambah produk baru |
| PUT | /api/products/:id | Update produk |
| DELETE | /api/products/:id | Hapus produk |

**Query Params (GET /api/products):**

| Param | Contoh | Keterangan |
|-------|--------|-----------|
| category | ?category=Electronics | Filter kategori |
| search | ?search=laptop | Cari nama (case-insensitive) |
| sort | ?sort=price_asc | price_asc, price_desc, name_asc, newest |

---

## 11. CATATAN PENTING

1. **JWT_SECRET** — Jangan push ke GitHub. Set di Render dashboard.
2. **MONGO_URI** — Gunakan MongoDB Atlas untuk deployment.
3. **VITE_API_URL** — Harus HTTPS untuk production.
4. **Render Free Plan** — Service sleep setelah 15 menit tidak aktif. Upgrade ke paid untuk always-on.
5. **CORS** — Backend sudah allow semua origin untuk development.
6. **localStorage** — Token JWT tersimpan di browser. Untuk keamanan lebih, bisa pakai httpOnly cookie.

---

*Dokumen ini dibuat untuk memenuhi Tugas Personal Lab 2 — Vincent Store*
*Tanggal: Mei 2026*
