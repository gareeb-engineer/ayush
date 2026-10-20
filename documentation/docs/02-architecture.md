# 02 — How the system works

## Build pipeline

```text
.adoc articles   antora.yml    antora-playbook.yaml    UI bundle ZIP
      |               |                 |                  |
      +---------------+-----------------+------------------+
                              |
             [optional] Python generate_nav.py
                              | creates nav-generated.adoc
                              v
                         Antora CLI
                 resolves modules + xrefs
                  converts AsciiDoc to HTML
                  renders Handlebars layouts
                              |
                              v
                   build-output/ (static site)
                              |
                 GitHub Pages / HTTP server
```

The Python script **does not render HTML**, and the UI ZIP **does not discover articles**. Antora joins those inputs during a build.

## Page rendering

- Standard article without a `:page-layout:` override → `layouts/default.hbs`.
- Article with `:page-layout: portfolio` → `layouts/portfolio.hbs` (hero-style portfolio, mostly hardcoded HTML content in the UI layout).
- `default.hbs` inserts `page.contents`, sidebar navigation from `page.navigation`, and an optional breadcrumb/next/previous section.
- Browser JS builds the small right-side heading list from `h2`/`h3` elements and manages sidebar accordions and filtering.

## Header links flow

```text
modules/java/pages/header-links.adoc
  -> Antora converts its AsciiDoc list to HTML
  -> site.keys.header_links_page references that page
  -> layouts/default.hbs and portfolio.hbs resolve its page model
  -> the HTML list is embedded in the top-right navbar
  -> js/site.js adjusts relative internal URLs for nested pages
```

You manage the list in the `.adoc` file. You **do not edit CSS every time you add LinkedIn or Contact**. You do need to rebuild Antora so the new static HTML is published.

## Sidebar flow

```text
modules/*/pages/*.adoc
      |                              OR manual nav.adoc
Python generate_nav.py                         |
      |                                        |
modules/ROOT/nav-generated.adoc               |
      +----------------+-----------------------+
                       |
     antora.yml nav: lists registered file(s)
                       |
              Antora page.navigation
                       |
               partials/nav-tree.hbs
                       |
       js/site.js adds expand/collapse/filter
```

In this bundle, a labeled navigation item **without a URL** and with children becomes an expandable button; items with URLs become clickable links. Empty/unlabeled parents can trigger confusing labels; prefer explicit headings in navigation files.

## Source of truth and safe edits

| Want to change... | Edit... |
|---|---|
| Body of a Java article | `modules/java/pages/<file>.adoc` |
| New backend design article | `.adoc` in your chosen module/folder |
| Header links | `header-links.adoc` |
| Sidebar categories/order | Manual `nav.adoc`, or generator's grouping rules |
| Component name / docs version | `antora.yml` |
| Site root article | `site.start_page` in playbook |
| Logo text, fixed hero copy, footer text | `.hbs` layout source and repackage UI |
| Navbar and sidebar CSS | `css/site.css`, then repackage UI |
| Hover/accordion behavior | `js/site.js`, then repackage UI |

Next: [Config](04-configuration.md) · [UI customization](09-ui-customization.md).
