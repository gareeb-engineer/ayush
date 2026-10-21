# 04 — Configure the playbook and component

Antora has two separate YAML responsibilities. Do not combine them.

| File | Scope | Lives at |
|---|---|---|
| `antora-playbook.yml` | The whole site: where content comes from, which UI, which extensions, where output goes | Repository root |
| `antora.yml` | One component version: its name, version, and which nav files it contributes | Content root (`gareeb-engineer/`) |

## A. `antora-playbook.yml` — site settings

This is the live playbook for this project:

```yaml
site:
  title: Ayush Nigam
  start_page: gareeb-engineer::index.adoc
  url: https://gareeb-engineer.github.io/ayush
  keys:
    header_links_page: 'gareeb-engineer:headers:header-links.adoc'

content:
  sources:
    - url: .
      branches: HEAD
      start_path: ./gareeb-engineer/
ui:
  bundle:
    url: ./ui/engineering-portfolio-ui-header-fragment-fix.zip
    snapshot: true

asciidoc:
  extensions:
    # Enables [source,java,highlight=10] line highlighting in code blocks.
    - ./lib/code-line-highlight.js

output:
  dir: ./build-output
```

| Setting | Meaning |
|---|---|
| `site.title` | Global site title; shown next to the logo and in browser tab titles |
| `site.url` | Public base URL, **including** the repository subpath for GitHub project pages (`/ayush` here). Also used for the 404 page's "return" link |
| `site.start_page` | Page the site root redirects to. `gareeb-engineer::index.adoc` means component `gareeb-engineer`, default module `ROOT`, latest version |
| `site.keys.header_links_page` | Page whose AsciiDoc list becomes the top-right header links. See [07](07-dynamic-header.md) |
| `site.keys.contact_url` | Optional fallback single Contact link, used only if the header page cannot be resolved |
| `content.sources[].url` | Content Git repository; `.` means this repository's local worktree |
| `content.sources[].branches` | Branch selector; `HEAD` means whatever branch is checked out |
| `content.sources[].start_path` | Directory inside the repository holding `antora.yml`. Here `./gareeb-engineer/` |
| `ui.bundle.url` | Complete custom UI ZIP. Relative to the playbook |
| `ui.bundle.snapshot` | `true` makes Antora re-read the ZIP every build instead of caching it. Keep it on for a local file you rebuild |
| `asciidoc.extensions` | Build extensions to load. `lib/code-line-highlight.js` makes `highlight=` work; see [17](17-code-blocks.md) |
| `output.dir` | Where generated HTML is written |

### No duplicate YAML keys

Do not add a second `site:`, `ui:` or `asciidoc:` block. Merge properties into the existing block; duplicate YAML keys silently override each other or fail validation.

### `site.keys` camelCase detail

Antora converts underscores and hyphens into camelCase in the Handlebars UI model. `header_links_page` in YAML is read as `site.keys.headerLinksPage` in the templates. This is intentional, so don't "fix" the template.

### What happens without the extension

If `asciidoc.extensions` is removed, the build still succeeds and every code block still gets the dark card, label, line numbers and Copy/Open buttons. Only `highlight=` stops having an effect. There is no warning, so check the playbook first if highlighting silently disappears.

## B. `antora.yml` — component version metadata

This is the live descriptor, at `gareeb-engineer/antora.yml`:

```yaml
name: gareeb-engineer
title: Gareeb Engineer
version: v1.0
display_version: 'dev'
start_page: ROOT:index.adoc
nav:
- modules/Java/nav.adoc
- modules/Arcitecture-diagram/nav.adoc
- modules/DevOps-Refs/nav.adoc
- modules/Data-Structure/nav.adoc
```

| Key | Meaning |
|---|---|
| `name` | Component name. Must match the `gareeb-engineer:` part of every resource ID |
| `title` | Human-readable component title |
| `version` | Version segment in URLs (`/gareeb-engineer/v1.0/...`). Use `~` for unversioned content |
| `display_version` | Label shown for the version, if the UI displays one |
| `start_page` | This component version's own start page (not necessarily the site root) |
| `nav` | **One entry per module**, each pointing at that module's own `nav.adoc`. Order here is order in the sidebar |

### Rules for `nav:`

- List each content module's `nav.adoc` exactly once.
- Each listed file links only to pages inside its own module (see [06](06-navigation.md)).
- Modules that should not appear in the sidebar, such as `headers`, are simply not listed.
- Paths are relative to the content root, which is why they start with `modules/`.
- A `nav.adoc` that exists on disk but is not listed here has **no effect**.

### Two types of start pages

- `site.start_page` (playbook) = **whole website** root.
- `start_page` (component descriptor) = **component version** start page.

Setting one does not change the other.

## C. Choose a different homepage

Point `site.start_page` at any page's resource ID:

```yaml
site:
  start_page: v1.0@gareeb-engineer:Java:index.adoc
```

The generated `build-output/index.html` becomes a redirect to that page. Don't move or copy the page's HTML yourself. See [08](08-homepages.md).

## D. Local Git content vs remote content

**Local worktree (this project):**

```yaml
content:
  sources:
    - url: .
      branches: HEAD
      start_path: ./gareeb-engineer/
```

**Remote repository:**

```yaml
content:
  sources:
    - url: https://github.com/YOUR_ORG/YOUR_REPO.git
      branches: main
      start_path: gareeb-engineer
```

Local builds read your uncommitted edits when the checked-out branch matches `branches`. Remote builds read only what is committed and pushed.

## E. Diagnostic commands

```powershell
antora --version
antora antora-playbook.yml
```

Review every warning, especially unresolved xrefs and missing navigation files. A clean build prints no warnings at all.

Next: [Writing articles](05-writing-articles.md) · [Dynamic header](07-dynamic-header.md).
