# 04 — Configure the playbook and component

Antora has two separate YAML responsibilities. Do not combine them.

## A. `antora-playbook.yaml` — site settings

Example matching your current path pattern:

```yaml
site:
  title: Ayush Nigam | Engineering Portfolio
  # For GitHub project Pages include /REPO_NAME here:
  # url: https://YOUR_USERNAME.github.io/YOUR_REPO
  start_page: v1.0@gareeb-engineer:java:index.adoc
  keys:
    header_links_page: 'gareeb-engineer:java:header-links.adoc'
content:
  sources:
    - url: .
      branches: HEAD
ui:
  bundle:
    url: ./ui/engineering-portfolio-ui-adoc-header.zip
    snapshot: true
output:
  dir: ./build-output
```

Keep your existing `site.url` if you already have one. Set it to the final **published base URL** before deploying, especially when GitHub Pages uses a repository subpath.

| Setting | Meaning |
|---|---|
| `site.title` | Global site title; also displayed in the current default layout header |
| `site.url` | Public base URL; include repository subpath when applicable |
| `site.start_page` | Article that the site root redirects to; full version@component:module:file form is safest |
| `site.keys.header_links_page` | Source page used for top-right links; supports Antora page reference IDs |
| `site.keys.contact_url` | Optional old-style fallback single Contact URL when header page cannot be resolved |
| `content.sources[].url` | Content Git repository; `.` for local worktree |
| `content.sources[].branches` | Branch selector; `HEAD` means current local worktree branch |
| `content.sources[].start_path` | Directory within the repository containing `antora.yml`, e.g. `docs` |
| `ui.bundle.url` | Complete custom UI ZIP (not the old supplemental overlay ZIP) |
| `output.dir` | Where the generated HTML is written |

### No duplicate YAML keys

Do not add a second `site:` or `ui:` block. Merge properties into the existing block; duplicate YAML keys may override each other or fail validation.

### `site.keys` camelCase detail

Antora converts underscores and hyphens into camelCase in the Handlebars UI model. Thus `header_links_page` in YAML is accessed as `site.keys.headerLinksPage` in the template. This is intentional.

## B. `antora.yml` — component version metadata

Example at your **content root**:

```yaml
name: gareeb-engineer
version: v1.0
title: Engineering Library
nav:
  - modules/ROOT/nav-generated.adoc
```

- `name` must match `gareeb-engineer` in your page reference IDs.
- `version` can be `v1.0`, another version, or `~` for unversioned.
- `nav` lists navigation file paths. You may register multiple entries, but duplicates will show duplicated menu items.
- The manual alternative is `modules/ROOT/nav.adoc`. Choose auto or manual initially; adding both is valid only if you intentionally avoid duplicate links.

### Two types of start pages

- `site.start_page` (playbook) = **whole website** root.
- `start_page` (component descriptor) = **component version** start page.

Don't assume setting one always replaces the other.

## C. Make Garbage Collection the website landing page

For the article at `modules/java/pages/index.adoc` and `antora.yml` name `gareeb-engineer`, version `v1.0`:

```yaml
site:
  start_page: v1.0@gareeb-engineer:java:index.adoc
```

The generated site root typically contains a redirect to the article's published URL (e.g. `/gareeb-engineer/v1.0/java/index.html`); don't move that page's HTML manually.

## D. Local Git content vs remote content

**Local**:

```yaml
content:
  sources:
    - url: .
      branches: HEAD
```

**Content under docs/**:

```yaml
content:
  sources:
    - url: .
      branches: HEAD
      start_path: docs
```

**Remote**:

```yaml
content:
  sources:
    - url: https://github.com/YOUR_ORG/YOUR_REPO.git
      branches: main
```

Local builds use local modifications when the worktree matches the branch selection. Remote builds generally use what is committed and available remotely; do not expect an uncommitted generated nav file from your laptop to appear there.

## E. Diagnostic commands

```powershell
antora --version
antora antora-playbook.yaml
```

Review Antora warnings, especially unresolved xrefs and missing navigation files.

Next: [Dynamic header](07-dynamic-header.md) · [Homepages](08-homepages.md).
