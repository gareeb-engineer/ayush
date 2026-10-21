# 01 — Quickstart: first local build

This is the shortest route for someone who has **never used this custom package**.

## Prerequisites

1. Git and a Git repository (Antora content sources are Git-based).
2. Node.js and npm suitable for the version of Antora in your project. Verified with Node 22 and Antora 3.1.10.
3. Antora CLI and site generator (either preinstalled, or installed using the included `package.json`).
4. Python 3, only to run a local preview server. Any static file server works instead.
5. A browser.

Check in PowerShell:

```powershell
git --version
node --version
npm --version
antora --version
python --version
```

On Windows, `py -3 --version` may work even when `python --version` does not. On Linux/WSL, use `python3`.

## Option A: try the included sample repository

1. Open `example-repository/` in a terminal.
2. Start a Git repository if this is a new, standalone folder. Antora reads content from Git, so this is required:

   ```powershell
   git init
   git add .
   git commit -m "Initialize Antora portfolio example"
   ```

3. Install Antora from the example's package manifest:

   ```powershell
   npm install
   ```

4. Build and serve:

   ```powershell
   npx antora antora-playbook.yaml
   python -m http.server 8000 --directory build-output
   ```

5. Visit `http://localhost:8000/`.

Expected result, confirmed in this environment: Antora completes with **no warnings**, `build-output/` contains 7 article pages plus the root redirect, and the sidebar shows two groups — **Java** and **Engineering Library** — with 5 links and no duplicates.

> The sample pins Antora 3.1.10. `npm install` creates a package lock; once committed, use `npm ci` in CI.

## Option B: integrate into an existing repository

**Do not replace your live files wholesale.** Merge deliberately:

1. Back up your existing playbook, `antora.yml`, UI bundle and every `nav.adoc`.
2. Copy `example-repository/ui/engineering-portfolio-ui-header-fragment-fix.zip` into your own `ui/` directory.
3. Point your existing `ui.bundle.url` at this ZIP; keep your existing site URL, sources, output settings and start page.
4. Copy `example-repository/lib/code-line-highlight.js` into your repository and register it in the playbook:

   ```yaml
   asciidoc:
     extensions:
       - ./lib/code-line-highlight.js
   ```

   Without this, source blocks still render with the dark theme, line numbers and Copy button; only the `highlight=` option stops working.
5. Add a header-links page, for example `modules/headers/pages/header-links.adoc`, and a `contact.adoc` beside it. Do **not** give the `headers` module a `nav.adoc`.
6. Set `site.keys.header_links_page` to that page's full resource ID.
7. Make sure every content module has its own `nav.adoc` that links only to its own pages, and list each one under `nav:` in `antora.yml`. See [Navigation](06-navigation.md).
8. Run your usual `antora antora-playbook.yml` command.
9. Compare results against your old build, then commit.

## Verify success

Work through this list after the first build:

- Site root opens the intended start page.
- Logo, avatar and header links render; Contact opens the AsciiDoc contact page.
- Every module appears once in the sidebar, with readable group names in both open and closed states.
- No page is listed twice in the sidebar.
- The sidebar label, filter box and links stay in place while the article scrolls.
- Clicking an article navigates to a real URL and the sidebar keeps its state.
- A thin progress bar appears at the top only when a page takes a moment to load.
- Source blocks show a language label, line numbers, Copy and Open, and coloured syntax.
- Images, tables and cross-references render.
- `header-links.adoc` and `contact.adoc` are not listed in the sidebar.
- At a narrow window width, the header collapses to one row and **☰ Menu** opens a drawer.

## Common first-run surprises

| Symptom | Cause |
|---|---|
| Clicks reload the whole page | You opened `build-output/index.html` directly. Serve over HTTP; see [19](19-single-page-navigation.md). |
| `highlight=` seems ignored | The build extension is not registered in the playbook. See step 4 above. |
| Code has no colours | The highlighter failed to load. The rest of the block still works; check the browser console. |
| New article missing from the sidebar | Its module's `nav.adoc` doesn't link to it, or that `nav.adoc` isn't listed in `antora.yml`. See [06](06-navigation.md). |
| A page appears twice in the sidebar | Two registered `nav.adoc` files both link to it. Each page should be listed only by its own module. |
| Header shows only a Contact button | `site.keys.header_links_page` did not resolve. See [07](07-dynamic-header.md). |

If something fails, start with [Troubleshooting](12-troubleshooting.md), not by replacing the full bundle again.

Next: [Repository structure](03-repository-structure.md).
