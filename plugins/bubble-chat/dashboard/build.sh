#!/usr/bin/env bash
# Build the bubble-chat dashboard plugin (dist/index.js + dist/style.css).
# Uses only the repo's existing node_modules — no npm install.
set -euo pipefail
cd "$(dirname "$0")"
exec node build.mjs
