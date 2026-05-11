#!/usr/bin/env bash
# After Claude edits a JS/JSX source file, run only the related Vitest
# tests so regressions surface immediately.
set -uo pipefail

path="$(jq -r '.tool_input.file_path // empty')"

case "$path" in
  src/*.js|src/*.jsx|src/**/*.js|src/**/*.jsx)
    ;;
  *)
    exit 0
    ;;
esac

if [ ! -d node_modules ]; then
  exit 0
fi

# Skip if we edited a test file — vitest will pick it up anyway and
# the noise on every test save isn't worth it.
case "$path" in
  *.test.js|*.test.jsx) exit 0 ;;
esac

# Run related tests, surface failure tail, never block the tool call.
output="$(npx vitest related --run "$path" 2>&1)" || true
echo "$output" | tail -n 6
exit 0
