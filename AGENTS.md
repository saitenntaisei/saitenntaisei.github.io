# Repository Guidelines

This repository hosts a Vite + React site published via GitHub Pages. Use this guide to develop, test, and deploy changes safely and consistently.

## Project Structure & Module Organization
- `src/` React source (components, styles, tests). Example: `src/App.js`, `src/App.test.js`.
- `public/` Static assets copied as-is to the build.
- `docs/` Built site output for GitHub Pages. Do not edit by hand.
- `tailwind.config.js` Tailwind setup; scans `./index.html` and `./src/**/*`.
- `package.json` Scripts and dependencies; Vite config in `vite.config.js`.

## Build, Test, and Development Commands
- `npm run dev` Run Vite dev server with fast HMR.
- `npm test` Run Vitest + Testing Library in watch mode.
- `npm run build` Produce production build into `docs/` (served by Pages).
- `npm run preview` Preview the production build locally.
- `npm run deploy` Build into `docs/`, commit, and push to `master`.

## Coding Style & Naming Conventions
- JavaScript/React with functional components; prefer PascalCase for components (e.g., `Header`, `UserCard`).
- Files: one component per file; consider `ComponentName.js(x)` when adding new ones.
- Indentation: 2 spaces; always use semicolons; prefer double quotes in JS to match current files.
- Styling: Tailwind CSS utilities in `className`. Keep custom CSS minimal in `src/*.css`.
- Linting: Use common React/JS best practices; keep components small and typed via JSDoc if helpful. Address any linter warnings if present.

## Testing Guidelines
- Frameworks: Vitest + React Testing Library (`jsdom` env).
- Location: co-locate as `*.test.js(x)` in `src/` (e.g., `src/MyComponent.test.jsx`).
- Scope: cover rendering, user interactions, and accessibility roles. Add tests for new components/behaviors.
- Run: `npm test` locally before opening a PR.

## Commit & Pull Request Guidelines
- Commit style: concise, imperative, emoji prefix common in history, e.g.:
  - `:sparkles: Add dark mode toggle`
  - `:bug: Fix mobile layout overflow`
  - `:arrow_up: Bump dependency xyz`
- Pull requests: include a clear description, linked issues, and UI screenshots/GIFs when visual changes occur. Ensure `npm build` succeeds. Do not commit changes directly under `docs/`; use `npm run deploy` after merge.

## Security & Configuration Tips
- Never commit secrets; this is a public Pages site. `homepage` and Pages point to `docs/`—verify deploys on `master` only.
- Adding new file types or paths? Update `tailwind.config.js` `content` so classes are detected.
