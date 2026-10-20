# 09 — Customize the complete UI bundle

## Contents of the actual bundle

```text
engineering-portfolio-ui-adoc-header.zip
├── .nojekyll
├── ui.yml
├── layouts/
│   ├── default.hbs
│   ├── portfolio.hbs
│   └── 404.hbs
├── partials/nav-tree.hbs
├── css/
│   ├── site.css
│   └── portfolio.css
├── js/site.js
└── img/profile-photo.png
```

This ZIP is a **complete standalone UI bundle**. Do not confuse it with the earlier `supplemental-ui/` overlay, which was not standalone. The ZIP has **no extra top-level containing folder**; Antora expects `layouts/default.hbs` at the ZIP root.

## Recommended edit process

1. Use the included **`ui-source/` directory**, or unzip the existing bundle into a separate directory.
2. Edit a layout, partial, CSS, JS, or image.
3. Build a replacement ZIP from the source files:

   ```powershell
   python tools/build_ui_bundle.py --source ui-source --output example-repository/ui/engineering-portfolio-ui-adoc-header.zip
   ```

   The script is in the **documentation kit root**; adjust the paths if you're working from another directory.

4. Point your site playbook to the rebuilt ZIP.
5. Run `antora antora-playbook.yaml`, preview, and hard-refresh (`Ctrl+Shift+R`).
6. Commit source files *and* new bundle together if your workflow uses a checked-in ZIP.

## Which UI files control each area?

| Visible area | File |
|---|---|
| Documentation header | `layouts/default.hbs`, `css/site.css` |
| Top-right AsciiDoc links | Both layouts, `css/site.css`, `css/portfolio.css`, `js/site.js` |
| Sidebar group markup | `partials/nav-tree.hbs` |
| Collapsible sidebar / filter | `js/site.js`, `css/site.css` |
| Article body + breadcrumbs | `layouts/default.hbs`, `css/site.css` |
| Right-hand heading list | `js/site.js`, `css/site.css` |
| Portfolio hero and profile image | `layouts/portfolio.hbs`, `css/portfolio.css`, `img/profile-photo.png` |
| Footer copyright and text | Layout files |

## Avoid regressions

- **Do not casually switch back** to native `<details>`/`<summary>` navigation: earlier versions had disappearing parent labels in closed state.
- Keep category labels in `<span class="nav-label">` and clickable child article URLs as `<a href=...>`.
- Preserve responsive header behavior and link rebasing in `site.js`.
- Preserve `{{{page.contents}}}` inside `default.hbs`, otherwise actual article content disappears.
- Prefer `{{{relativize url}}}` / Antora helpers over hardcoded absolute or root-relative links.
- If you modify the header-links HTML wrapper, make sure JS selector `.header-adoc-nav[data-header-source-url]` still matches.

## Why do I still see old CSS after changing the ZIP?

Static assets can be cached. The current layout URLs include a `?v=7` query parameter. After major CSS/JS changes you can increment the version in both layouts (e.g. `?v=8`), rebuild, and redeploy. Locally also hard-refresh or use a private window.

## Features NOT bundled by default

This is a lightweight custom UI, not a complete clone of Antora's reference UI. Confirm and integrate separately if you require **full-text search, client-side Mermaid rendering, tabs, advanced syntax-highlighting JavaScript, theme switching, built-in component/version dropdown menus** or other plugins. Basic AsciiDoc source-block HTML still renders and is styled with CSS.

## Where to customize brand details

Change personal name, employer, fixed experience copy, or footer in the `.hbs` templates; those are currently presentation strings in the UI source. For external links use `header-links.adoc` instead so you don't have to package on every change.

Next: [Development](10-local-development.md) · [Troubleshooting](12-troubleshooting.md).
