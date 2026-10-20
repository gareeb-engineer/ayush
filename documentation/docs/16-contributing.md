# 16 — Contributor and new-maintainer guide

## What to learn first

Read [Overview](00-overview.md) → [Repository structure](03-repository-structure.md) → [Writing articles](05-writing-articles.md) → [Navigation](06-navigation.md). Build locally once before editing UI source.

## New article contribution

1. Create a topic branch.
2. Add an `.adoc` file in the appropriate module/folder.
3. Add images to the same module's `assets/images/`; avoid huge uncompressed screenshots.
4. Add tests/examples and clear references where possible.
5. Run the generator if this repo uses auto nav; do not hand-edit `nav-generated.adoc`.
6. Build locally and check the final rendered HTML.
7. Open a pull request with links, screenshots where relevant, and design decisions.

## UI change contribution

1. Explain the visual/interaction bug and attach reproducible steps.
2. Edit `ui-source/` rather than directly patching the distributed ZIP.
3. Rebuild with `tools/build_ui_bundle.py`.
4. Test sidebar open/close, nested links, filter, Contact header, mobile navigation, right TOC, and `portfolio.hbs` if present.
5. Update docs when configuration/behavior changes.
6. Commit both editable sources and the distributable ZIP.

## Review expectations

- Valid code or accurately marked pseudocode in technical articles.
- Correct source links and no uncredited diagrams/content.
- A clear distinction between current behavior and proposed future enhancements.
- No credentials, tokens, private contact details or proprietary employer data.
- No unjustified breaking changes to current UI/navigation.
- Tested links at both site root and deep article paths.

## Suggested branching and releases

- `main`: deployable website.
- Feature branches: article or UI work.
- UI changes tracked with tags/release notes (`ui-v7`, `ui-v8`, etc.).
- Always keep one prior verified ZIP to quickly rollback.

## Decisions and known trade-offs

1. Header content from an AsciiDoc list minimizes routine UI changes but is still compiled into static HTML at build time.
2. Python nav generator lowers article maintenance but currently flattens nested folders and groups unknown modules under Other Articles.
3. Standalone custom UI gives layout flexibility but requires explicit work to add all reference UI features.
4. A navigation link should come from an Antora resource ID, not from hardcoded `.html` paths, whenever possible.

## Scope boundaries

This kit is maintained as an Antora static site, **not** a backend web service. The UI works after generation without a database, Java server or frontend bundler, aside from optional browser-side interactions and any extensions you independently install.

Useful official references are collected in [`SOURCES.md`](../SOURCES.md).
