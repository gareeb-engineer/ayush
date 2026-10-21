# Engineering Portfolio — Antora Documentation

**Documentation for the custom Antora engineering portfolio UI: AsciiDoc-driven header links, per-module sidebar navigation, dark code blocks, a mobile navigation drawer, and single-page navigation between articles.**

This package is written for first-time maintainers, contributors, and future users. It documents the **current working custom bundle** (`engineering-portfolio-ui-header-fragment-fix.zip`), not Antora's official reference UI. The kit also includes a runnable example repository and the editable UI source.

> **Before you start:** If you have an existing live portfolio, back up your playbook, `antora.yml`, custom navigation files, and current UI bundle. Try the new setup on a development branch first. The example content should not overwrite real articles.

## Choose your path

| Your goal | Read |
|---|---|
| Get a working example running quickly | [Quickstart](docs/01-quickstart.md) |
| Understand how everything fits together | [Architecture](docs/02-architecture.md) |
| Arrange modules, content, and UI files | [Repository structure](docs/03-repository-structure.md) |
| Configure `antora-playbook.yml` and `antora.yml` | [Configuration](docs/04-configuration.md) |
| Write LLD/HLD articles with diagrams and code | [Authoring articles](docs/05-writing-articles.md) |
| Organize the sidebar with one `nav.adoc` per module | [Navigation](docs/06-navigation.md) |
| Edit Contact, LinkedIn, GitHub, and Résumé links from AsciiDoc | [Dynamic header](docs/07-dynamic-header.md) |
| Set the homepage, landing-page cards, or switch layouts | [Homepages and layouts](docs/08-homepages.md) |
| Change templates, CSS, JavaScript, fonts, or photo | [UI customization](docs/09-ui-customization.md) |
| Build and preview locally on Windows, WSL, or Linux | [Local development](docs/10-local-development.md) |
| Deploy using GitHub Actions and GitHub Pages | [CI/CD deployment](docs/11-github-actions.md) |
| Diagnose build, nav, link, UI, and path errors | [Troubleshooting](docs/12-troubleshooting.md) |
| Publish safely and maintain the site | [Maintenance](docs/13-maintenance.md) |
| Quickly look up commands and syntax | [Cheat sheet](docs/14-cheatsheet.md) |
| Read common questions and limits | [FAQ](docs/15-faq.md) |
| Contribute or onboard a teammate | [Contributing](docs/16-contributing.md) |
| Style code samples: line numbers, highlighting, Copy | [Code blocks](docs/17-code-blocks.md) |
| Understand phone and tablet behaviour | [Mobile and responsive](docs/18-mobile-and-responsive.md) |
| Understand in-place page swapping and the progress bar | [Single-page navigation](docs/19-single-page-navigation.md) |

## Contents of this kit

```text
documentation/
├── README.md                         # Start here
├── docs/                             # 20 detailed Markdown guides
├── example-repository/               # Copyable Antora starter project (build-verified)
│   ├── antora-playbook.yaml
│   ├── antora.yml
│   ├── lib/code-line-highlight.js
│   ├── modules/                  # each module carries its own nav.adoc
│   ├── ui/engineering-portfolio-ui-header-fragment-fix.zip
│   └── .github/workflows/deploy-antora.yml
├── ui-source/                        # Unzipped, editable source of the live UI bundle
├── tools/build_ui_bundle.py          # Repackage changed UI source without extra dependencies
├── CHANGELOG.md
└── SOURCES.md                        # Official Antora / AsciiDoc references and licences
```

## Quick command summary

From the directory holding your playbook:

```powershell
antora antora-playbook.yml
python -m http.server 8000 --directory build-output
```

Open `http://localhost:8000/`. If `antora` is not globally installed, use `npx antora antora-playbook.yml` after installing the project dependencies. On Windows, `py -3` can replace `python`.

**Preview over HTTP, not by double-clicking the HTML.** Single-page navigation only activates on `http://` or `https://`; from a `file://` path each click does a normal full page load instead. Everything else looks and works the same.

## What this UI provides

| Feature | Where it is documented |
|---|---|
| Top-right header links written in AsciiDoc | [07](docs/07-dynamic-header.md) |
| Collapsible sidebar with filter box, fixed while the article scrolls | [06](docs/06-navigation.md), [09](docs/09-ui-customization.md) |
| Dark code blocks: language label, Copy, Open, line numbers, line highlighting, syntax colours | [17](docs/17-code-blocks.md) |
| Landing-page card grid and optional centred page title | [08](docs/08-homepages.md) |
| Phone drawer navigation, 44px tap targets, tap-to-zoom diagrams | [18](docs/18-mobile-and-responsive.md) |
| In-place page swapping with a top progress bar | [19](docs/19-single-page-navigation.md) |
| Self-hosted Inter font and self-hosted syntax highlighter (no third-party requests) | [09](docs/09-ui-customization.md) |

## Known boundaries

- The sidebar search box **filters navigation labels**, not article text. Full-text search needs a separate service or extension.
- The sidebar shows only what each module's `nav.adoc` lists. Adding a `.adoc` file publishes it, but you still add its `xref:` line to that module's nav yourself.
- Syntax highlighting is included and self-hosted, but **Mermaid diagram rendering, tabbed blocks, theme switching, and version-selector dropdowns are not**.
- The portfolio hero layout keeps much of its wording inside the template, not in `index.adoc`.

See the linked guides before assuming a feature is present.

## Version and status

- Documentation revised: **October 2026**.
- Verified against **Antora 3.1.10**, Node 22, Python 3.
- Live UI bundle: `engineering-portfolio-ui-header-fragment-fix.zip` — `css/site.css?v=18`, `js/site.js?v=13`.
- `ui-source/` is byte-identical to the shipped bundle: repackaging it with `tools/build_ui_bundle.py` reproduces the same archive contents.
- The example repository has been **built successfully** in this environment (7 article pages plus the root redirect, no Antora warnings, 5 sidebar links with no duplicates).
- Browser behaviour was verified in headless Chromium/Edge at laptop and phone viewport sizes. **Not yet verified on real iOS/Android devices, Firefox, or Safari.**
- Replace placeholder GitHub, LinkedIn, website, and email values before making your site public.

## Documentation principles

1. Content lives in `.adoc` files.
2. Each module owns its navigation in its own `nav.adoc`, linking only to its own pages; `antora.yml` lists every module's nav file.
3. Site configuration, UI-bundle location and build extensions live in `antora-playbook.yml`.
4. Page design lives in Handlebars templates and CSS, not copied into every article.
5. There is no pre-build step: `antora` is the whole build.
6. The header links are controlled by a published AsciiDoc page in a module that has no `nav.adoc`.
7. Browser-side features degrade to plain static pages when JavaScript or `fetch` is unavailable.

This is a community-created custom integration, not an official Antora product or Amazon-branded website.
