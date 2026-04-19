# D'NEWS

## Project Snapshot

Next.js 16 App Router site for an Indonesian news portal visual concept. The repo uses React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and Vercel Analytics. Current routes are `/` and `/news/[slug]`, and article data is fetched from GNews through `lib/gnews.ts`.

Reference docs:

- Architecture: [TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)
- UI patterns: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)

## Setup Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Type check: `pnpm exec tsc --noEmit`
- Production build: `pnpm build`
- Production serve: `pnpm start`

## Universal Conventions

- Use TypeScript, ES modules, and the `@/` path alias from `tsconfig.json`.
- Keep domain sections in `components/dnews/` and reusable primitives in `components/ui/`.
- Use functional components only.
- Use Tailwind utilities for styling. Extend `app/globals.css` for shared theme/utilities.
- Prefer `gap-*` utilities for spacing.
- Follow the existing neo-brutalist surface pattern: `border-[3px]`, `border-harsh-black`, `.brutal-shadow*`, and `font-display` for headlines.
- Keep diffs scoped to the files required for the task.
- Use Conventional Commits when a commit is requested: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`.

## Security & Secrets

- Do not commit `.env*` files or API keys.
- Server-side GNews access uses `GNEWS_API_KEY` from `process.env` in `lib/gnews.ts`.
- Client-safe variables must use the `NEXT_PUBLIC_` prefix.

## JIT Index

### Key Paths

- Routes: `app/`
- Active theme: `app/globals.css`
- Domain UI: `components/dnews/`
- Reusable UI primitives: `components/ui/`
- Data/service helpers: `lib/gnews.ts`
- Shared class merge helper: `lib/utils.ts`

### Quick Find Commands

- Route modules: `rg -n "export default async function|export default function" app`
- Domain components: `rg -n "export function" components/dnews`
- GNews usage: `rg -n "fetchTopHeadlines|searchNews|GNEWS_API_KEY" .`
- Theme tokens: `rg -n "--neon-yellow|--electric-blue|--hot-pink|--paper-white|--harsh-black" app/globals.css`
- CVA variants: `rg -n "cva\(" components/ui`

## Common Gotchas

- `app/globals.css` is the active theme file. `styles/globals.css` is an unused fallback theme.
- `next.config.mjs` ignores TypeScript build errors during `next build`, so run `pnpm exec tsc --noEmit` separately.
- `ThemeProvider` exists in `components/theme-provider.tsx` but is not wired into `app/layout.tsx`.
- `lib/gnews.ts` returns empty arrays on missing API key, failed responses, or fetch exceptions.
- The homepage has fallback content in multiple sections, but `/news/[slug]` depends on a resolved article and otherwise hits `notFound()`.

## Definition of Done

Before handing off work, provide objective proof:

- Validation command passed: `pnpm lint && pnpm exec tsc --noEmit && pnpm build`
- Diff is limited to the agreed paths
- If UI changed, attach a screenshot in the PR or handoff

For architecture details or design tokens, link to the docs above instead of duplicating them here.
