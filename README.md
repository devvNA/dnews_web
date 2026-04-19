# D'NEWS

D'NEWS adalah project konsep portal berita Indonesia dengan tampilan neo-brutalist. Aplikasi ini dibangun menggunakan Next.js App Router, React, TypeScript, Tailwind CSS v4, dan shadcn/ui, lalu mengambil data berita dari GNews.

## Preview

- Homepage menampilkan header dengan ticker berita, hero editorial, grid berita, section opini, dan footer CTA.
- Halaman detail berita tersedia di route `/news/[slug]`.
- Visual memakai gaya tegas dengan border tebal, warna kontras, brutal shadow, dan headline uppercase.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI
- Lucide React
- Vercel Analytics
- GNews API

## Fitur Utama

- Homepage dengan filter kategori melalui query string `?category=`
- Detail artikel berbasis slug di `/news/[slug]`
- Fetch berita server-side dari GNews
- Fallback content saat API key hilang atau request gagal
- Design system neo-brutalist berbasis CSS variables dan utility classes

## Routes

- `/` : homepage berita
- `/news/[slug]` : halaman detail berita

## Setup Lokal

1. Install dependency:

```bash
pnpm install
```

2. Siapkan environment variable:

```bash
cp .env.local.example .env.local
```

Isi `GNEWS_API_KEY` di `.env.local` dengan API key GNews milikmu.

3. Jalankan development server:

```bash
pnpm dev
```

App akan berjalan di `http://localhost:3000`.

## Scripts

- `pnpm dev` : menjalankan dev server
- `pnpm build` : build production
- `pnpm start` : menjalankan hasil build
- `pnpm lint` : lint project
- `pnpm exec tsc --noEmit` : type check TypeScript

## Struktur Project

```text
app/
  globals.css          # theme aktif dan utility global
  layout.tsx           # root layout, font, metadata, analytics
  page.tsx             # homepage
  news/[slug]/page.tsx # detail berita

components/
  dnews/               # komponen domain utama D'NEWS
  ui/                  # reusable shadcn/ui primitives
  theme-provider.tsx   # wrapper next-themes

lib/
  gnews.ts             # helper fetch dan utilitas data berita
  utils.ts             # helper cn()

hooks/                 # custom hooks
styles/                # fallback theme lama, bukan theme aktif
```

## Data Source

Data berita diambil dari GNews melalui `lib/gnews.ts`.

Catatan penting:

- Server-side access memakai `GNEWS_API_KEY`
- Request memakai revalidation Next.js
- Jika API key tidak ada atau request gagal, beberapa section homepage tetap punya fallback content

## Styling Notes

Beberapa karakter visual utama project ini:

- `font-display` untuk headline besar
- `font-sans` untuk body text
- `border-[3px] border-harsh-black`
- `.brutal-shadow`, `.brutal-shadow-hover`, `.brutal-shadow-active`
- warna utama: neon yellow, electric blue, hot pink, paper white, harsh black

Theme aktif ada di `app/globals.css`.

## Dokumentasi Tambahan

- Arsitektur teknis: [TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)
- Inventory design system: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- Panduan untuk AI coding agent: [AGENTS.md](AGENTS.md)

## Catatan

- `next.config.mjs` saat ini mengabaikan TypeScript build errors saat `next build`, jadi type check sebaiknya dijalankan terpisah dengan `pnpm exec tsc --noEmit`.
- `app/globals.css` adalah file theme yang aktif. `styles/globals.css` hanyalah fallback lama.
