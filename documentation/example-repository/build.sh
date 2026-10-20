#!/usr/bin/env bash
set -euo pipefail
python3 tools/generate_nav.py --content-root .
npx antora antora-playbook.yaml
echo 'Site built in build-output. Preview: python3 -m http.server 8000 --directory build-output'
