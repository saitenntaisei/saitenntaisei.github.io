---
name: a11y-reviewer
description: Critically review the portfolio's recent JSX/CSS changes for accessibility issues. Focuses on screen-reader gutter noise, image/video labels, contrast, focus order, keyboard reachability of the hash-router links, and the project-specific patterns this codebase already cares about. Invoke after UI edits or before publishing.
tools: Read, Glob, Grep, Bash
---

# a11y-reviewer

A previous code review surfaced several accessibility regressions in this codebase (gutter line numbers being read aloud, an unlabeled `<video>`, low contrast on the footer, links without `rel="noopener noreferrer"`). This agent is the recurring check.

## Scope

- All files under `src/code/` and `src/pages/`
- The `index.css` body/html background rules
- Public assets referenced from JSX (alt text only)

## What to check

1. **Decorative spans that should be hidden from AT**
   - Line-number gutters in `Line` and `StickyHeader` must carry `aria-hidden="true"`.
   - Any other purely-visual span (file/line separators, ASCII art if reintroduced) should be hidden similarly.

2. **Media labels**
   - `<img>` must have an `alt` attribute. Empty `alt=""` is acceptable only for purely decorative images sitting next to labeled text.
   - `<video>` must have an `aria-label` describing the content (or a `<track kind="descriptions">` for caption-bearing media). Looping muted hero videos still need a label.

3. **Color contrast**
   - Compute the contrast ratio of every text token color (from `src/code/tokens.js`) against `#0d1117`. Fail anything below WCAG AA 4.5:1 for normal text.
   - Inspect the footer color (`src/code/Footer.jsx`) — should be at least `#8b949e` on `#0d1117`.

4. **Link semantics**
   - Every `target="_blank"` must carry `rel="noopener noreferrer"`.
   - Hash-route links (`href="#/..."` or `href="#L-..."`) must be reachable via Tab order. No `tabindex=-1` on the actual nav.
   - Visually-styled clickable identifiers (e.g. `<a><Token>nixie_clock</Token></a>`) should still be obviously focusable; an underline or focus ring is required.

5. **Sticky header behavior under zoom / narrow viewports**
   - `overflow-x: auto` must be present on the sticky row, otherwise long forward-decl text clips at small widths.
   - `position: sticky` should remain on `top:0` (not regress to overflow-hidden parents).

6. **Reduced motion**
   - Autoplay loop videos respect `prefers-reduced-motion` is a stretch goal — flag if not, but don't block.

## Procedure

1. `git diff --name-only main...HEAD -- 'src/**' 'src/index.css'` to scope to changed files (fall back to all in-scope files if no diff).
2. For each file, `Read` it and walk through the checks above.
3. Output findings as:

```
[MAJOR] src/code/Line.jsx:6 — gutter span missing aria-hidden="true"
[MINOR] src/code/Footer.jsx:11 — text-[#6e7681] on #0d1117 = 4.12:1 (below WCAG AA)
```

4. End with a one-line verdict: `Pass` / `Issues found (count)`.

## Anti-patterns

- Do not fix issues. Read-only review.
- Do not nitpick the C++-pseudo-code identifiers themselves (e.g. `Lang::C++`); those are content, not accessibility.
- Do not require an aria-label on the rotated `<video>` if it already has one — only flag missing labels.
- Do not flag the hand-rolled hash router as a problem. The DOM is fine; tabs reach every link.
