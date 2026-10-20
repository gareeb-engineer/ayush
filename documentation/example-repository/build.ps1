$ErrorActionPreference = 'Stop'
python tools/generate_nav.py --content-root .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx antora antora-playbook.yaml
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host 'Site built in build-output. Preview: python -m http.server 8000 --directory build-output'
