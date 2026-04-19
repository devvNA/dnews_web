# D'NEWS Technical Overview

## Scope

This document summarizes the current implementation in this repository as found in the codebase.

## Core Components

### Tech Stack

| Area          | Implementation                                   | Source                                                  |
| ------------- | ------------------------------------------------ | ------------------------------------------------------- |
| Framework     | Next.js 16 App Router                            | `package.json`, `app/`                                  |
| UI Runtime    | React 19                                         | `package.json`                                          |
| Language      | TypeScript with `strict: true`                   | `tsconfig.json`                                         |
| Styling       | Tailwind CSS v4, CSS variables, `tw-animate-css` | `package.json`, `app/globals.css`, `postcss.config.mjs` |
| UI Primitives | shadcn/ui with Radix UI primitives               | `components.json`, `components/ui/`                     |
| Icons         | `lucide-react`                                   | `package.json`                                          |
| Analytics     | `@vercel/analytics`                              | `app/layout.tsx`                                        |
| External Data | GNews REST API                                   | `lib/gnews.ts`                                          |

### Major Modules

| File                                   | Responsibility                                                                                |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `app/layout.tsx`                       | Root HTML shell, Google font registration, metadata, viewport, analytics injection            |
| `app/page.tsx`                         | Homepage route. Reads `searchParams.category`, fetches article lists, composes page sections  |
| `app/news/[slug]/page.tsx`             | Detail route. Fetches article groups, resolves slug, renders article detail and related cards |
| `lib/gnews.ts`                         | GNews types, category map, slug helpers, article lookup, external fetch helpers               |
| `components/dnews/header.tsx`          | Sticky header, category navigation, breaking-news ticker, mobile menu state                   |
| `components/dnews/hero.tsx`            | Hero section and featured article CTA                                                         |
| `components/dnews/news-grid.tsx`       | Article-to-card mapping and bento-style news grid                                             |
| `components/dnews/opinion-section.tsx` | Opinion cards derived from article descriptions or fallback content                           |
| `components/dnews/footer.tsx`          | Subscribe CTA, controlled email input, footer links                                           |
| `app/globals.css`                      | Active theme tokens, dark overrides, custom utilities, Tailwind theme mapping                 |
| `components/ui/*`                      | Reusable shadcn/ui component layer built on semantic tokens                                   |
| `components/theme-provider.tsx`        | Thin wrapper around `next-themes` provider                                                    |

### Design Patterns Present

| Pattern                      | Where                                                                                | Notes                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| App Router route modules     | `app/page.tsx`, `app/news/[slug]/page.tsx`                                           | Route files export async server components                           |
| Server/client split          | `app/*` with `components/dnews/*`                                                    | Routes fetch on the server; UI sections are mostly client components |
| Wrapper utility              | `lib/utils.ts`                                                                       | `cn()` combines `clsx` and `tailwind-merge`                          |
| Variant-driven UI primitives | `components/ui/*.tsx`                                                                | Many primitives use `class-variance-authority`                       |
| Compound component exports   | `components/ui/card.tsx`, `components/ui/field.tsx`, `components/ui/input-group.tsx` | Related slots are exported from one module                           |
| Token-based theming          | `app/globals.css`, `tailwind.config.ts`, `components.json`                           | Brand tokens and semantic tokens are both present                    |

## Component Interactions

### Route and Data Flow

#### Homepage (`/`)

1. `app/page.tsx` awaits `searchParams`.
2. `category` is validated with `isValidCategory()` from `lib/gnews.ts`.
3. If the category is valid, the page calls `searchNews(CATEGORIES[category].query, 10)`.
4. Otherwise it calls `fetchTopHeadlines(10)`.
5. The resulting article array is passed to `Header`, `Hero`, `NewsGrid`, and `OpinionSection`.
6. `Footer` is rendered without external data.

#### Article Detail (`/news/[slug]`)

1. `app/news/[slug]/page.tsx` awaits `params.slug`.
2. The page fetches top headlines plus one search result set per category using `Promise.all()`.
3. Results are flattened into a single article list.
4. `findArticleBySlug()` matches the current slug against `slugifyArticleTitle(title)`.
5. If no match is found, `notFound()` is called.
6. Matching articles are rendered into the detail layout.
7. Related articles are built by excluding the current slug, removing duplicate URLs, then slicing the first three items.

### Interfaces and APIs

| Interface / API                            | Source         | Used By                                                                   |
| ------------------------------------------ | -------------- | ------------------------------------------------------------------------- |
| `GNewsArticle`                             | `lib/gnews.ts` | Homepage, detail page, domain components                                  |
| `CATEGORIES` / `CategoryKey`               | `lib/gnews.ts` | Header navigation, homepage filtering, detail-page category fetch fan-out |
| `fetchTopHeadlines()`                      | `lib/gnews.ts` | `app/page.tsx`, `app/news/[slug]/page.tsx`                                |
| `searchNews()`                             | `lib/gnews.ts` | `app/page.tsx`, `app/news/[slug]/page.tsx`                                |
| `getArticleSlug()` / `findArticleBySlug()` | `lib/gnews.ts` | Detail routing, card linking                                              |

