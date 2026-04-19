# D'NEWS Design System Inventory

This document records UI patterns and reusable primitives currently present in the repository.

## Theme Layers

| Layer                   | Purpose                                                               | Source Files                                                                |
| ----------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Brand layer             | D'NEWS-specific neo-brutalist colors, utilities, and typography usage | `app/globals.css`, `components/dnews/*.tsx`, `tailwind.config.ts`           |
| Semantic UI layer       | shadcn/ui tokens and reusable primitives                              | `app/globals.css`, `components/ui/*.tsx`, `components.json`, `lib/utils.ts` |
| Inactive fallback theme | Default shadcn theme values not used by routed pages                  | `styles/globals.css`                                                        |

## Colors & Typography

### Brand Color Tokens

Defined in `app/globals.css` and exposed in `tailwind.config.ts` / `@theme inline`.

| Token             | Value     | Defined In        |
| ----------------- | --------- | ----------------- |
| `--neon-yellow`   | `#E1FF00` | `app/globals.css` |
| `--electric-blue` | `#0038FF` | `app/globals.css` |
| `--hot-pink`      | `#FF0066` | `app/globals.css` |
| `--paper-white`   | `#F4F4F0` | `app/globals.css` |
| `--harsh-black`   | `#000000` | `app/globals.css` |

Common class usage in domain components:

| Class Pattern                        | Example Files                                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `bg-paper-white`, `text-harsh-black` | `components/dnews/header.tsx`, `components/dnews/news-grid.tsx`                                      |
| `bg-neon-yellow`                     | `components/dnews/header.tsx`, `components/dnews/footer.tsx`, `components/dnews/opinion-section.tsx` |
| `bg-electric-blue`                   | `components/dnews/hero.tsx`, `components/dnews/opinion-section.tsx`                                  |
| `bg-hot-pink`                        | `components/dnews/hero.tsx`, `components/dnews/footer.tsx`, `app/news/[slug]/page.tsx`               |

### Semantic Color Tokens

Also defined in `app/globals.css`.

