# Contributor Guide

This repository hosts a Next.js (App Router) portfolio deployed via GitHub Pages. Follow these guidelines to develop, test, and deploy changes consistently.

## Project Layout
- `app/` App Router entrypoints: `layout.jsx` (root shell), `page.jsx` (home), co-located tests.
- `public/` Static assets (e.g., `github.png`, `x.png`, `saiten.png`) served from `/`.
- `docs/` Static export for GitHub Pages. Do not edit manually.
- Config: `next.config.js` (uses `output: 'export'`), `tailwind.config.js`, `postcss.config.js`, `jest.config.mjs`.

## Commands
- `npm run dev` Start Next.js dev server (port 3000).
- `npm test` Run Jest + React Testing Library (jsdom).
- `npm run build` Build and statically export to `docs/`.
- `npm run deploy` Build, commit `docs/`, and push to `master`.

## Coding Conventions
- Components: functional, PascalCase filenames (`Header.jsx`). Keep client/server boundaries clear; pages default to server components—add `"use client"` when client APIs or hooks are needed.
- Styling: Tailwind CSS utilities in `className`. If you add new folders or file types, update `tailwind.config.js` `content` globs so purge works.
- Imports: Prefer absolute imports from app/components if you introduce them; keep public asset paths absolute (e.g., `/github.png`) so they work on Pages root.

## Testing
- Use Jest with Testing Library. Co-locate tests near the component/page as `*.test.jsx`.
- Test rendering, roles, and core interactions. Avoid coupling to implementation details.

## PRs & Deploys
- Keep commits concise and imperative (emoji prefix is fine): `:sparkles: Add Projects section`.
- Open PRs with clear descriptions and screenshots for visual changes.
- Never edit `docs/` directly; always `npm run build` then `npm run deploy`.

## Notes for GitHub Pages
- This is a user site (`saitenntaisei.github.io`) published from `docs/` on `master`.
- Static export requires avoiding server-only features (e.g., Route Handlers, dynamic rendering). Stick to static/client components for pages.
