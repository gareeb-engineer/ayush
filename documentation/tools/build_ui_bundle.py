#!/usr/bin/env python3
"""Create a COMPLETE Antora UI bundle from extracted UI files.

Usage:
  python tools/build_ui_bundle.py --source ui-source --output example-repository/ui/engineering-portfolio-ui-adoc-header.zip

Run from the documentation kit root; adjust paths as needed.
"""
from pathlib import Path
import argparse
import zipfile

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--source', default='ui-source')
p.add_argument('--output', default='example-repository/ui/engineering-portfolio-ui-adoc-header.zip')
a = p.parse_args()
src = Path(a.source).resolve()
out = Path(a.output).resolve()
if not src.is_dir(): raise SystemExit(f'Source directory not found: {src}')
if not (src/'layouts/default.hbs').is_file():
    raise SystemExit('Missing layouts/default.hbs: input is not a complete Antora UI.')
paths = [x for x in src.rglob('*') if x.is_file() and '__pycache__' not in x.parts]
if not paths: raise SystemExit('No UI source files found')
out.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(out,'w',compression=zipfile.ZIP_DEFLATED) as z:
    for file in sorted(paths):
        z.write(file, file.relative_to(src).as_posix())
with zipfile.ZipFile(out,'r') as z:
    names=set(z.namelist())
    assert 'layouts/default.hbs' in names
    assert 'layouts/portfolio.hbs' in names
    assert 'css/site.css' in names
print(f'Created complete Antora UI: {out} ({len(paths)} files)')
