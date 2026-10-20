# Engineering Portfolio — Antora Documentation

**Documentation for the custom Antora engineering portfolio UI, automatic article navigation, and AsciiDoc-driven top-right header links.**

This package is written for first-time maintainers, contributors, and future users. It documents the **latest working custom bundle** (`engineering-portfolio-ui-adoc-header.zip`), not Antora's official reference UI. The ZIP also includes a runnable example repository and the editable UI source.

> **Before you start:** If you have an existing live portfolio, back up your playbook, `antora.yml`, custom navigation files, and current UI bundle. Try the new setup on a development branch first. The example content should not overwrite real articles.

## Choose your path

| Your goal | Read |
|---|---|
| Get a working example running quickly | [Quickstart](docs/01-quickstart.md) |
| Understand how everything fits together | [Architecture](docs/02-architecture.md) |
| Arrange modules, content, and UI files | [Repository structure](docs/03-repository-structure.md) |
| Configure `antora-playbook.yaml` and `antora.yml` | [Configuration](docs/04-configuration.md) |
| Write LLD/HLD articles with diagrams and code | [Authoring articles](docs/05-writing-articles.md) |
| Auto-generate or manually organize the sidebar | [Navigation](docs/06-navigation.md) |
| Edit Contact, LinkedIn, GitHub, and Résumé links from AsciiDoc | [Dynamic header](docs/07-dynamic-header.md) |
| Set the homepage or switch between layouts | [Homepages and layouts](docs/08-homepages.md) |
| Change templates, CSS, JavaScript, or photo | [UI customization](docs/09-ui-customization.md) |
| Build and preview locally on Windows, WSL, or Linux | [Local development](docs/10-local-development.md) |
| Deploy using GitHub Actions and GitHub Pages | [CI/CD deployment](docs/11-github-actions.md) |
| Diagnose build, nav, links, UI, and path errors | [Troubleshooting](docs/12-troubleshooting.md) |
| Publish safely and maintain the site | [Maintenance](docs/13-maintenance.md) |
| Quickly look up commands and syntax | [Cheat sheet](docs/14-cheatsheet.md) |
| Read common questions and limits | [FAQ](docs/15-faq.md) |
| Contribute or onboard a teammate | [Contributing](docs/16-contributing.md) |

## Contents of this ZIP

```text
antora-portfolio-documentation/
├── README.md                         # Start here
├── docs/                             # 17 detailed Markdown guides
├── example-repository/               # Copyable Antora starter project
│   ├── antora-playbook.yaml
│   ├── antora.yml
│   ├── modules/
│   ├── tools/generate_nav.py
│   ├── ui/engineering-portfolio-ui-adoc-header.zip
│   └── .github/workflows/deploy-antora.yml
├── ui-source/                        # Unzipped, editable source of the same UI bundle
├── tools/build_ui_bundle.py          # Repackage changed UI source without extra dependencies
└── SOURCES.md                        # Official Antora / AsciiDoc references
```

## Quick command summary

From the `example-repository/` directory (or your own equivalent content root):

```powershell
python tools/generate_nav.py --content-root .
antora antora-playbook.yaml
python -m http.server 8000 --directory build-output
```

Open `http://localhost:8000/`. If `antora` is not globally installed, use `npx antora antora-playbook.yaml` after installing the project dependencies. On Windows, `py -3` can replace `python`.

**Important boundaries:** The sidebar search box **filters navigation links**, not article contents. The current Python generator **does not build unlimited nested topic hierarchies**. The custom UI does not automatically provide all of the official Antora reference UI's extras (full-text search, Mermaid renderer, tabs, syntax-highlighting libraries, version selectors, etc.). See the respective guides before assuming those features are present.

## Version and status

- Prepared: October 2026.
- Contents inspected against the delivered `engineering-portfolio-ui-adoc-header.zip` and its generator.
- Examples were tested for file layout and Python generator behavior. **The full example Antora build has not been run in this environment**; validate with your installed Antora before publishing.
- Replace placeholder GitHub, LinkedIn, website, and email values before making your site public.

## Documentation principles

1. Content lives in `.adoc` files.
2. Component metadata and navigation-file registration live in `antora.yml`.
3. Site configuration and UI-bundle location live in `antora-playbook.yaml` (or `.yml`).
4. Page design lives in Handlebars templates and CSS, not copied into every article.
5. The optional navigation generator runs **before** Antora.
6. The header links are controlled by a published but usually unlisted AsciiDoc page.

This is a community-created custom integration, not an official Antora product or Amazon-branded website.
