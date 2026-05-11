---
name: deploy-check
description: Verify that `npm run deploy` is safe to run on the current working tree, then optionally execute it. Confirms tests pass, build succeeds, that GitHub Pages still publishes from `main /docs`, and that the working tree only carries intentional changes. Use before publishing a deploy.
disable-model-invocation: true
---

# deploy-check

Gate `npm run deploy` behind a checklist so a stale `master` script, a failing test, or a forgotten WIP edit can't ship to saiten.cc.

## Why

The deploy script is `npm run build && git add docs && git commit -m ':rocket: Deploy' && git push origin main`. If any of those preconditions are wrong (Pages source moved, master/main mismatch, tests broken, source uncommitted), the live site silently misses the change or commits noise.

## Procedure

1. **Working-tree audit**
   - `git status --short` — verify there are no unintended uncommitted changes.
   - `git log --oneline origin/main..HEAD` — show what will land on `main`.
   - If anything is unexpected, stop and report.

2. **Tests**
   - `npm test -- --run` → report pass count.
   - Stop on failure.

3. **Build**
   - `npm run build` → confirm `docs/index.html` and the new asset hashes appear.
   - Stop if build fails.
   - Note: `vite.config.js` has `emptyOutDir: true`, so `docs/CNAME` must come from `public/CNAME`. Confirm with `ls docs/CNAME`.

4. **Pages source check**
   - `gh api repos/saitenntaisei/saitenntaisei.github.io/pages` → confirm `source.branch == "main"` and `source.path == "/docs"`.
   - If the source has moved, do NOT run deploy. The script needs updating first.

5. **Diff preview**
   - `git diff --shortstat docs/` against the working tree vs HEAD — show how many docs/ files would change.
   - If zero, the deploy commit would be empty; skip.

6. **Confirm**
   - Tell the user the summary (tests pass / build green / Pages source OK / docs diff size).
   - Ask the user to confirm before running `npm run deploy`.

7. **Run** (only after the user confirms)
   - `npm run deploy`
   - After push, fetch the new Pages build status: `gh api repos/saitenntaisei/saitenntaisei.github.io/pages/builds | head -20`
   - Pages builds take ~30s; the user can verify with `curl -sI https://saiten.cc/` once propagated.

## Safety rules

- Never run `npm run deploy` automatically. Always require the user's explicit "yes" after the checklist.
- Never alter the deploy script without telling the user (it pushes to `main`; that is a remote write).
- If `docs/` has uncommitted hand-edits, refuse to deploy. Hand edits are a red flag because `emptyOutDir` will erase them on the next build.
