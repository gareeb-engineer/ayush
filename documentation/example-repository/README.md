# Example Antora engineering portfolio repository

A copyable demonstration of the structure explained in [`../README.md`](../README.md). This is an **example**, not a copy of anyone's private repository.

It uses `name: gareeb-engineer`, `version: v1.0`, `modules/java/pages/index.adoc` as the site homepage, one `nav.adoc` per module registered in `antora.yml`, a dedicated `modules/headers/` module for the top-right header links, and `lib/code-line-highlight.js` to enable code-block line highlighting.

## First run

```powershell
npm install
npx antora antora-playbook.yaml
python -m http.server 8000 --directory build-output
```

Open `http://localhost:8000/`.

**Serve over HTTP, don't double-click the HTML files.** Single-page navigation only runs over `http://` or `https://`; from a `file://` path every click falls back to a normal full page load. See [`../docs/19-single-page-navigation.md`](../docs/19-single-page-navigation.md).

## Before deploying publicly

1. Set `site.url` in `antora-playbook.yaml` to your actual GitHub Pages URL, including the `/REPOSITORY` subpath for project pages.
2. Replace the placeholders (`YOUR_PROFILE`, `YOUR_USERNAME`, `YOUR_EMAIL@example.com`) in `modules/headers/pages/header-links.adoc` and `modules/headers/pages/contact.adoc`.
3. Replace `ui-source/img/profile-photo.png` in the documentation kit and repackage the bundle if you want your own header avatar.
4. Configure GitHub Pages to deploy from GitHub Actions, then review `.github/workflows/deploy-antora.yml`.
5. For production builds, commit `package-lock.json` and replace `npm install` with `npm ci`.

## What each part demonstrates

| Path | Demonstrates |
|---|---|
| `antora-playbook.yaml` | `site.keys.header_links_page`, `asciidoc.extensions`, UI bundle, output dir |
| `antora.yml` | Component metadata and per-module nav registration |
| `lib/code-line-highlight.js` | Build extension enabling `highlight=` on source blocks |
| `modules/java/nav.adoc` | Navigation owned by the `java` module, linking only to its own pages |
| `modules/ROOT/nav.adoc` | Navigation owned by `ROOT`, with nested category groups |
| `modules/headers/pages/header-links.adoc` | Header links and `:page-layout: fragment` |
| `modules/headers/pages/contact.adoc` | A normal page reached from the header, deliberately not in any nav |
| `modules/java/pages/index.adoc` | Site start page plus code-block options |
| `modules/ROOT/pages/code-blocks.adoc` | Every code-block option in one page |
| `modules/ROOT/pages/lld/`, `hld/` | Pages grouped into sidebar categories by the ROOT nav |

## Adding a page

1. Create the `.adoc` under the module's `pages/` directory.
2. Add one `xref:` line for it to **that same module's** `nav.adoc`.
3. Rebuild.

Adding a new module means creating `modules/<name>/nav.adoc` and adding one line for it under `nav:` in `antora.yml`.

## Verified

This example was built with Antora 3.1.10 and Node 22. The build completes with no warnings and produces 7 article pages plus the root redirect. The sidebar shows 5 links in two groups (Java, Engineering Library) with no duplicates; every link in each `nav.adoc` points to a page in its own module, and the `headers` pages are absent from the sidebar.
