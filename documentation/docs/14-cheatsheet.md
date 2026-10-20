# 14 — Command and syntax cheat sheet

## Common shell commands

```powershell
# Generate navigation (content root is repo root)
python tools/generate_nav.py --content-root .

# Content root under docs/
python tools/generate_nav.py --content-root docs

# Build with your real playbook filename
antora antora-playbook.yaml

# Alternative local Antora installed through npm
npx antora antora-playbook.yaml

# Serve local site
python -m http.server 8000 --directory build-output
```

## AsciiDoc cheats

```asciidoc
= Page Title
:page-navtitle: Sidebar Text
:page-layout: default
:sectnums:

== Heading
=== Subheading

* Bullet
. Numbered item

NOTE: Note text.

[source,java]
----
System.out.println("Hello, world");
----

image::diagram.png[Architecture diagram]

xref:java:contact.adoc[Contact]
https://docs.antora.org[Antora docs]
```

## YAML keys

```yaml
# antora.yml
name: gareeb-engineer
version: v1.0
title: Engineering Library
nav:
  - modules/ROOT/nav-generated.adoc
```

```yaml
# Merge into your playbook's site:
site:
  start_page: v1.0@gareeb-engineer:java:index.adoc
  keys:
    header_links_page: 'gareeb-engineer:java:header-links.adoc'

# Merge into ui:
ui:
  bundle:
    url: ./ui/engineering-portfolio-ui-adoc-header.zip
```

## Page reference examples

| Where | Reference |
|---|---|
| Module Java `pages/index.adoc` | `java:index.adoc` |
| Module ROOT `pages/lld/parking-lot.adoc` | `ROOT:lld/parking-lot.adoc` |
| Explicit component | `gareeb-engineer:java:index.adoc` |
| Explicit version | `v1.0@gareeb-engineer:java:index.adoc` |

## Header link example

```asciidoc
= Header Navigation
:page-nav-exclude:

[.header-menu-links]
* xref:contact.adoc[Contact]
* https://www.linkedin.com/in/YOUR_PROFILE/[LinkedIn]
* https://github.com/YOUR_USERNAME[GitHub]
```

## Manual nav example

```asciidoc
* Java
** xref:java:index.adoc[Garbage Collection]
* Low-Level Design
** xref:ROOT:lld/parking-lot.adoc[Parking Lot]
```

## UI packaging

```powershell
python tools/build_ui_bundle.py --source ui-source --output example-repository/ui/engineering-portfolio-ui-adoc-header.zip
```

## Rule of thumb

| You changed | Run navigation script? | Rebuild Antora? | Rebuild UI ZIP? |
|---|---|---|---|
| Existing article text | No | Yes | No |
| New/renamed/deleted article + auto nav | Yes | Yes | No |
| Header links list only | No | Yes | No |
| CSS / JS / `.hbs` template | No | Yes | **Yes** |
| `antora.yml` nav registration | Usually no | Yes | No |
| `site.start_page` | No | Yes | No |

See [Quickstart](01-quickstart.md) for context.
