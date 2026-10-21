# 00 — Project overview and terminology

## Purpose

The project turns a technical content repository into a developer portfolio and engineering library. An individual article is AsciiDoc, the site generator is Antora, and the custom UI controls the look and behavior of the output HTML.

**Use cases:** publish Java and low-level design (LLD) tutorials, high-level design (HLD) case studies, data-structure notes, distributed-systems write-ups, a résumé/contact page, and navigable documentation.

## What each piece does

| Item | Role | Edited for what? |
|---|---|---|
| `antora-playbook.yml` | Site orchestration | Site title, landing page, content Git sources, UI ZIP, output dir, header-link source, build extensions |
| `antora.yml` | Component version descriptor | Component name, version, and the list of each module's `nav.adoc` |
| `modules/<module>/nav.adoc` | That module's sidebar section | Links to **that module's own pages only** |
| `modules/<module>/pages/*.adoc` | Publishable articles | Your actual writing and links |
| `modules/headers/pages/header-links.adoc` | Header link list | Contact / LinkedIn / GitHub / Résumé entries |
| `lib/code-line-highlight.js` | Asciidoctor build extension | Enables `highlight=` on source blocks; registered in the playbook |
| `ui/*.zip` | Complete UI bundle | Styles and rendering for every generated page |
| `layouts/default.hbs` | Article layout | Documentation pages, header, sidebar, body, TOC |
| `layouts/portfolio.hbs` | Optional hero résumé layout | Special landing page |
| `layouts/fragment.hbs` | Bare-fragment layout | Pages embedded into other pages, such as the header links |
| `partials/nav-tree.hbs` | Navigation HTML | Sidebar links and expandable groups |
| `js/site.js` | Browser behaviour | Sidebar groups, filter, phone drawer, header links, TOC, code blocks, single-page navigation |
| `js/vendor/highlight.min.js` | Self-hosted syntax highlighter | Rarely; replaced wholesale when upgrading |
| `css/site.css` | Docs theme | Header, sidebar, article, code blocks, TOC, responsiveness |
| `css/portfolio.css` | Résumé theme | Optional portfolio homepage |
| `fonts/*.woff2` | Self-hosted Inter font | Only when changing typography |
| `img/profile-photo.png` | Header avatar and portfolio hero photo | Replacing your picture |

## Important terms

- **Site:** The entire Antora build. Can include many components and versions.
- **Component:** Logical documentation product or collection, identified by `name` in `antora.yml` (example: `gareeb-engineer`).
- **Version:** Version label for a component. Example: `v1.0`; for unversioned content use `~`.
- **Module:** Content area such as `ROOT`, `Java`, `Data-Structure`, `headers`.
- **Page resource ID:** An Antora logical reference, for example `v1.0@gareeb-engineer:Java:index.adoc`.
- **Site start page:** Article shown after the site's `/index.html` redirect; configured under `site.start_page`.
- **Navigation file:** AsciiDoc list of links registered in `antora.yml`. In this project every module owns exactly one.
- **UI bundle:** A ZIP with templates, CSS, JavaScript, fonts and images. It does not contain your live article text.
- **Build extension:** JavaScript registered under `asciidoc.extensions` in the playbook that runs during conversion.
- **Generated output:** HTML/CSS/JS produced by `antora`, here in `build-output/`.
- **Fragment page:** A page rendered without the surrounding HTML document so another page can embed its markup.
- **In-place navigation:** Replacing the article area without reloading the document, while still changing the address bar.

## Key rules

1. Creating `.adoc` publishes a page when the file is in an included content source, **but it does not appear in the sidebar until that module's `nav.adoc` links to it**.
2. **Each module owns its navigation.** A module's `nav.adoc` links only to pages inside that module, and `antora.yml` lists every module's `nav.adoc`. No module builds, scans or depends on another module's navigation.
3. Custom layout means HTML/CSS can change while your AsciiDoc syntax stays standard. Some conveniences are browser-side scripts rather than part of AsciiDoc conversion; they are listed in the table above.

Two options require cooperation between the content and the UI, so they are worth remembering:

| Option written in `.adoc` | Needs | Effect |
|---|---|---|
| `highlight=` on a source block | `lib/code-line-highlight.js` registered in the playbook | Marks specific code lines |
| `:page-layout: fragment` | `layouts/fragment.hbs` in the bundle | Page renders as bare markup for embedding |

## Where behaviour degrades gracefully

| Situation | Result |
|---|---|
| JavaScript disabled | Static pages, standard links, no drawer/code toolbar/in-place navigation |
| Opened from `file://` | Everything works except in-place navigation, which falls back to full page loads |
| Highlighter fails to load | Code blocks keep the dark theme, line numbers and Copy button, without colours |
| Page has a different layout or sidebar | In-place navigation falls back to a normal page load |

Next: [Quickstart](01-quickstart.md) · [Architecture](02-architecture.md).
