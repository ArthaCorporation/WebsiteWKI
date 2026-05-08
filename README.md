# PT. Wijaya Kencana Indonesia — Website Resmi

Website resmi PT. Wijaya Kencana Indonesia dibangun menggunakan **Next.js 14**, **Tailwind CSS**, **TypeScript**, dan **Firebase**.

## Teknologi

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase** (Firestore Database & Authentication)
- **Cloudinary** (Image Storage & Optimization)

## Halaman

| Halaman | URL |
|---------|-----|
| Beranda | `/` |
| Tentang Kami | `/tentang` |
| Berita | `/berita` |
| Keberlanjutan | `/keberlanjutan` |
| Hubungi Kami | `/kontak` |
| Admin Login | `/admin` |
| Admin Dashboard | `/admin/dashboard` |

---

## Cara Menjalankan Secara Lokal

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/ArthaCorporation/WebsiteWKI.git
cd WebsiteWKI
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.local.example .env.local
```

Isi file `.env.local` dengan nilai dari Firebase Console (lihat bagian [Setup Firebase](#setup-firebase)).

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## Setup Firebase

### Langkah 1: Buat Proyek Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add project"** → Masukkan nama proyek → Klik **"Create project"**

### Langkah 2: Tambahkan Web App

1. Di halaman proyek, klik ikon **`</>`** (Web)
2. Masukkan nama app, klik **"Register app"**
3. Salin konfigurasi yang muncul

### Langkah 3: Aktifkan Layanan Firebase

**Firestore Database:**
1. Di menu kiri, klik **"Firestore Database"**
2. Klik **"Create database"**
3. Pilih mode **"Start in test mode"** (untuk development)
4. Pilih lokasi server → Klik **"Done"**
5. Buat collection bernama `berita`

**Authentication:**
1. Di menu kiri, klik **"Authentication"**
2. Klik **"Get started"**
3. Pilih **"Email/Password"** → Aktifkan → Klik **"Save"**

### Langkah 4: Setup Cloudinary (Upload Gambar)
Proyek ini menggunakan Cloudinary untuk meyimpan gambar karena lebih cepat dan sangat mudah dikonfigurasi.
1. Buka [Cloudinary](https://cloudinary.com/) dan buat akun (gratis).
2. Di Dashboard, catat **Cloud Name** Anda.
3. Buka **Settings (ikon gir) → Upload**.
4. Scroll ke bawah cari bagian **Upload presets**.
5. Klik **"Add upload preset"**:
   - Ganti **Signing Mode** menjadi **Unsigned** (PENTING!).
   - Catat nama **Upload preset name**-nya.
   - Klik **Save**.

### Langkah 5: Isi File `.env.local`

```env
# Konfigurasi Firebase (Firestore & Auth)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Konfigurasi Cloudinary (Image Upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=nama_cloud_anda
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=nama_preset_unsigned_anda
```

Nilai Firebase bisa ditemukan di:
**Firebase Console → Project Settings → Your apps → SDK setup and configuration**

---

## Membuat Admin User Pertama

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Navigasi ke **Authentication → Users**
3. Klik **"Add user"**
4. Masukkan email dan password untuk admin
5. Klik **"Add user"**

Sekarang Anda bisa login ke `/admin` menggunakan kredensial tersebut.

---

## Deployment ke Vercel

### Langkah 1: Push ke GitHub

```bash
git add .
git commit -m "Initial Next.js migration"
git push origin main
```

### Langkah 2: Deploy di Vercel

1. Buka [vercel.com](https://vercel.com) dan login/daftar
2. Klik **"New Project"**
3. Import repository GitHub Anda
4. Di bagian **"Environment Variables"**, tambahkan semua variabel dari `.env.local`
5. Klik **"Deploy"**

### Langkah 3: Konfigurasi Domain (Opsional)

Di Vercel dashboard → Settings → Domains → Tambahkan domain kustom Anda.

---

## Struktur Proyek

```
├── app/
│   ├── layout.tsx              ← Root layout (Navbar + Footer)
│   ├── page.tsx                ← Beranda
│   ├── tentang/page.tsx        ← Tentang Kami
│   ├── berita/
│   │   ├── page.tsx            ← Daftar Berita
│   │   └── [id]/page.tsx       ← Detail Berita
│   ├── keberlanjutan/page.tsx  ← Keberlanjutan
│   ├── kontak/page.tsx         ← Hubungi Kami
│   └── admin/
│       ├── page.tsx            ← Admin Login
│       └── dashboard/page.tsx  ← Admin Dashboard
├── components/
│   ├── Navbar.tsx
│   ├── HeroCarousel.tsx
│   └── NewsCard.tsx
├── lib/
│   └── firebase.ts
└── public/images/
```
