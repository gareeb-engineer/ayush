# 08 — Landing page, breadcrumbs and layouts

## Two available UI layouts

| Layout | Purpose | How to select |
|---|---|---|
| `default.hbs` | Engineering article: sidebar, article, optional TOC, pagination | Leave default; optionally set `:page-layout: default` |
| `portfolio.hbs` | Optional professional résumé-style homepage | Set `:page-layout: portfolio` |

The current `portfolio.hbs` has much of its hero/experience wording **embedded in the layout**, not in `index.adoc`. Changing just the AsciiDoc body will not rewrite the fixed hero. Edit/repackage the UI source to change fixed hero copy, image placeholder, or sections.

## Option A — Garbage Collection is the site homepage

Given `modules/java/pages/index.adoc` and `antora.yml` with `name: gareeb-engineer`, `version: v1.0`:

```yaml
site:
  start_page: v1.0@gareeb-engineer:java:index.adoc
```

Make the article a normal docs page:

```asciidoc
= Java's Invisible Engine: Garbage Collection
:page-layout: default

== Introduction
...
```

When Antora identifies it as the **site** start page, this custom `default.hbs` skips the redundant `Home / <page>` breadcrumb using `page.home`. Normal articles still show breadcrumbs when provided by Antora.

## Option B — résumé landing page

Create e.g. `modules/ROOT/pages/index.adoc` with:

```asciidoc
= Engineering Portfolio
:page-layout: portfolio
```

And set:

```yaml
site:
  start_page: v1.0@gareeb-engineer:ROOT:index.adoc
```

The special template shows hero, profile image, experience, and Engineering Library blocks; article navigation still comes from the registered Antora nav files.

## Important distinction: site root vs component root

- `site.start_page` is the whole site homepage.
- `antora.yml` can also specify a `start_page` for its component version; that is not necessarily identical to the site's root.
- The version coordinate in `site.start_page` is optional if you want the latest version. Pin it when you want a particular version, such as `v1.0@`.

## Logo and header behavior

`{{site.homeUrl}}` in the UI points to the configured site start URL. If you change the homepage, the logo/home links will follow it after rebuilding. Don't hardcode `/index.html` into every article.

## Custom photo

The portfolio layout currently uses `{{uiRootPath}}/img/profile-photo.png` from the **UI bundle**, not `modules/.../assets/images/`. To replace it, edit `ui-source/img/profile-photo.png`, rebuild the bundle and Antora site. Article images remain in their modules.

## What about an AsciiDoc-managed résumé?

A normal `resume.adoc` can be fully content-driven using `default.hbs`; it needs no UI changes. If you want the *hero landing page itself* to be completely data-driven from `.adoc`, that requires a further UI refactor beyond this release; do not assume the existing hero is driven by the article body.

Next: [UI customization](09-ui-customization.md).
