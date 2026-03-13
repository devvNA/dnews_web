# D'NEWS — Technical Overview

## Project Summary

D'NEWS is a single-page Indonesian news portal built as a portfolio piece. It uses a **neo-brutalist** visual design language — bold 3px borders, harsh block shadows, neon accent colors, and oversized uppercase typography. The site is entirely presentational with hardcoded content (no CMS, no API, no database).

---

## Core Tech Stack

| Layer               | Technology                      | Version |
| ------------------- | ------------------------------- | ------- |
| Framework           | Next.js (App Router)            | 16.1.6  |
| Runtime             | React + React DOM               | 19.2.4  |
| Language            | TypeScript (strict)             | 5.7.3   |
| Styling             | Tailwind CSS v4 + CSS Variables | 4.2.1   |
| UI Components       | shadcn/ui (new-york style)      | —       |
| Headless Primitives | Radix UI                        | Various |
| Icons               | Lucide React                    | 0.564.0 |
| Analytics           | Vercel Analytics                | 1.6.1   |
| Package Manager     | pnpm                            | —       |

### Notable Dependencies

- **class-variance-authority** + **clsx** + **tailwind-merge** — Variant-driven component styling via `cn()` utility.
- **next-themes** — Dark mode support (provider exists but not wired into the layout yet).
- **recharts**, **react-hook-form**, **zod**, **sonner**, **vaul**, **embla-carousel-react**, **react-day-picker**, **react-resizable-panels**, **cmdk**, **input-otp** — shadcn/ui component dependencies installed but largely unused in the current page.

---

## Component Architecture

### Layout & Routing

```
app/
├── layout.tsx    ← Root layout: fonts (Anton + Space Grotesk), <html lang="id">, Vercel Analytics
├── page.tsx      ← Single homepage: composes all section components
└── globals.css   ← Active theme: neo-brutalist CSS custom properties + utility classes
```

The project uses a **single route** (`/`). The root layout loads two Google Fonts via `next/font`, sets the `lang="id"` attribute, and injects Vercel Analytics.

### Page Composition (`app/page.tsx`)

```
<main>
  <Header />       → Sticky nav + breaking-news ticker marquee
  <Hero />         → Full-width hero with giant typography + decorative collage
  <NewsGrid />     → Bento-grid of 6 hardcoded news articles
  <OpinionSection /> → 3 opinion quote cards on electric-blue background
  <Footer />       → CTA subscribe form + copyright
</main>
```

### Domain Components (`components/dnews/`)

| Component             | Responsibility                                                                                                    | State                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `header.tsx`          | Sticky navbar, mobile hamburger menu, breaking-news marquee ticker                                                | Client component — `useState` for mobile menu toggle |
| `hero.tsx`            | Hero section with giant display text, CTA buttons, decorative sticker collage                                     | Client component — no state                          |
| `news-grid.tsx`       | Bento grid of `NewsCard` sub-components rendering 6 hardcoded articles. Cards vary by `size` (large/medium/small) | Client component — no state                          |
| `opinion-section.tsx` | Three opinion quote cards with subtle rotations                                                                   | Client component — no state                          |
| `footer.tsx`          | Newsletter subscribe form (email input + submit), footer nav links, copyright                                     | Client component — `useState` for email input        |

All domain components are marked `"use client"` and use exclusively **Tailwind utility classes** — no CSS Modules or styled-components.

### UI Primitives (`components/ui/`)

A full shadcn/ui component library (~55 files) generated via the shadcn CLI. These are Radix-based headless components styled with Tailwind and `class-variance-authority`. Currently **none are imported** by the D'NEWS domain components — they exist as a ready-to-use design system for future feature development.

### Shared Utilities

| File                            | Export          | Purpose                                                      |
| ------------------------------- | --------------- | ------------------------------------------------------------ |
| `lib/utils.ts`                  | `cn()`          | Merges Tailwind classes safely via `clsx` + `tailwind-merge` |
| `hooks/use-mobile.ts`           | `useIsMobile()` | Media-query hook returning boolean for `<768px` viewport     |
| `components/theme-provider.tsx` | `ThemeProvider` | Wraps `next-themes` for dark/light mode (not yet wired)      |

---

## Design System

### Color Palette (CSS Custom Properties)

