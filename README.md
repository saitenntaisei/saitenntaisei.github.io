# saitenntaisei.github.io

Next.js (App Router) portfolio site deployed to GitHub Pages (user site). The production static export is emitted to `docs/`.

## Quick Start
- Install: `npm install`
- Dev server: `npm run dev` then open `http://localhost:3000`
- Tests: `npm test` (Jest + Testing Library)
- Build + export: `npm run build` (outputs static files to `docs/`)

## Project Structure
- `app/` App Router entry points
  - `app/layout.jsx` root layout and global CSS
  - `app/page.jsx` home page (client component)
  - `app/page.test.jsx` example Jest test
- `public/` static files copied as-is (e.g., `github.png`, `x.png`)
- `docs/` static export served by GitHub Pages (do not edit)
- `next.config.js` Next.js config (`output: 'export'` for static HTML)
- `tailwind.config.js`, `postcss.config.js` Tailwind + PostCSS

## Scripts
- `npm run dev` run Next.js dev server
- `npm test` run Jest + Testing Library
- `npm run build` build and static export to `docs/`
- `npm run deploy` build and push `docs/` to `main`

## Styling
Tailwind CSS utility classes are used across components. If you add new directories or file types, update `tailwind.config.js` `content` globs so unused styles are purged correctly.

## Deployment (GitHub Pages)
This is a user site (`saitenntaisei.github.io`) that serves from `docs/` on `main`. The project uses Next.js static export via `output: 'export'`—avoid server-only features (e.g., Route Handlers, dynamic server rendering). To publish:

1. `npm run build`
2. `npm run deploy`

For contributor guidance and conventions, see `AGENTS.md`.
