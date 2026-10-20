# 01 — Quickstart: first local build

This is the shortest route for someone who has **never used this custom package**.

## Prerequisites

1. Git and a Git repository (Antora content sources are Git-based).
2. Node.js and npm suitable for the version of Antora in your project.
3. Antora CLI and site generator (either preinstalled, or installed using the included `package.json`).
4. Python 3 to use `generate_nav.py` (standard library only).
5. A browser; a local Python HTTP server is sufficient.

Check in PowerShell:

```powershell
git --version
node --version
npm --version
python --version
antora --version
```

On Windows, `py -3 --version` may work even when `python --version` does not. On Linux/WSL, use `python3`.

## Option A: try the included sample repository

1. Extract the documentation ZIP.
2. Open `example-repository/` in a terminal.
3. Start a Git repository if this is a new, standalone folder:

   ```powershell
   git init
   git add .
   git commit -m "Initialize Antora portfolio example"
   ```

4. Install Antora from the example's package manifest:

   ```powershell
   npm install
   ```

5. Generate nav, build and serve:

   ```powershell
   python tools/generate_nav.py --content-root .
   npx antora antora-playbook.yaml
   python -m http.server 8000 --directory build-output
   ```

6. Visit `http://localhost:8000/` and try the sidebar, Contact, and LinkedIn/GitHub links (the latter are placeholders until edited).

> The sample may need your machine's Antora/npm versions adjusted. `npm install` creates a package lock; once committed, use `npm ci` in CI.

## Option B: integrate into an existing repository

**Do not replace your live files wholesale.** Merge deliberately:

1. Back up your existing playbook, `antora.yml`, UI bundle, `generate_nav.py`, and `nav.adoc` if present.
2. Copy `example-repository/ui/engineering-portfolio-ui-adoc-header.zip` into your own `ui/` directory.
3. Point your existing `ui.bundle.url` at this ZIP; keep the existing site URL, sources, output settings and start page.
4. Add `modules/java/pages/header-links.adoc` (or adapt the module to your own structure).
5. Set `site.keys.header_links_page` to a full page resource ID.
6. Register `modules/ROOT/nav-generated.adoc` in `antora.yml` **if you choose automatic navigation**; otherwise use your existing `nav.adoc`.
7. Run the Python generator only for auto navigation; then run your usual `antora antora-playbook.yaml` command.
8. Compare results against your old build and then commit.

## Verify success

- Site root opens the intended start page.
- Logo and header links render; Contact opens the AsciiDoc contact page.
- Expandable sidebar categories display readable names in both states.
- Clicking an article navigates to a real URL.
- Source blocks, images, tables and cross-references render.
- `header-links.adoc` is not inadvertently listed in the sidebar.

If something fails, start with [Troubleshooting](12-troubleshooting.md), not by replacing the full bundle again.

Next: [Repository structure](03-repository-structure.md).