| Token Group | Examples                                                               |
| ----------- | ---------------------------------------------------------------------- |
| Surface     | `--background`, `--foreground`, `--card`, `--popover`                  |
| Action      | `--primary`, `--secondary`, `--accent`, `--destructive`                |
| Utility     | `--border`, `--input`, `--ring`, `--chart-1` to `--chart-5`            |
| Sidebar     | `--sidebar`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-ring` |

Dark-mode overrides for these tokens are also defined in `app/globals.css` under `.dark`.

### Typography Tokens

| Token / Class    | Value                                                          | Source               |
| ---------------- | -------------------------------------------------------------- | -------------------- |
| `--font-display` | `Anton` via `next/font/google`                                 | `app/layout.tsx`     |
| `--font-sans`    | `Space_Grotesk` via `next/font/google`                         | `app/layout.tsx`     |
| `font-display`   | `var(--font-display)`                                          | `tailwind.config.ts` |
| `font-sans`      | `var(--font-sans)`                                             | `tailwind.config.ts` |
| `.text-brutal`   | display font, uppercase, `line-height: 0.9`, negative tracking | `app/globals.css`    |

Typography usage patterns:

| Pattern                                                 | Example Files                                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Display headlines use `font-display` and uppercase text | `components/dnews/hero.tsx`, `components/dnews/news-grid.tsx`, `app/news/[slug]/page.tsx`            |
| Body/meta text uses `font-sans`                         | `components/dnews/header.tsx`, `components/dnews/footer.tsx`, `components/dnews/opinion-section.tsx` |

## Component Library

### Domain Components

| Component        | Props                                                       | Purpose                                           | File                                   |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------- | -------------------------------------- | --------------------------- |
| `Header`         | `articles?: GNewsArticle[]`, `activeCategory?: CategoryKey` | Sticky nav, mobile menu, ticker                   | `components/dnews/header.tsx`          |
| `Hero`           | `featured?: GNewsArticle                                    | null`                                             | Featured hero section and CTA          | `components/dnews/hero.tsx` |
| `NewsGrid`       | `articles?: GNewsArticle[]`, `activeCategory?: CategoryKey` | Maps articles into `NewsCard` tiles               | `components/dnews/news-grid.tsx`       |
| `OpinionSection` | `articles?: GNewsArticle[]`                                 | Builds opinion-style cards from article summaries | `components/dnews/opinion-section.tsx` |
| `Footer`         | none                                                        | Subscribe CTA and footer nav                      | `components/dnews/footer.tsx`          |

### Reusable UI Primitives

Representative primitives in `components/ui/`:

| Component           | Variants / API                                                                                  | File                      |
| ------------------- | ----------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------- | ------------------------------- | ------------------------- | --------------------- | --------------------------- | ------------------------------- | ---- | ------- | ------------------- | -------------------------- |
| `Button`            | `variant: default                                                                               | destructive               | outline                                                               | secondary                       | ghost                     | link`; `size: default | sm                          | lg                              | icon | icon-sm | icon-lg`; `asChild` | `components/ui/button.tsx` |
| `Badge`             | `variant: default                                                                               | secondary                 | destructive                                                           | outline`; `asChild`             | `components/ui/badge.tsx` |
| `Card` family       | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | `components/ui/card.tsx`  |
| `Field` family      | `orientation: vertical                                                                          | horizontal                | responsive`; exports label, description, error, group, separator, set | `components/ui/field.tsx`       |
| `InputGroup` family | addon `align: inline-start                                                                      | inline-end                | block-start                                                           | block-end`; button `size: xs    | sm                        | icon-xs               | icon-sm`                    | `components/ui/input-group.tsx` |
| `Empty` family      | media `variant: default                                                                         | icon`                     | `components/ui/empty.tsx`                                             |
| `Sidebar` family    | `side: left                                                                                     | right`; `variant: sidebar | floating                                                              | inset`; `collapsible: offcanvas | icon                      | none`                 | `components/ui/sidebar.tsx` |

### Reusable Implementation Conventions

| Pattern                 | Description                                                   | Example Files                                                                                                     |
| ----------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `cn()` helper           | Merges Tailwind classes with `clsx` and `tailwind-merge`      | `lib/utils.ts`                                                                                                    |
| CVA variants            | `class-variance-authority` used for typed variants            | `components/ui/button.tsx`, `components/ui/badge.tsx`, `components/ui/field.tsx`, `components/ui/input-group.tsx` |
| `asChild` polymorphism  | Radix `Slot` used to swap host element                        | `components/ui/button.tsx`, `components/ui/badge.tsx`                                                             |
| `data-slot` composition | Internal parts labeled with `data-slot` for styling structure | `components/ui/card.tsx`, `components/ui/field.tsx`, `components/ui/input.tsx`                                    |
| Compound exports        | Related subcomponents exported from one file                  | `components/ui/card.tsx`, `components/ui/field.tsx`, `components/ui/input-group.tsx`                              |

## Spacing & Layout

### Containers and Section Rhythm

Observed in `components/dnews/*.tsx` and `app/news/[slug]/page.tsx`.

| Pattern                                                             | Example Files                                                                                                                                                    |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `max-w-7xl mx-auto` main section container                          | `components/dnews/hero.tsx`, `components/dnews/news-grid.tsx`, `components/dnews/opinion-section.tsx`, `components/dnews/footer.tsx`                             |
| `max-w-6xl mx-auto` detail-page container                           | `app/news/[slug]/page.tsx`                                                                                                                                       |
| Section padding `px-4 md:px-6`                                      | `components/dnews/header.tsx`, `components/dnews/hero.tsx`, `components/dnews/news-grid.tsx`, `components/dnews/footer.tsx`, `app/news/[slug]/page.tsx`          |
| Vertical rhythm `py-8`, `py-10`, `py-12`, `py-16`, `py-20`, `py-24` | `components/dnews/hero.tsx`, `components/dnews/news-grid.tsx`, `components/dnews/opinion-section.tsx`, `components/dnews/footer.tsx`, `app/news/[slug]/page.tsx` |

### Grid and Flex Patterns

| Pattern                                          | Example Files                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `grid md:grid-cols-2 gap-8`                      | `components/dnews/hero.tsx`                                                                             |
| `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8` | `components/dnews/news-grid.tsx`                                                                        |
| `grid grid-cols-1 md:grid-cols-3 gap-6`          | `components/dnews/opinion-section.tsx`                                                                  |
| `flex flex-col md:flex-row` headers/footers      | `components/dnews/news-grid.tsx`, `components/dnews/opinion-section.tsx`, `components/dnews/footer.tsx` |
| Asymmetric detail-page grids                     | `app/news/[slug]/page.tsx`                                                                              |

### Breakpoints

No custom `screens` are declared in `tailwind.config.ts`, so the project uses Tailwind defaults.

| Breakpoint Evidence                                   | Source                                                |
| ----------------------------------------------------- | ----------------------------------------------------- |
| `sm:`, `md:`, `lg:` prefixes across domain components | `components/dnews/*.tsx`, `app/news/[slug]/page.tsx`  |
| `MOBILE_BREAKPOINT = 768` in JS hooks                 | `hooks/use-mobile.ts`, `components/ui/use-mobile.tsx` |

### Surface and Shape Rules

| Pattern           | Value / Usage                                                     | Source                                                                                       |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Border weight     | `border-[3px]` in branded surfaces                                | `components/dnews/*.tsx`, `app/news/[slug]/page.tsx`                                         |
| Shadow utility    | `.brutal-shadow`, `.brutal-shadow-hover`, `.brutal-shadow-active` | `app/globals.css`                                                                            |
| Radius baseline   | `--radius: 0rem`                                                  | `app/globals.css`                                                                            |
| Rounded exception | `rounded-full` used for pill buttons/badges                       | `components/dnews/header.tsx`, `components/dnews/hero.tsx`, `components/dnews/news-grid.tsx` |

## Patterns & Conventions

### Naming and File Structure

| Convention                                                | Evidence                                              |
| --------------------------------------------------------- | ----------------------------------------------------- |
| App Router route files in `app/`                          | `app/page.tsx`, `app/news/[slug]/page.tsx`            |
| Domain-specific components grouped in `components/dnews/` | `components/dnews/*.tsx`                              |
| Reusable primitives grouped in `components/ui/`           | `components/ui/*.tsx`                                 |
| Shared helpers grouped in `lib/` and `hooks/`             | `lib/utils.ts`, `lib/gnews.ts`, `hooks/use-mobile.ts` |

### Theming Approach

| Mechanism                                                          | Source                                            |
| ------------------------------------------------------------------ | ------------------------------------------------- |
| CSS custom properties for brand and semantic tokens                | `app/globals.css`                                 |
| Tailwind theme extension for brand colors and fonts                | `tailwind.config.ts`                              |
| shadcn/ui CSS-variable setup and aliases                           | `components.json`                                 |
| `next-themes` provider wrapper exists but is not mounted in layout | `components/theme-provider.tsx`, `app/layout.tsx` |

### Motion and Effects

| Pattern                                                      | Source                                                                                                                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marquee animation keyframes and `.animate-marquee` utility   | `app/globals.css`                                                                                                                                       |
| Short transitions `duration-[100ms]` on branded interactions | `components/dnews/header.tsx`, `components/dnews/hero.tsx`, `components/dnews/news-grid.tsx`, `components/dnews/footer.tsx`, `app/news/[slug]/page.tsx` |
