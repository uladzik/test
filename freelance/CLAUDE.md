# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack on http://localhost:3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

No test framework is configured.

## Architecture

**Freelance Portal** — a Next.js 15 App Router project for managing client projects, time tracking, payments, and task management.

### Routing & Pages

- `/` → redirects to `/projects`
- `/projects` — project listing grouped by status (Active, Paused, Completed) with summary stats
- `/projects/[projectId]` — individual project dashboard with 13 feature module cards

### Key Directories

- `src/app/` — Next.js pages and root layout; `globals.css` contains the design system (CSS variables, card utilities, animations)
- `src/components/modules/` — 13 dashboard module cards rendered on the project detail page (meetings, tasks, time tracking, payments, chat, links, documents, notes, timeline, stats, etc.)
- `src/components/layout/sidebar.tsx` — main navigation (client component) with project list and dark mode toggle
- `src/lib/types.ts` — all TypeScript domain interfaces (Project, Task, Meeting, TimeEntry, Payment, Milestone, etc.)
- `src/lib/dummy-data.ts` — all mock data; components filter this client-side by `projectId`
- `src/actions/` — empty directory prepared for Next.js Server Actions

### Data Flow

All data is currently static mock data from `dummy-data.ts`. No backend, API routes, or database are connected yet. When integrating a real backend, Server Actions in `src/actions/` are the intended pattern.

### Styling

Tailwind CSS v4 with a custom CSS variable design system in `globals.css`. Light/dark modes use CSS variable switching (dark mode toggled via `localStorage` in the root layout). Custom utility classes: `.card`, `.card-compact`, `.card-flush`, `.glass`.

### Component Conventions

- Server components by default; add `"use client"` only when needed (event handlers, localStorage, hooks)
- Path alias `@/*` maps to `src/*`
