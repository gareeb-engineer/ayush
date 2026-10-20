# 07 — Dynamic top-right links from an `.adoc` file

This custom feature allows a site owner to add/remove/reorder **Contact, LinkedIn, GitHub, Résumé, and other header links** without editing CSS or Handlebars for every change.

## 1. Create the source page

For the sample component/module, create `modules/java/pages/header-links.adoc`:

```asciidoc
= Header Navigation
:page-nav-exclude:

[.header-menu-links]
* xref:contact.adoc[Contact]
* https://www.linkedin.com/in/YOUR_PROFILE/[LinkedIn]
* https://github.com/YOUR_USERNAME[GitHub]
* xref:resume.adoc[Résumé]
```

Replace placeholders. Only include the Résumé entry after creating `resume.adoc` (or point the entry to a real PDF attachment/URL). To add an item, add another `*` line and rebuild Antora.

## 2. Point the UI to that page

Merge the following into your existing playbook's `site:` section:

```yaml
site:
  keys:
    header_links_page: 'gareeb-engineer:java:header-links.adoc'
```

Make sure `gareeb-engineer` matches `antora.yml:name` and `java` matches the actual module. The UI reads this as `site.keys.headerLinksPage` because Antora camelCases site-key names.

This is a **one-time integration**. Once configured, subsequent header-link edits need only an `.adoc` modification and an Antora build.

## 3. What the templates do

Both `layouts/default.hbs` and `layouts/portfolio.hbs` invoke Antora's built-in `resolvePage` helper to get the configured page's generated UI model, then insert its HTML `contents` into a `<nav>` at the right of the header. `css/site.css` and `css/portfolio.css` format the AsciiDoc list horizontally.

`js/site.js` adjusts *relative* internal xref URLs based on the actual URL of the header-links page. This matters when the same header renders on deeply nested documentation articles. External HTTPS and `mailto:` URLs remain unchanged.

**Assumption:** this feature works with the supplied custom bundle and the `resolvePage` helper in supported Antora versions. Another unrelated UI bundle will not automatically implement it.

## 4. Internal versus external link syntax

| Destination | Source line |
|---|---|
| Page in same module | `* xref:contact.adoc[Contact]` |
| Page in another module, same component | `* xref:ROOT:lld/parking-lot.adoc[LLD]` |
| Page in another component | `* xref:other-component:ROOT:index.adoc[Docs]` |
| LinkedIn | `* https://www.linkedin.com/in/YOUR_PROFILE/[LinkedIn]` |
| GitHub | `* https://github.com/YOUR_USERNAME[GitHub]` |
| Email | `* mailto:hello@example.com[Email]` |

Antora resolves xrefs at build time, not in the browser; verify warnings about unresolved targets.

## 5. Keep configuration out of the sidebar

The supplied generator skips a page when it finds `:page-nav-exclude:` near the beginning of the AsciiDoc file. Manual navigation: do not add an xref to `header-links.adoc`.

The page **is still directly accessible by URL** if someone knows its address. Do not store private data or secrets in it.

## 6. Edit an existing link

1. Change one list item in `header-links.adoc`.
2. Save.
3. Run `antora antora-playbook.yaml` (Python nav script not required for a link-only change).
4. Refresh a docs page and an optional portfolio page.
5. Push when satisfied; GitHub Actions republishes static HTML.

## 7. Troubleshooting

- **No links:** confirm `site.keys.header_links_page` key and resource ID; run Antora and inspect warnings.
- **Old single Contact button only:** the custom layout couldn't resolve the header page and may be using `site.keys.contact_url` fallback.
- **Wrong internal URL on nested page:** verify the latest `js/site.js` is included in deployed assets; serve site using HTTP and inspect link `href`.
- **Header page shown in sidebar:** update/merge the generator's `:page-nav-exclude:` rule or remove it from your manual nav.
- **Links invisible on narrow display:** check the latest bundle's responsive CSS rather than replacing the nav source.

Next: [Configuration](04-configuration.md) · [UI customization](09-ui-customization.md).
