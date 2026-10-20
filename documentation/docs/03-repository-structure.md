# 03 — Repository and module structure

## Suggested production arrangement

```text
portfolio-antora/
├── antora-playbook.yaml         # Site build configuration
├── antora.yml                   # Component version metadata
├── package.json                 # Optional local Antora npm installation
├── package-lock.json            # Commit after npm install
├── .gitignore
├── .github/workflows/
│   └── deploy-antora.yml
├── tools/
│   └── generate_nav.py
├── ui/
│   └── engineering-portfolio-ui-adoc-header.zip
└── modules/
    ├── ROOT/
    │   ├── nav-generated.adoc   # Generated; registered only once
    │   ├── nav.adoc             # Optional manual nav
    │   ├── pages/
    │   │   ├── lld/
    │   │   │   ├── parking-lot.adoc
    │   │   │   └── rate-limiter.adoc
    │   │   └── hld/
    │   │       └── url-shortener.adoc
    │   └── assets/images/
    │       └── lld/parking-lot.png
    └── java/
        ├── pages/
        │   ├── index.adoc         # Example: Garbage Collection (site start)
        │   ├── header-links.adoc  # Header config page
        │   ├── contact.adoc
        │   └── garbage-collection/
        │       └── g1-gc.adoc
        └── assets/images/
            └── gc-flow.png
```

This is **one workable layout**, not the only legal Antora structure. The `antora.yml` file identifies the content source root; `modules/` is relative to that root.

## What goes where?

- `modules/<module>/pages/`: publishable `.adoc` pages; subdirectories organize page URLs.
- `modules/<module>/assets/images/`: article diagrams and screenshots, referenced through `image::` macros.
- `modules/<module>/attachments/`: downloadable article attachments (when needed).
- `modules/<module>/partials/`: reusable AsciiDoc fragments.
- `modules/<module>/examples/`: reusable sample source artifacts.
- `modules/<module>/nav.adoc`: manual navigation list. **Do not put navigation files inside `pages/`** unless you intend them to become published articles.
- `ui/`: packaged rendering theme used by Antora; independent from article images.
- `tools/`: prebuild helper scripts; not published as content.

## Module vs folder

A folder such as `modules/ROOT/pages/lld/` is still part of module `ROOT`; its xref is `ROOT:lld/parking-lot.adoc`. If you create the `modules/lld/` module instead, its page xref is `lld:parking-lot.adoc`. These are different resource IDs and should not be confused.

### Same-component examples

| Real source path | Antora resource ID |
|---|---|
| `modules/java/pages/index.adoc` | `java:index.adoc` |
| `modules/java/pages/contact.adoc` | `java:contact.adoc` |
| `modules/ROOT/pages/lld/parking-lot.adoc` | `ROOT:lld/parking-lot.adoc` |
| `modules/ROOT/pages/hld/url-shortener.adoc` | `ROOT:hld/url-shortener.adoc` |

Complete ID: `v1.0@gareeb-engineer:java:index.adoc`.

## When content lives inside `docs/`

If your Git repository contains:

```text
repo/
├── antora-playbook.yaml
├── tools/generate_nav.py
└── docs/
    ├── antora.yml
    └── modules/...
```

then the playbook's content-source entry needs `start_path: docs`, and Python uses `--content-root docs`. Both Antora and Python must point at the same **content root**.

## Multiple Git repositories

Antora can build content from several repositories. The Python generator in this kit only scans the one directory passed to it. If your article sources are remote, regenerate/commit their navigation **inside the source repository**, or use a manual nav committed there. Running Python in a separate site-build repo does not magically alter a remote Git branch.

Next: [Navigation](06-navigation.md) · [Config](04-configuration.md).
