<div align="center">

# PT. Wijaya Kencana Indonesia

**Official company website for PT. Wijaya Kencana Indonesia (WKI)**  
A forest management concession company (PBPH) operating in South Halmahera, North Maluku, Indonesia.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore_+_Auth-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_CDN-3448C5?logo=cloudinary)](https://cloudinary.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)
[![Tests](https://img.shields.io/badge/Tests-Jest-C21325?logo=jest)](https://jestjs.io/)

</div>

---

## Overview

This is the official website for **PT. Wijaya Kencana Indonesia**, a company holding a Forest Utilization Business License (PBPH-HA) over ±38,695 hectares in Kabupaten Halmahera Selatan, Maluku Utara, Indonesia.

The site is built with **Next.js 15 App Router**, uses **Firebase Firestore** as its database and **Firebase Auth** for the admin panel, **Cloudinary** for image hosting, and is deployed on **Vercel**.

Key capabilities:
- Static company profile pages with SEO metadata and Open Graph tags
- Server-rendered news (berita) section with dynamic per-article metadata
- Full-featured admin CMS (create, edit, delete articles + image upload)
- Multi-editor admin user management via Firebase Admin SDK
- Strict Firestore security rules
- Auto-generated sitemap at `/sitemap.xml`
- Unit test suite (Jest)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Cloudinary Setup](#cloudinary-setup)
- [Firestore Security Rules](#firestore-security-rules)
- [Admin Panel](#admin-panel)
- [Testing](#testing)
- [Deploying to Vercel](#deploying-to-vercel)
- [Project Structure](#project-structure)
- [Firestore Data Schema](#firestore-data-schema)
- [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | [Next.js](https://nextjs.org/) — App Router | 15.5.x |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5.9.x |
| UI Library | [React](https://react.dev/) | 18.3.x |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 3.4.x |
| Database | [Firebase Firestore](https://firebase.google.com/docs/firestore) | — |
| Auth | [Firebase Authentication](https://firebase.google.com/docs/auth) (Email/Password) | — |
| Server-side admin | [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) | — |
| Image storage | [Cloudinary](https://cloudinary.com/) (server-side SDK) | — |
| Hosting | [Vercel](https://vercel.com/) | — |
| Testing | [Jest](https://jestjs.io/) + `next/jest` | — |

---

## Features

### Public
- Hero carousel on the home page
- Company profile, vision & mission, operational locations with embedded Google Maps
- News list and article detail pages — **server-rendered (SSR/ISR)** for full SEO indexability
- Prev / next navigation between articles
- Sustainability page with PDF document previews and contact page
- Per-page `<title>`, `<meta description>`, and Open Graph tags
- Auto-generated `/sitemap.xml` including all articles

### Admin (`/admin`)
- Secure email/password login via Firebase Auth
- Full **CRUD** for news articles: title, slug, date, body text, image
- Image upload to Cloudinary via a **server-side API route** (API key never exposed to browser)
- **Multi-editor user management**: add or remove admin accounts without touching the Firebase Console

### Security & quality
- Firestore security rules: public reads on `berita`, writes require authentication, all other collections denied
- Server-side Firestore reads (Firestore REST API) — no client-side credentials needed for public pages
- ISR cache revalidation every 60 seconds
- Unit tests for utility functions and the upload API route

---

## Pages & Routes

| Page | URL | Rendering |
|------|-----|-----------|
| Home | `/` | Static |
| About | `/tentang` | Static |
| News list | `/berita` | Static + ISR (60s) |
| News detail | `/berita/[id]` | Dynamic SSR |
| Sustainability | `/keberlanjutan` | Static |
| Contact | `/kontak` | Static |
| Sitemap | `/sitemap.xml` | Dynamic |
| Admin login | `/admin` | Client |
| Admin dashboard | `/admin/dashboard` | Client |
| Image upload | `POST /api/upload` | Server (API Route) |
| Admin user management | `GET/POST/DELETE /api/admin/users` | Server (API Route) |

---

## Architecture

```mermaid
flowchart TB
  subgraph Visitor
    Browser[Browser]
  end

  subgraph Vercel["Next.js on Vercel"]
    Pages[App Router Pages]
    UploadAPI[POST /api/upload]
    UsersAPI[/api/admin/users]
    SitemapRoute[/sitemap.xml]
  end

  subgraph Firebase
    Firestore[(Firestore\nberita collection)]
    Auth[Firebase Auth]
    AdminSDK[Admin SDK]
  end

  Cloudinary[Cloudinary CDN]

  Browser -->|Reads pages| Pages
  Pages -->|SSR fetch articles| Firestore
  Browser -->|Login / CRUD articles| Auth
  Browser -->|Read/Write berita| Firestore
  Browser -->|Upload image| UploadAPI
  UploadAPI -->|Server SDK| Cloudinary
  Browser -->|Manage users| UsersAPI
  UsersAPI --> AdminSDK --> Auth
  Pages -->|Display imageUrl| Cloudinary
  SitemapRoute --> Firestore
```

### News write flow (admin)
1. Admin authenticates at `/admin` via Firebase Auth
2. Fills the article form; optionally selects an image file
3. Image → `POST /api/upload` → Cloudinary server SDK → returns `secure_url`
4. Article data (`title`, `content`, `date`, `slug`, `imageUrl`, `createdAt`) is written to Firestore

### News read flow (public)
1. `/berita` and `/berita/[id]` call `lib/firestore-server.ts` **on the server** using the Firestore REST API
2. HTML is fully populated before reaching the browser — crawlable by search engines
3. Content is ISR-cached and refreshed every **60 seconds**

---

## Prerequisites

- **Node.js** 18.17 or later (Node 20 LTS recommended)
- **npm** 9+
- A [Firebase](https://console.firebase.google.com/) project with Firestore and Authentication enabled
- A [Cloudinary](https://cloudinary.com/) account
- _(Optional)_ [Firebase CLI](https://firebase.google.com/docs/cli) — to deploy Firestore security rules
- _(Optional)_ [Vercel](https://vercel.com/) account — to host the site

---

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/ArthaCorporation/WebsiteWKI.git
cd WebsiteWKI

# 2. Install dependencies
npm install

# 3. Set up environment variables (see next section)
cp .env.local.example .env.local   # then fill in your values

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run all Jest unit tests |
| `npm run test:watch` | Run Jest in watch mode |

---

## Environment Variables

Create a `.env.local` file in the project root. **This file is gitignored and must never be committed.**

### Firebase — client-side (required)

Used in the browser for Auth and Firestore reads/writes from the admin dashboard.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> Found at: **Firebase Console → Project Settings → Your apps → SDK setup and configuration**

### Cloudinary — server-side (required for image upload)

Upload is handled by the **server-side Cloudinary SDK** via `/api/upload`. The API secret is never sent to the browser.

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> Found at: **Cloudinary Dashboard → Settings → API Keys**

### Firebase Admin SDK — server-side (optional, for multi-editor management)

Only required for the **Kelola Admin** tab in the dashboard.

```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

**Important — the value must be a single line of valid JSON.** Use this helper to generate it from a downloaded service account file:

```bash
node -e "console.log('FIREBASE_SERVICE_ACCOUNT_KEY=' + JSON.stringify(JSON.parse(require('fs').readFileSync('./your-key.json', 'utf8'))))"
```

Copy the output into `.env.local`. Use the same value in Vercel's environment variable settings for production.

> ⚠️ Never commit the raw service account `.json` file. It is already covered by `.gitignore` (`*firebase-adminsdk*.json`).

---

## Firebase Setup

### 1. Create a project and web app

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Add project**
2. Add a **Web app** (`</>`) → copy the config values into `.env.local`

### 2. Firestore Database

1. **Firestore Database** → **Create database** → choose a region
2. The `berita` collection is created automatically when the first article is saved
3. Deploy the security rules (see [Firestore Security Rules](#firestore-security-rules))

### 3. Authentication

1. **Authentication** → **Sign-in method** → enable **Email/Password**
2. Create the first admin user: **Authentication → Users → Add user**

### 4. Service account (for multi-editor)

1. **Project Settings → Service accounts → Generate new private key**
2. Save the downloaded `.json` locally — **do not push it to Git**
3. Convert to a single-line value and set as `FIREBASE_SERVICE_ACCOUNT_KEY` (see above)

---

## Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Copy your **Cloud name**, **API Key**, and **API Secret** into `.env.local`
3. Images are uploaded to the folder `wki_berita` in your Cloudinary account (configured in `app/api/upload/route.ts`)

The domain `res.cloudinary.com` is whitelisted in `next.config.mjs` for use with `next/image`.

---

## Firestore Security Rules

File: `firestore.rules`

```
berita/{docId}   →  read: everyone  |  write: authenticated users only
everything else  →  denied
```

### Deploy the rules

```bash
# Install Firebase CLI (once)
npm install -g firebase-tools

# Login and select your project
firebase login
firebase use <your-project-id>

# Deploy rules only
firebase deploy --only firestore:rules
```

**Safe deployment order:** push the Next.js code first → confirm `/berita` loads on the production URL → then deploy rules. The current rules allow public reads on `berita`, so deploying them at any point will not break the public pages.

---

## Admin Panel

### Login

Navigate to `/admin` and sign in with your Firebase Auth email and password.

### Managing news articles

1. `/admin/dashboard` → **Kelola Berita** tab
2. Click **+ Tambah Berita**, fill in the title, date, body, and optionally upload an image
3. Click **Simpan** — the article is saved to Firestore; images go to Cloudinary

The slug is auto-generated from the title if left blank (`lib/utils.ts → generateSlug`).  
Public article URLs use the Firestore document ID: `/berita/{documentId}`.

### Managing admin users (multi-editor)

1. `/admin/dashboard` → **Kelola Admin** tab
2. Click **+ Tambah Admin** → enter email, password (min. 6 characters), and optional display name
3. Remove any admin account except your own

> This feature requires `FIREBASE_SERVICE_ACCOUNT_KEY` to be set. Without it, the tab shows a setup guide instead of an error.

---

## Testing

```bash
npm test
```

| Test file | What it covers |
|-----------|----------------|
| `__tests__/utils.test.ts` | `formatDate` (Indonesian month names), `generateSlug` |
| `__tests__/upload.test.ts` | `POST /api/upload` — no file (400), success (200 + URL), Cloudinary error (500) |

Configuration: `jest.config.js`, `jest.setup.ts`.

---

## Deploying to Vercel

### 1. Push to GitHub

The production branch for this repository is **`master`**.

```bash
git add .
git commit -m "your message"
git push origin master
```

### 2. Connect to Vercel

1. [vercel.com](https://vercel.com) → **New Project** → import `ArthaCorporation/WebsiteWKI`
2. **Settings → Git → Production Branch** → set to `master`
3. **Settings → Environment Variables** → add every variable from your `.env.local`:

| Variable | Required in production |
|----------|----------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ |
| `CLOUDINARY_API_KEY` | ✅ |
| `CLOUDINARY_API_SECRET` | ✅ |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Only for Kelola Admin tab |

4. Vercel auto-deploys on every push to `master`

### Post-deploy checklist

- [x] `/` — home page renders
- [x] `/berita` — article list loads
- [x] `/berita/[id]` — article detail opens; browser tab title matches the article title
- [x] `/sitemap.xml` — contains all static pages and articles
- [x] `/admin` → login works
- [x] Admin dashboard → create, edit, and delete an article
- [x] Admin dashboard → Kelola Admin tab (if `FIREBASE_SERVICE_ACCOUNT_KEY` is set)

### Deployment not picking up latest commit?

- Confirm **Production Branch** in Vercel settings is `master`
- Manually trigger: **Deployments → ⋯ → Redeploy** (disable build cache if needed)
- Make sure you pushed to `origin/master`, not a different branch

---

## Project Structure

```
WebsiteWKI/
├── app/
│   ├── layout.tsx                   # Root layout — Navbar, Footer, default metadata
│   ├── page.tsx                     # Home page
│   ├── globals.css
│   ├── sitemap.ts                   # Auto-generated /sitemap.xml
│   ├── tentang/page.tsx             # About page
│   ├── keberlanjutan/page.tsx       # Sustainability documents and PDF previews
│   ├── kontak/page.tsx              # Contact page
│   ├── berita/
│   │   ├── page.tsx                 # News list — SSR + ISR
│   │   └── [id]/page.tsx            # News detail — SSR + generateMetadata
│   ├── admin/
│   │   ├── page.tsx                 # Admin login
│   │   └── dashboard/page.tsx       # News CRUD + admin user management
│   └── api/
│       ├── upload/route.ts          # POST — upload image to Cloudinary
│       └── admin/users/route.ts     # GET / POST / DELETE — manage admin users
│
├── components/
│   ├── Navbar.tsx
│   ├── HeroCarousel.tsx
│   └── NewsCard.tsx
│
├── lib/
│   ├── firebase.ts                  # Client-side Firebase (Auth + Firestore)
│   ├── firebase-admin.ts            # Server-side Firebase Admin SDK
│   ├── firestore-server.ts          # Server-side Firestore reads via REST API
│   └── utils.ts                     # formatDate, generateSlug
│
├── __tests__/
│   ├── utils.test.ts
│   └── upload.test.ts
│
├── public/images/
├── firestore.rules                  # Firestore security rules
├── firestore.indexes.json
├── firebase.json                    # Firebase CLI config
├── next.config.mjs
├── tailwind.config.js
├── jest.config.js
├── jest.setup.ts
└── .env.local                       # Local secrets — gitignored
```

---

## Firestore Data Schema

Collection: **`berita`**

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Article headline |
| `content` | `string` | Full body text (plain text, newline-preserved) |
| `date` | `string` | Display date — `YYYY-MM-DD` |
| `slug` | `string` | URL-friendly identifier (stored but not used in routing) |
| `imageUrl` | `string` | Cloudinary `secure_url` |
| `createdAt` | `Timestamp` | Used to sort articles newest-first |

The Firestore **document ID** is used as the public article URL: `/berita/{documentId}`.

---

## Troubleshooting

### News page is empty in production but articles exist in Firebase

- Check that `NEXT_PUBLIC_FIREBASE_PROJECT_ID` in Vercel matches the Firebase project in use
- Verify Firestore rules allow `read: if true` on the `berita` collection
- After a fresh deploy, allow up to 60 seconds for ISR to revalidate

### Image upload fails

- Confirm `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are set in Vercel environment variables
- Check Vercel runtime logs for errors on `POST /api/upload`

### Kelola Admin tab shows a JSON error

- `FIREBASE_SERVICE_ACCOUNT_KEY` must be a **single-line** valid JSON string
- Do not paste multi-line JSON directly into `.env.local` — use the `node` helper above
- If the key was ever exposed, regenerate it from Firebase Console and revoke the old one in Google Cloud IAM

### `npm run build` fails

- Run the build locally first: `npm run build`
- Fix any TypeScript or ESLint errors before pushing

### Vercel is not deploying the latest commit

- Confirm **Production Branch** in Vercel is set to `master`
- Push specifically to `origin/master`
- Trigger a manual redeploy from the Vercel Deployments tab

---

## License & Contact

- **Repository:** [github.com/ArthaCorporation/WebsiteWKI](https://github.com/ArthaCorporation/WebsiteWKI)
- **Company:** PT. Wijaya Kencana Indonesia
- **Head office:** Jalan Biawan No. 2 C, Desa Sidomulyo, Kecamatan Samarinda Ilir, Kota Samarinda, Kalimantan Timur 75242
- **Operations:** Desa Sosepe, Kabupaten Halmahera Selatan, Maluku Utara
- **Phone:** +62 541-4116508

---

<div align="center">
<sub>Built with Next.js · Firebase · Cloudinary · Vercel</sub><br>
<sub>© 2026 PT. Wijaya Kencana Indonesia</sub>
</div>
