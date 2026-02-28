# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

No test framework is configured yet.

## Architecture

Gardening competition scoring app. Single-page client-side Next.js 16 app (App Router) with no backend or database. All state lives in localStorage (`garden-competition-data` key) via `hooks/useLocalStorage.ts`.

### Data flow

`app/page.tsx` is a `'use client'` component that owns all state. It passes category data down to `CategoryTable` components and computes the leaderboard via `lib/scoring.ts#calculateLeaderboard()`. Participant names are comma-separated, normalized to lowercase for scoring.

### Key modules

- `lib/types.ts` - Data models (`Entry`, `Category`, `CompetitionData`) and constants (`CATEGORIES`, `POINTS`)
- `lib/scoring.ts` - Pure scoring logic: `calculateLeaderboard()` and `calculateCategoryWinner()`
- `components/PrintableResults.tsx` - Hidden print layout toggled via CSS `@media print`

### UI stack

- Tailwind CSS v4 with `@tailwindcss/postcss`
- shadcn/ui (new-york style, CSS variables, `components/ui/`)
- Add components: `npx shadcn@latest add <component>`
- Lucide icons

### Scoring rules

1st = 3pts, 2nd = 2pts, 3rd = 1pt. Multiple winners per entry separated by commas. 7 categories: Cut flowers, Roses, Vege, fruit, Pots&Containers, Floral, Home baking.
