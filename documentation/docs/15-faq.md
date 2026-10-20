# 15 — FAQ and current limitations

### Will standard Antora AsciiDoc syntax still work?

Yes. The generator converts normal AsciiDoc to HTML before the custom UI renders it. Headings, code blocks, xrefs, tables, admonitions, includes, images and other supported Antora/Asciidoctor features work. Their **styling** may differ from the official UI.

### Does merely adding a `.adoc` file put it in the sidebar?

Not in Antora itself. A registered nav file must reference it. The optional Python generator automates creation of that file.

### Can navigation be nested to three or four levels?

With manual `nav.adoc`: yes, up to the supported AsciiDoc nav list depth. The supplied generator only makes top-level categories and flat article lists; deeper folder nesting needs a generator enhancement.

### Do I rerun Python every time I edit a paragraph?

No. Regeneration is needed when the set or titles of auto-nav entries change, not for every article-body edit.

### Are the category arrows clickable?

Yes. This custom UI renders unlinked parent groups as buttons controlling child visibility. Child page titles become links. Linked parents are treated differently; see [Navigation](06-navigation.md).

### Can I add LinkedIn and Contact without editing Handlebars?

Yes. Edit `header-links.adoc`, which is referenced by `site.keys.header_links_page`, and rebuild Antora.

### Is `:page-nav-exclude:` an Antora built-in attribute?

No. It is a convention supported by the customized Python generator in this kit. The page is still published; only the generator skips its sidebar xref.

### Can I edit the profile picture in an `.adoc` file?

The **current fixed portfolio hero** uses an image in the UI bundle (`img/profile-photo.png`). Replace the source image and rebuild the ZIP. Normal article images are managed with AsciiDoc `image::` references under module assets.

### How do I make Garbage Collection the home page?

Set `site.start_page` to the correct resource ID, e.g. `v1.0@gareeb-engineer:java:index.adoc`. The selected page uses normal `default.hbs` unless its page-layout attribute says otherwise.

### Does this include full-text search, Mermaid, tabs, or JS syntax highlighting?

Not by default. The filter only searches nav items; Mermaid/tabs/full-text search need additional tooling. Standard source blocks work; highlighting integration must be verified separately.

### Does the content live inside the UI ZIP?

No. `.adoc` content lives in your Git content source. The UI ZIP provides HTML templates and static UI assets. The documentation kit bundles sample content only for teaching.

### Why does a GitHub Pages project site break CSS links?

Often `site.url` is missing the repository path (`/REPOSITORY`) or the deployed site is served under a different prefix. Validate on the final public URL.

### Can I keep the old Antora default UI features while using this custom bundle?

Only if you port those features. This UI is not the official default UI with all built-ins; see [UI customization](09-ui-customization.md).

### Is a GitHub Actions workflow automatically created by this ZIP?

No. The ZIP provides an example workflow. You still need to copy/merge it into your repository and configure GitHub Pages in repository settings.

### How do I know what's published?

Run Antora, inspect `build-output`, then preview over HTTP. `site.start_page` determines the root URL redirect; `nav.adoc` determines menu links; the bundle determines appearance.
