#!/usr/bin/env bash
set -euo pipefail
npx antora antora-playbook.yaml
echo
echo 'Site built in build-output.'
echo 'Preview over HTTP (required for single-page navigation):'
echo '  python3 -m http.server 8000 --directory build-output'
echo 'Then open http://localhost:8000/'
