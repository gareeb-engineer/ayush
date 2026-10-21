$ErrorActionPreference = 'Stop'
npx antora antora-playbook.yaml
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host ''
Write-Host 'Site built in build-output.'
Write-Host 'Preview over HTTP (required for single-page navigation):'
Write-Host '  python -m http.server 8000 --directory build-output'
Write-Host 'Then open http://localhost:8000/'
