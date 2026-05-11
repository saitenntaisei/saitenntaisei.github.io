---
name: visual-smoke
description: Start the Vite dev server, navigate Playwright to one or more routes in the saiten.cc portfolio, take screenshots at desktop (1280) and mobile (375) widths, present them in chat, and clean up the temp PNGs. Use whenever the user wants a fast UI sanity check after edits.
disable-model-invocation: true
---

# visual-smoke

Pin a fast visual sanity check on the current state of the portfolio site.

## When to use

- The user wants to confirm a UI change before committing
- After non-trivial edits to `src/code/` primitives or `src/pages/` files
- Comparing layouts at desktop vs mobile widths

## Inputs

- `route` (optional, default `/`) — a path or hash route. Examples: `/`, `#/projects`, `#/projects/nixie-clock`
- `widths` (optional, default `1280 375`) — space-separated viewport widths

## Procedure

1. **Start dev server in background** if not already running:
   - `npm run dev` with `run_in_background: true`
   - Wait until stdout shows `VITE ... ready in` and `Local: http://localhost:<port>/`
   - Capture the port (Vite falls back to next free port if 5173 is taken)

2. **For each width**:
   - Use `mcp__plugin_playwright_playwright__browser_resize { width, height: 800 }`
   - Use `mcp__plugin_playwright_playwright__browser_navigate { url: "http://localhost:<port><route>" }`
   - Use `mcp__plugin_playwright_playwright__browser_take_screenshot { filename: "smoke-<width>.png", fullPage: false }`
   - `Read` the screenshot file so it surfaces in chat

3. **Clean up**:
   - `rm -f smoke-*.png && rm -rf .playwright-mcp`
   - Do NOT stop the dev server — the user may want to iterate. Mention it is still running.

## Quick checklist while reviewing

- Sticky `#include "project.hpp"` header visible and stays on top when scrolled
- Hazard stripes flank the rounded code box on both sides
- Footer (X / GitHub / Qiita icons + copyright) is full width
- No layout overflow at 375px
- No white flash on overscroll (html/body bg is dark)

## Anti-patterns

- Do not start the dev server in the foreground — it blocks the tool call
- Do not stop the dev server between routes if checking multiple
- Do not skip cleanup; loose `*.png` files clutter `git status`
