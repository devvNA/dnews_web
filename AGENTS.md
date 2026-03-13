# D'NEWS

## Project Snapshot

Single-page Next.js 16 App Router portfolio site — an Indonesian news portal with **neo-brutalist** design. React 19, TypeScript, Tailwind CSS v4, shadcn/ui (new-york). All content is hardcoded; no backend, no database, no API routes.

For full architecture details, see [TECHNICAL OVERVIEW.md](TECHNICAL%20OVERVIEW.md).

## Setup & Run

```bash
pnpm install
pnpm dev              # Start dev server (http://localhost:3000)
pnpm lint             # ESLint
pnpm exec tsc --noEmit  # TypeScript strict check
pnpm build            # Production build (final verification)
```

## Universal Conventions

- **Language**: TypeScript with strict mode. Use ES modules and path alias `@/` for all imports.
- **Components**: Functional React components only. `PascalCase` filenames for components.
- **Styling**: Tailwind utility classes. No CSS Modules. Use `cn()` from `@/lib/utils` for conditional classes.
- **Spacing**: Prefer `gap-*` over margins.
- **Borders**: 3px solid borders (`border-[3px] border-harsh-black`), zero radius (`--radius: 0rem`), exceptions use `rounded-full`.
- **Shadows**: Use `.brutal-shadow`, `.brutal-shadow-hover`, `.brutal-shadow-active` utility classes.
- **Typography**: Headlines → `font-display` (Anton, uppercase). Body → `font-sans` (Space Grotesk).
- **Commits**: Conventional Commits — `feat:`, `fix:`, `refactor:`, `style:`, `chore:`.

## Security & Secrets

- Never commit `.env` files or secrets.
- No API keys are currently used; if added, prefix client-side keys with `NEXT_PUBLIC_`.
- No user-generated content or database; XSS/injection surface is minimal.

## Project Structure

```
app/                    ← Route entry points (App Router)
├── globals.css         ← Active neo-brutalist theme + custom utilities
├── layout.tsx          ← Root layout: Google Fonts, Vercel Analytics
└── page.tsx            ← Homepage: composes all section components

components/
├── dnews/              ← Domain components (Header, Hero, NewsGrid, etc.)
├── ui/                 ← shadcn/ui primitives (~55 files, auto-generated)
└── theme-provider.tsx  ← next-themes wrapper (not yet wired)

hooks/                  ← Custom React hooks
lib/                    ← Shared utilities (cn())
styles/                 ← Default shadcn theme (inactive fallback)
public/                 ← Static assets (favicons, images)
```

## Patterns & Conventions

### Adding Domain Components

- Place in `components/dnews/`.
- Mark `"use client"` if using hooks or browser APIs.
- Import into `app/page.tsx` (or future route pages).
- Follow existing pattern:
  - DO: `components/dnews/header.tsx` — functional component, Tailwind classes, neo-brutalist styling
  - DON'T: Create class components or use CSS-in-JS

### Adding shadcn/ui Components

- Use the CLI: `pnpm dlx shadcn@latest add <component-name>`
- Components auto-install to `components/ui/`.
- Config: `components.json` (style: `new-york`, RSC: true, icons: lucide).

### Styling Rules

- Custom D'NEWS colors: `neon-yellow`, `electric-blue`, `hot-pink`, `paper-white`, `harsh-black` (defined as CSS vars + Tailwind config).
- All custom utilities are in `app/globals.css` under `@layer utilities`.
- DO: Use `text-brutal` class for display headings.
- DON'T: Add new CSS files — extend `app/globals.css` instead.
- DON'T: Use `styles/globals.css` — it's the default shadcn fallback, not the active theme.

### Data

- All content (news, opinions, nav links) is hardcoded in component files.
- No data fetching, no API routes, no CMS.

## Key Files

| Purpose                  | File                 |
| ------------------------ | -------------------- |
| Homepage composition     | `app/page.tsx`       |
| Active theme & utilities | `app/globals.css`    |
| Root layout & fonts      | `app/layout.tsx`     |
| Class merge utility      | `lib/utils.ts`       |
| Tailwind custom config   | `tailwind.config.ts` |
| shadcn/ui config         | `components.json`    |
| Next.js config           | `next.config.mjs`    |

## Quick Find Commands

```bash
# Find a domain component
rg -n "export function" components/dnews/

# Find a UI primitive
rg -n "export function|export const" components/ui/

# Find CSS custom properties
rg -n "\-\-neon-yellow|\-\-electric-blue|\-\-hot-pink|\-\-paper-white|\-\-harsh-black" app/globals.css

# Find all Tailwind custom utilities
rg -n "@layer utilities" app/globals.css

# Find all imports in a file
rg -n "^import" app/page.tsx
```

## Common Gotchas

- **Two `globals.css` files exist**: `app/globals.css` is the active neo-brutalist theme. `styles/globals.css` is the default shadcn fallback — do NOT edit it for styling changes.
- **TypeScript build errors are ignored** in `next.config.mjs` (`ignoreBuildErrors: true`). Always run `pnpm exec tsc --noEmit` manually.
- **Images are unoptimized** (`next.config.mjs`). Don't rely on Next.js image optimization.
- **ThemeProvider exists** (`components/theme-provider.tsx`) but is NOT wired into the layout. Dark mode won't work until it's added.
- **`"use client"` on all domain components**: Currently all D'NEWS components are client components despite having no interactivity (except Header and Footer). Consider server components for static sections.

## Definition of Done

Before submitting a PR, run all checks and ensure they pass:

```bash
pnpm lint && pnpm exec tsc --noEmit && pnpm build
```

- Lint: zero warnings/errors.
- TypeScript: no type errors.
- Build: successful production build.
- Changes are scoped to relevant files only — no unrelated modifications.
- UI changes include a screenshot in the PR description.