| Token             | Hex       | Usage                                      |
| ----------------- | --------- | ------------------------------------------ |
| `--neon-yellow`   | `#E1FF00` | Secondary accent, highlights, marquee bg   |
| `--electric-blue` | `#0038FF` | Ring color, opinion section bg, decorative |
| `--hot-pink`      | `#FF0066` | Accent/destructive, CTA hover states       |
| `--paper-white`   | `#F4F4F0` | Page background                            |
| `--harsh-black`   | `#000000` | Text, borders, shadows                     |

### Typography

- **Display**: `Anton` (weight 400) — used for headlines, section titles, hero text via `font-display` / `.text-brutal` utility.
- **Body**: `Space Grotesk` — used for paragraphs, metadata, buttons via `font-sans`.

### Neo-Brutalist Utilities (defined in `app/globals.css`)

| Class                   | Effect                                                         |
| ----------------------- | -------------------------------------------------------------- |
| `.text-brutal`          | Anton font, uppercase, tight leading, slight negative tracking |
| `.brutal-shadow`        | `4px 4px 0px 0px` black box-shadow                             |
| `.brutal-shadow-hover`  | On hover: translate `-2px,-2px`, shadow grows to `6px 6px`     |
| `.brutal-shadow-active` | On active: translate `2px,2px`, shadow shrinks to `2px 2px`    |
| `.border-brutal`        | `3px solid` harsh-black border                                 |
| `.animate-marquee`      | 20s infinite linear horizontal scroll                          |

### Border Radius

`--radius: 0rem` — zero radius everywhere, enforcing the brutalist sharp-corner aesthetic. Buttons use `rounded-full` as an explicit exception.

---

## Data Flow & Runtime Behavior

### Initialization

1. Next.js App Router renders `app/layout.tsx` on the server.
2. Google Fonts are loaded and injected as CSS variables (`--font-display`, `--font-sans`).
3. `app/page.tsx` composes the five section components — all marked `"use client"`, so they hydrate on the client after initial server render.

### State Management

Minimal — only two `useState` hooks exist:

- `Header`: toggles `mobileMenuOpen` boolean.
- `Footer`: captures `email` string from newsletter input.

No global state, no context providers (aside from the unused ThemeProvider), no data fetching.

### Content

All news articles, opinions, and navigation links are **hardcoded arrays** within each component file. There is no CMS integration, no API routes, and no database.

### Analytics

Vercel Analytics (`@vercel/analytics`) is loaded at the layout level and tracks page views automatically.

---

## Build & Deployment

### Scripts

| Command      | Purpose                  |
| ------------ | ------------------------ |
| `pnpm dev`   | Start Next.js dev server |
| `pnpm build` | Production build         |
| `pnpm start` | Serve production build   |
| `pnpm lint`  | ESLint check             |

### Configuration Notes

- **TypeScript build errors are ignored** (`next.config.mjs` → `ignoreBuildErrors: true`).
- **Images are unoptimized** (`next.config.mjs` → `unoptimized: true`) — suitable for static export or when no image optimization service is available.
- **PostCSS** uses `@tailwindcss/postcss` plugin (Tailwind v4 style).
- **shadcn/ui** is configured with `new-york` style, RSC-enabled, neutral base color, CSS variables, and Lucide icons.

### Deployment Target

Designed for **Vercel** (evidenced by `@vercel/analytics` and `next.config.mjs` settings). Can be statically exported given no dynamic server-side logic.

---

## File Map

```
d:\DATA\Projects\PORTO\dnews\
├── app/
│   ├── globals.css          ← Neo-brutalist theme (active)
│   ├── layout.tsx           ← Root layout, fonts, analytics
│   └── page.tsx             ← Homepage composition
├── components/
│   ├── theme-provider.tsx   ← Dark mode provider (unused)
│   ├── dnews/               ← Domain components
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── news-grid.tsx
│   │   ├── opinion-section.tsx
│   │   └── footer.tsx
│   └── ui/                  ← shadcn/ui primitives (~55 files)
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts             ← cn() utility
├── styles/
│   └── globals.css          ← Default shadcn theme (inactive / fallback)
├── public/                  ← Static assets
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── components.json          ← shadcn/ui config
├── postcss.config.mjs
└── package.json
```
