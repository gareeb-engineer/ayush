# 03 — Repository and module structure

## The arrangement used by this project

```text
portfolio-anotra/
├── antora-playbook.yml              # Site build configuration
├── lib/
│   └── code-line-highlight.js       # Build extension for highlight= on code blocks
├── ui/
│   └── engineering-portfolio-ui-header-fragment-fix.zip
├── build-output/                    # Generated; not committed
├── .github/workflows/
│   └── deploy.yml
├── documentation/                   # This kit
└── gareeb-engineer/                 # Content root: holds antora.yml
    ├── antora.yml                   # Component metadata + list of every module's nav.adoc
    └── modules/
        ├── ROOT/
        │   ├── pages/
        │   │   └── index.adoc       # Landing page with the card grid
        │   └── assets/images/
        │       └── banner.png
        ├── headers/                 # No nav.adoc: reached from the header, not the sidebar
        │   └── pages/
        │       ├── header-links.adoc   # Header link list (fragment layout)
        │       └── contact.adoc
        ├── Java/
        │   ├── nav.adoc             # Links only to Java pages
        │   ├── pages/index.adoc
        │   └── assets/images/Garbage-Collection.png
        ├── Data-Structure/
        │   ├── nav.adoc             # Links only to Data-Structure pages
        │   └── pages/
        │       ├── index.adoc
        │       ├── arrays/index.adoc
        │       └── recursion/
        │           ├── index.adoc
        │           ├── sum-of-all-element.adoc
        │           └── all-indices-of-array.adoc
        ├── Arcitecture-diagram/
        │   ├── nav.adoc
        │   └── pages/index.adoc
        └── DevOps-Refs/
            ├── nav.adoc
            └── pages/index.adoc
```

Two details specific to this repository:

- The content root is **`gareeb-engineer/`**, not the repository root. The playbook therefore sets `start_path: ./gareeb-engineer/`.
- `lib/` and `ui/` live at the **repository root**, outside the content root, because they are build inputs rather than content. The playbook paths are relative to the playbook file.

This is one workable layout, not the only legal Antora structure.

## One module, one nav file

Every content module carries its own `nav.adoc` next to its `pages/` directory, and that file links **only to pages in the same module**. `antora.yml` lists them:

```yaml
nav:
- modules/Java/nav.adoc
- modules/Arcitecture-diagram/nav.adoc
- modules/DevOps-Refs/nav.adoc
- modules/Data-Structure/nav.adoc
```

The benefits are practical:

- A module can be added, renamed or removed by touching only its own folder and one line in `antora.yml`.
- A page can reach the sidebar in exactly one way, so duplicates cannot creep in.
- No module needs to know about any other module's pages.

Modules that should not appear in the sidebar, such as `headers`, simply have no `nav.adoc` and no entry under `nav:`.

## What goes where?

- `modules/<module>/pages/`: publishable `.adoc` pages; subdirectories organize page URLs.
- `modules/<module>/nav.adoc`: that module's sidebar section. **Keep navigation files outside `pages/`**, otherwise they are published as articles too.
- `modules/<module>/assets/images/`: article diagrams and screenshots, referenced through `image::` macros.
- `modules/<module>/attachments/`: downloadable article attachments.
- `modules/<module>/partials/`: reusable AsciiDoc fragments.
- `modules/<module>/examples/`: reusable sample source artifacts.
- `ui/`: packaged rendering theme used by Antora; independent from article images.
- `lib/`: Asciidoctor build extensions registered in the playbook.

## Why a separate `headers` module?

`header-links.adoc` is configuration that happens to be written in AsciiDoc. Keeping it in its own module:

- makes its resource ID stable and obvious (`headers:header-links.adoc`),
- keeps it out of the sidebar without any special attribute, because the module has no `nav.adoc`,
- groups it with the `contact.adoc` page it points at.

It is still a published page. Anyone who knows the URL can open it, so do not put private data in it.

## Module vs folder

A folder such as `modules/Data-Structure/pages/recursion/` is still part of module `Data-Structure`; its xref is `Data-Structure:recursion/index.adoc`, and inside `Data-Structure/nav.adoc` it is simply `recursion/index.adoc`. If you created a `modules/recursion/` module instead, the xref would be `recursion:index.adoc` and it would need its own `nav.adoc`. These are different resource IDs and should not be confused.

### Resource ID examples from this repository

| Real source path | Antora resource ID |
|---|---|
| `modules/ROOT/pages/index.adoc` | `ROOT:index.adoc` |
| `modules/Java/pages/index.adoc` | `Java:index.adoc` |
| `modules/headers/pages/header-links.adoc` | `headers:header-links.adoc` |
| `modules/headers/pages/contact.adoc` | `headers:contact.adoc` |
| `modules/Data-Structure/pages/index.adoc` | `Data-Structure:index.adoc` |
| `modules/Data-Structure/pages/recursion/sum-of-all-element.adoc` | `Data-Structure:recursion/sum-of-all-element.adoc` |

Fully qualified: `v1.0@gareeb-engineer:Java:index.adoc`.

Inside a module's own `nav.adoc` you drop the module prefix: `xref:recursion/index.adoc[]`, not `xref:Data-Structure:recursion/index.adoc[]`. A module prefix in a nav file is a sign that it is reaching into another module.

Module names here are **case-sensitive and mixed-case** (`Java`, `Data-Structure`, `Arcitecture-diagram`). Copy them exactly; `java:index.adoc` will not resolve.

> `Arcitecture-diagram` is misspelled in the source tree. Renaming the directory changes every published URL under it and every xref that targets it, so it has been left as-is deliberately. Fix it only alongside redirects.

## Where ROOT pages are published

Pages in the `ROOT` module are published at the component version root, **without** a `ROOT/` path segment:

| Source | Published URL |
|---|---|
| `modules/ROOT/pages/index.adoc` | `/gareeb-engineer/v1.0/index.html` |
| `modules/Java/pages/index.adoc` | `/gareeb-engineer/v1.0/Java/index.html` |
| `modules/headers/pages/contact.adoc` | `/gareeb-engineer/v1.0/headers/contact.html` |

Do not assume a page failed to build because you looked for it under a `ROOT/` directory.

## When content lives inside a subdirectory

This repository already does this. The playbook declares:

```yaml
content:
  sources:
    - url: .
      branches: HEAD
      start_path: ./gareeb-engineer/
```

The `nav:` paths in `antora.yml` are relative to that content root, which is why they start with `modules/`.

## Multiple Git repositories

Antora can build content from several repositories, each with its own `antora.yml`. Each repository keeps its modules' `nav.adoc` files alongside its own pages, so per-module navigation works the same way across repositories.

Next: [Navigation](06-navigation.md) · [Config](04-configuration.md).
