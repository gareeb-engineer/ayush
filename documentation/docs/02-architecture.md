# 02 — How the system works

## Build pipeline

```text
.adoc articles   per-module nav.adoc   antora.yml   antora-playbook.yml   UI bundle ZIP   lib/*.js
      |                 |                  |               |                   |            |
      +-----------------+------------------+---------------+-------------------+------------+
                              |
                              v
                         Antora CLI
                 resolves modules + xrefs
                  runs registered extensions
                  converts AsciiDoc to HTML
                  renders Handlebars layouts
                              |
                              v
                   build-output/ (static site)
                              |
                 GitHub Pages / HTTP server
                              |
                   browser runs js/site.js
         (code blocks, drawer, in-place navigation)
```

There is **no pre-build step**: running `antora` is the whole build. The UI ZIP **does not discover articles** and the nav files **do not render HTML**; Antora joins those inputs. A third category — browser-side behaviour — happens after delivery and is described at the bottom of this page.

## Page rendering

| Article declares | Layout used | Result |
|---|---|---|
| nothing, or `:page-layout: default` | `layouts/default.hbs` | Header, sidebar, article, right-hand TOC, pagination |
| `:page-layout: portfolio` | `layouts/portfolio.hbs` | Hero-style portfolio page, wording largely inside the template |
| `:page-layout: fragment` | `layouts/fragment.hbs` | Bare markup with no surrounding document |

`default.hbs` inserts `page.contents`, builds the sidebar from `page.navigation`, and renders breadcrumbs plus next/previous links when Antora supplies them.

### Why a fragment layout exists

The header links are an ordinary page whose HTML is embedded into every other page. Antora composes pages in one pass and **replaces each page's `contents` with the fully wrapped document as it goes**, in an order that is not guaranteed. A page embedding another page can therefore receive either the raw fragment or a complete `<html>` document, depending on which was processed first.

`:page-layout: fragment` removes the ambiguity: that page's output is only ever the fragment, so embedding it is safe regardless of processing order.

```text
without fragment layout                with fragment layout
----------------------                 --------------------
header-links.html = full document      header-links.html = <div class="ulist">...</div>
embedded result   = nested <html>      embedded result   = the list only
```

## Header links flow

```text
modules/headers/pages/header-links.adoc   (:page-layout: fragment, :page-nav-exclude:)
  -> Antora converts its AsciiDoc list to HTML
  -> site.keys.header_links_page references that page
  -> default.hbs and portfolio.hbs resolve its page model with the resolvePage helper
  -> the HTML list is embedded in the top-right navbar
  -> js/site.js rewrites relative links to absolute, so they work from any page depth
  -> on phones the same links are copied into the navigation drawer
```

You manage the list in the `.adoc` file. You **do not edit CSS every time you add LinkedIn or Contact**. You do need to rebuild Antora so the new static HTML is published.

## Sidebar flow

```text
modules/Java/nav.adoc            -> links to modules/Java/pages/*            only
modules/Data-Structure/nav.adoc  -> links to modules/Data-Structure/pages/*  only
modules/<other>/nav.adoc         -> links to modules/<other>/pages/*         only
          |
antora.yml  nav:  lists each module's nav.adoc, in sidebar order
          |
Antora page.navigation  (one group per registered nav.adoc)
          |
partials/nav-tree.hbs
          |
js/site.js adds expand/collapse/filter, marks the current page,
and keeps the panel fixed while the article scrolls
```

Every module is independent: adding, removing or reorganising one module touches only that module's folder and one line in `antora.yml`. Nothing scans across modules, so a page can only appear in the sidebar through its own module's nav file.

A labelled navigation item **without a URL** and with children becomes an expandable button; items with URLs become clickable links. See [Navigation](06-navigation.md) for how group labels are chosen.

## Code block flow

```text
[source,java,highlight=10..12]
      |
lib/code-line-highlight.js  (registered under asciidoc.extensions)
      | converts highlight= into hl-10-12 roles on the block
      v
Antora writes <div class="listingblock hl-10-12">
      |
js/site.js reads those classes and builds the dark card:
  language label, Copy, Open, line numbers, highlighted lines
      |
js/vendor/highlight.min.js adds syntax colours
  (downloaded once per visit, only on pages containing code)
```

Asciidoctor applies `highlight` itself only for build-time highlighters, which is why the small extension is needed here. Full detail in [Code blocks](17-code-blocks.md).

## Browser-side behaviour

These run from `js/site.js` after the page is delivered. Each one degrades to plain static behaviour if scripting is unavailable.

| Behaviour | Notes |
|---|---|
| Sidebar groups, current-page marking, filter box | Pure DOM work |
| Right-hand "On this page" list | Built from `h2`/`h3` elements |
| Phone navigation drawer | Only below the phone breakpoint; see [18](18-mobile-and-responsive.md) |
| Code block toolbars and highlighting | Highlighter fetched lazily and reused |
| In-place page navigation and progress bar | Only over `http(s)`; see [19](19-single-page-navigation.md) |
| Header link rewriting | Makes embedded relative links depth-safe |

## Source of truth and safe edits

| Want to change... | Edit... |
|---|---|
| Body of an article | `modules/<module>/pages/<file>.adoc` |
| New design or notes article | `.adoc` in your chosen module/folder |
| Header links | `header-links.adoc` |
| A module's sidebar entries/order | That module's `nav.adoc` |
| Order of modules in the sidebar | Order of entries under `nav:` in `antora.yml` |
| Which code lines are highlighted | `highlight=` on the source block |
| Component name / docs version | `antora.yml` |
| Site root article | `site.start_page` in the playbook |
| Build extensions | `asciidoc.extensions` in the playbook |
| Logo text, fixed hero copy, footer text | `.hbs` layout source, then repackage the UI |
| Navbar, sidebar, code block CSS | `css/site.css`, then repackage the UI |
| Drawer, code block or navigation behaviour | `js/site.js`, then repackage the UI |
| Body/heading typeface | `fonts/` plus the `@font-face` rule in `css/site.css`, then repackage |

Next: [Config](04-configuration.md) · [UI customization](09-ui-customization.md).
