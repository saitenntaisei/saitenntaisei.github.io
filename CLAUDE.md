# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is a Vite + React personal portfolio site (user GitHub Pages: `saitenntaisei.github.io`, custom domain `saiten.cc`). For human-facing contributor guidelines (commit style, PR expectations, coding conventions), read `AGENTS.md` — it is authoritative and not duplicated here.

## Common commands

- `npm run dev` — Vite dev server (defaults to `http://localhost:5173`, falls back to next free port)
- `npm test` — Vitest in watch mode (jsdom + Testing Library)
- `npm test -- --run` — single-pass run for CI / agents
- `npm test -- src/App.test.jsx` — run a single test file
- `npm test -- -t "renders HomeFile"` — run a single test by name
- `npm run build` — production build (writes to `docs/`, not `dist/`)
- `npm run preview` — serve the built `docs/` on port 4173
- `npm run deploy` — `npm run build` + commits `docs/` and `git push origin master` (see "Deploy branch caveat")

## Architecture

- **Entry point**: `src/main.jsx` mounts `<App />` into `#root` from `index.html`.
- **Routing is hash-based and hand-rolled** in `src/route.js`. `getRouteFromHash` returns `{ name, params, anchor }`:
  - `name`: `"home"` (default) or `"project"`
  - `params.slug`: project slug when `name === "project"` (e.g. `"vfd-gps-clock"`)
  - `anchor`: `"L-foo"` for in-page anchors (`#L-about`, `#L-projects`, ...) — App scrolls to that `id` via `useEffect`
- **Pages** live in `src/pages/`:
  - `HomeFile.jsx` — single-source-file home (`portfolio.cpp` aesthetic)
  - `VfdGpsClockFile.jsx` / `NixiedClockFile.jsx` — project detail pages, also code-styled
- **Code-style primitives** live in `src/code/`:
  - `Token.jsx` — typed span (`kind="kw|ty|fn|st|cm|nm|pp"`) → GitHub Dark color
  - `tokens.js` — kind → CSS class map
  - `Line.jsx` — gutter line number + content; `id` becomes the scroll anchor target
  - `HeaderBar.jsx` — sticky 1-line nav rendering forward declarations as line `1`
  - `CodeShell.jsx` — outer dark container
- **Styling**: Tailwind utility classes only. Code-themed pages are dark-only by design (no Tailwind `dark:` toggle on those views).
- **Static assets** (`/saiten.png`, `/x.png`, `/github.png`, `/logo/*.png`, `/material/*`) live in `public/` and are referenced with absolute root paths in JSX. `vite.config.js` sets `base: '/'` because this is served at the domain root.
- **Custom domain**: `public/CNAME` contains `saiten.cc` and is copied to `docs/CNAME` on every build.

## Build output goes to `docs/` (not `dist/`)

`vite.config.js` sets `outDir: 'docs'` with `emptyOutDir: true` so GitHub Pages can serve the build directly from `docs/` on the publish branch. **Do not hand-edit files in `docs/`** — they are regenerated on every build, including `CNAME` (which is sourced from `public/CNAME`).

## Deploy branch caveat

The `deploy` npm script pushes to `origin master`, but the local repo's default branch is `main`. Before running `npm run deploy`, confirm with the user which branch GitHub Pages is actually publishing from; if it has been migrated to `main`, the script needs updating rather than blindly invoking.

## Tailwind content globs

`tailwind.config.js` `content` is `["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]`. If you introduce a new file type or directory that contains class names (e.g. MDX, a sibling source folder), add it to `content` or the classes will be purged from the production build.

Note: `src/code/Token.jsx` uses arbitrary-color classes like `text-[#ff7b72]`. Tailwind's JIT picks them up from source, so they survive the purge as long as the source file matches the `content` glob.

## Testing notes

- Test environment is configured in `vite.config.js` (`environment: 'jsdom'`, `setupFiles: './src/setupTests.js'`), not a separate `vitest.config`.
- `src/setupTests.js` registers `@testing-library/jest-dom` matchers and an `afterEach(cleanup)` so DOM state does not leak between tests.
- Tests co-locate next to source as `*.test.jsx` (or `*.test.js` for non-JSX modules like `route.test.js`).
- Hash-routing tests must dispatch `new HashChangeEvent("hashchange")` after changing `location.hash` to trigger the listener — see `src/App.test.jsx` for the pattern.
- jsdom does not navigate on `<a>` click. To assert link behavior, check the `href` attribute rather than asserting `window.location.hash` after `fireEvent.click`.

## Specs and plans

- `specs/` — design specs written during brainstorming (e.g. `2026-05-07-code-themed-ui-design.md`)
- `plans/` — implementation plans driven by those specs

These directories are kept outside `docs/` so the Vite build (which empties `docs/`) does not delete them.