### Dependency Injection / Service Patterns

- No DI container or service registry is present.
- External requests are performed directly inside `lib/gnews.ts`.
- Environment access is direct through `process.env.GNEWS_API_KEY` in `lib/gnews.ts`.

## Deployment Architecture

### Build and Run Steps

| Command                  | Defined In            | Purpose                         |
| ------------------------ | --------------------- | ------------------------------- |
| `pnpm dev`               | `package.json`        | Starts the Next.js dev server   |
| `pnpm build`             | `package.json`        | Creates a production build      |
| `pnpm start`             | `package.json`        | Starts the production server    |
| `pnpm lint`              | `package.json`        | Runs ESLint across the repo     |
| `pnpm exec tsc --noEmit` | repository convention | Runs strict TypeScript checking |

### Environment and Runtime Inputs

| Input            | Source                          | Behavior                                                 |
| ---------------- | ------------------------------- | -------------------------------------------------------- |
| `GNEWS_API_KEY`  | `process.env` in `lib/gnews.ts` | Required for external article fetches                    |
| Google Fonts     | `app/layout.tsx`                | Loads `Anton` and `Space_Grotesk` via `next/font/google` |
| Analytics script | `app/layout.tsx`                | Adds Vercel Analytics to all pages                       |

### Configuration Notes

| File                 | Active Settings                                                                   |
| -------------------- | --------------------------------------------------------------------------------- |
| `next.config.mjs`    | `typescript.ignoreBuildErrors = true`, `images.unoptimized = true`                |
| `postcss.config.mjs` | Uses `@tailwindcss/postcss`                                                       |
| `components.json`    | shadcn style `new-york`, `rsc: true`, CSS variables enabled, alias map configured |
| `tsconfig.json`      | `strict: true`, `moduleResolution: bundler`, path alias `@/*`                     |

### Infrastructure / Containerization

- No Dockerfile, container manifests, or IaC files were found in the repository root.
- The repository includes Vercel Analytics integration but no provider-specific deployment config files.

## Runtime Behavior

### Initialization

1. Next.js loads `app/layout.tsx` for each routed page.
2. The layout registers `Anton` and `Space_Grotesk` as CSS variables.
3. `app/globals.css` imports Tailwind and theme utilities.
4. The active route module fetches data on the server if needed.
5. Client components from `components/dnews/` hydrate on the browser.

### Request Handling

#### External News Requests

- `fetchTopHeadlines()` calls `https://gnews.io/api/v4/top-headlines`.
- `searchNews()` calls `https://gnews.io/api/v4/search`.
- Both functions cap `max` to 10 articles.
- Both functions use `fetch(..., { next: { revalidate: 1800 } })`.

#### Client Interactivity

| Component                     | Runtime State                            |
| ----------------------------- | ---------------------------------------- |
| `components/dnews/header.tsx` | `mobileMenuOpen` toggles the mobile menu |
| `components/dnews/footer.tsx` | `email` stores current input field value |

No other client-side state management, background jobs, or scheduled tasks were found in the routed application code.

### Error and Empty-State Handling

| Case                                 | Current Behavior                                          | Source                                                                                                  |
| ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Missing `GNEWS_API_KEY`              | Returns empty array                                       | `lib/gnews.ts`                                                                                          |
| Non-OK GNews response                | Returns empty array                                       | `lib/gnews.ts`                                                                                          |
| Network or JSON error during fetch   | Returns empty array                                       | `lib/gnews.ts`                                                                                          |
| Homepage with no fetched data        | Header, grid, and opinion section render fallback content | `components/dnews/header.tsx`, `components/dnews/news-grid.tsx`, `components/dnews/opinion-section.tsx` |
| Detail route with no matched article | Calls `notFound()`                                        | `app/news/[slug]/page.tsx`                                                                              |
| Invalid `category` query string      | Treated as no category filter                             | `app/page.tsx`                                                                                          |

### Assets and Rendering

- `Hero` uses `next/image` with `unoptimized` images.
- `NewsGrid` and the detail page use plain `<img>` tags for article images.
- If an article has no image, domain components render styled placeholder blocks instead.

## Repository Layout

```text
app/
  globals.css
  layout.tsx
  page.tsx
  news/[slug]/page.tsx
components/
  dnews/
  theme-provider.tsx
  ui/
hooks/
  use-mobile.ts
  use-toast.ts
lib/
  gnews.ts
  utils.ts
styles/
  globals.css
```
