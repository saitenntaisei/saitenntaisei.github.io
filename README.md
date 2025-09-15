# saitenntaisei.github.io

Vite + React portfolio site deployed to GitHub Pages (user site). The production build is emitted to `docs/`.

## Quick Start
- Install: `npm install`
- Dev server: `npm run dev` then open `http://localhost:5173`
- Tests: `npm test`
- Build: `npm run build` (outputs to `docs/`)
- Preview production: `npm run preview`

## Project Structure
- `src/` React source code and tests
  - `src/main.jsx` app entry
  - `src/App.jsx` main component
  - `src/App.test.jsx` example Vitest test
- `public/` static files copied as-is (e.g., `github.png`, `x.png`)
- `index.html` Vite HTML entry
- `docs/` build output served by GitHub Pages
- `vite.config.js` Vite configuration (build to `docs/`)
- `tailwind.config.js`, `postcss.config.js` Tailwind + PostCSS

## Scripts
- `npm run dev` start Vite with HMR
- `npm test` run Vitest + Testing Library (jsdom)
- `npm run build` production build to `docs/`
- `npm run preview` local preview of the build
- `npm run deploy` build and push `docs/` to `master`

## Styling
Tailwind CSS utility classes are used in components. Edit `tailwind.config.js` `content` globs if you add new file types/paths so unused styles are purged correctly.

## Deployment (GitHub Pages)
This repo is configured as a user site (`saitenntaisei.github.io`) and serves from the `docs/` folder on the `master` branch. To publish a new version:

1. `npm run build`
2. `npm run deploy`

For contributor guidance and conventions, see `AGENTS.md`.
