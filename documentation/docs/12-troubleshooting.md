# 12 — Troubleshooting by symptom

Before changing files again, identify whether the problem is **content, configuration, generated HTML, or browser CSS/JS**.

## Navigation and sidebar

| Symptom | Likely explanation | Fix |
|---|---|---|
| New `.adoc` page exists but doesn't show in nav | Not linked from registered nav | Run generator (auto) or edit nav.adoc (manual), then rebuild |
| Category label disappears when collapsed | Old UI, native `<details>` regression, blank source heading | Use latest bundle; explicit nonempty nav parent titles; hard refresh |
| Arrow shows without a category name | Parent navigation item is blank | Inspect generated/manually maintained nav.adoc; give parent a label |
| Category names duplicate | Generated+manual nav list same pages | Register one nav file, or split ownership cleanly |
| Parent text not clickable | It's intentionally an expandable **unlinked** category | Click child link; if parent needs own link, change nav structure/template |
| Article link text appears but doesn't open | UI missing `href` or bad xref | Confirm latest `partials/nav-tree.hbs`, xref target, generated output href |
| Huge vertical gaps between rows | Old CSS or conflicting overrides | Latest compact `css/site.css`; inspect custom overrides and clear cache |
| Filter doesn't find article contents | Filter only searches navigation labels | Add real search indexing separately |

### Inspect the actual generated nav

```powershell
Get-Content modules/ROOT/nav-generated.adoc
```

If output contains `* ` with no title or wrong grouping, fix the generator inputs or use manual nav. A CSS patch cannot supply the correct semantic taxonomy.

## Header links

| Symptom | Check |
|---|---|
| No top-right links | `site.keys.header_links_page`, page resource ID, missing `.adoc`, Antora warnings |
| Only Contact fallback | Header source page did not resolve; previous `contact_url` fallback active |
| Header links work on source page but break on deep article | `js/site.js` version and `data-header-source-url` markup |
| LinkedIn/GitHub goes to placeholder | Replace `YOUR_PROFILE`, `YOUR_USERNAME` in `.adoc` |
| Header links appear in sidebar | Add `:page-nav-exclude:` and use patched generator; or omit in manual nav |
| Change not visible after deploy | Rebuild + check static asset/browser caching and actual branch |

## Articles and layout

| Symptom | Check |
|---|---|
| Default layout does not display article | `layouts/default.hbs` still contains `{{{page.contents}}}` |
| Homepage is the wrong article | `site.start_page` points to another component/module/version |
| `Home / Garbage Collection` displayed on intended start page | Confirm that page is *site* start page and build uses latest layout |
| Image broken | File in matching module `assets/images/`; correct `image::` resource ID |
| Raw `.adoc` rather than formatted article | Wrong file placement/output URL, or serving source folder instead of built site |
| Mermaid source rendered as code | Mermaid integration not included by default in this UI |
| Highlight colors missing | Current theme styles code blocks; advanced syntax highlighting needs integration |

## Antora build errors

### `antora.yml` not found by generator

```text
ERROR: <path> does not contain antora.yml
```

You passed the wrong `--content-root`. If `docs/antora.yml` exists, use `--content-root docs`.

### `layouts/default.hbs` missing

You pointed `ui.bundle.url` at an **overlay ZIP**, not the full UI bundle. Use `engineering-portfolio-ui-adoc-header.zip` or a rebuilt ZIP with layout files at its archive root.

### Unresolved `xref`

Check the component name (`antora.yml:name`), module (`java` vs `ROOT`), version, and file coordinate (relative to `pages/`). Don't use generated `.html` file paths as xref resource IDs.

### `antora` command not recognized

Use `npm install` / `npx antora antora-playbook.yaml`, or install Antora using its official instructions. Ensure Node/npm versions are supported.

### `file://` navigation weirdness

Use a local HTTP server: `python -m http.server 8000 --directory build-output` and visit `http://localhost:8000/`.

## Investigation order (saves time)

1. Check the exact playbook path and output directory.
2. Confirm `antora.yml` and real article source paths.
3. Read generated `nav-generated.adoc` or manual `nav.adoc`.
4. Inspect produced HTML in browser DevTools: category text, link `href`, CSS request status, JS errors.
5. Hard refresh the browser.
6. Make **one change at a time**; rerun Antora.

## What to include when asking for help

Send `antora-playbook.yaml`, `antora.yml`, nav file, directory tree, exact CLI output, and a screenshot plus generated HTML fragment. **Redact** internal repository tokens or any private URLs/credentials first.
