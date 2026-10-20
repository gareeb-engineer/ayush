# 10 — Local development: Windows, WSL, Linux and macOS

## Commands in your existing repository

Assuming your current Antora content root is the repository root and your playbook is named **`antora-playbook.yaml`**:

### Windows PowerShell

```powershell
cd C:\path\to\portfolio-antora
python tools/generate_nav.py --content-root .
antora antora-playbook.yaml
python -m http.server 8000 --directory build-output
```

If `python` is unavailable, replace with `py -3`. If `antora` is unavailable, install the project dependencies and use `npx antora`.

### WSL / Linux / macOS

```bash
cd /path/to/portfolio-antora
python3 tools/generate_nav.py --content-root . && antora antora-playbook.yaml
python3 -m http.server 8000 --directory build-output
```

Open `http://localhost:8000/`. To stop the preview server press **Ctrl+C** in its terminal.

## When content root is `docs/`

```powershell
python tools/generate_nav.py --content-root docs
antora antora-playbook.yaml
```

The Python argument must point to the directory containing **both** `antora.yml` and `modules/`.

## When can I skip Python?

- **Run Python** after creating, renaming, or deleting an `.adoc` file **when using generated navigation**.
- **Skip Python** if you only edit an existing article's paragraphs or change the list in `header-links.adoc` (unless the nav-exclusion setup itself changed).
- **Never require Python** if you use *manual* `nav.adoc` exclusively; update that file by hand.
- **Run Antora** to reflect all changes in the generated site, even when Python was skipped.

## One-command scripts (included)

`build.ps1` runs the nav generator and Antora in order. `build.sh` does the same for Bash. Review their relative paths if your repo structure differs.

Windows:

```powershell
.\build.ps1
```

Bash:

```bash
bash build.sh
```

## Verify generated output

Expected example entries:

```text
build-output/
├── index.html             # Redirect to site.start_page
├── _/                     # Antora UI assets (default location)
└── gareeb-engineer/v1.0/
    ├── java/index.html
    ├── java/contact.html
    └── ROOT/...
```

Exact paths depend on your component/version, output, and Antora configuration. Do not assume a page file is missing simply because you checked the wrong module URL.

## Why use HTTP, not `file://`?

The site root redirect, some URL behavior, and modern browser security restrictions are easier to test reliably over `http://localhost:8000/`. Antora outputs static HTML, so Python's built-in HTTP server is sufficient for development.

## Checklist after each local build

- Check CLI warnings.
- Refresh page with `Ctrl+Shift+R`.
- Test root redirect.
- Open at least one LLD/HLD article.
- Expand/collapse sidebar groups.
- Test header links from a deep article URL.
- Verify responsive navigation on a narrow viewport.

Next: [CI/CD](11-github-actions.md).
