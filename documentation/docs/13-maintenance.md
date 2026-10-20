# 13 — Maintenance, publishing checklist and upgrades

## Two-posts-per-week routine

| When | Activity |
|---|---|
| Start of week | Pick one LLD and one HLD topic; write requirements and outline |
| During practice | Create Java models/tests or architecture decision notes first |
| Before publish | Add AsciiDoc, diagrams, code links, trade-offs, references |
| Local QA | Regenerate sidebar if needed; build, serve and test links |
| Publish | Commit, push, check GitHub Actions, share the article URL |
| Monthly | Review broken links, outdated platform details, and readability |

## Every-content-change checklist

- [ ] The page has a meaningful `= Title` and optional `:page-navtitle:`.
- [ ] No private passwords, keys, IP addresses, or non-public employer details.
- [ ] All `xref` links and `image::` references work locally.
- [ ] Navigation is rebuilt or manually updated if a page was added/removed.
- [ ] The GitHub Actions deployment job completes.
- [ ] The page works at the actual public URL, including GitHub Pages subpath.

## UI upgrade procedure

1. Copy working UI ZIP to a versioned backup or Git tag.
2. Modify `ui-source/` and run `tools/build_ui_bundle.py`.
3. Test collapsed/expanded nav labels, header links on a nested article, mobile menu, article body, breadcrumbs, images, and homepage.
4. Change the bundle filename or CSS/JS query version for cache busting.
5. Update playbook if bundle filename changed.
6. Push to a test branch before production.

## Backups and rollback

- Back up the working UI ZIP in Git or release artifacts.
- Commit source `.adoc`, playbook, nav script, and edited UI source under version control.
- Tag known-good versions such as `portfolio-ui-v1` and `portfolio-ui-v2`.
- To rollback, restore the prior ZIP and playbook URL, rebuild, redeploy.
- Avoid directly editing generated `build-output/` HTML; the next Antora build will overwrite it.

## Dependency hygiene

- Pin Antora and tooling versions in `package.json` and commit `package-lock.json`.
- Prefer `npm ci` during CI once the lock file exists.
- Verify runtime prerequisites when updating Node.js or Antora.
- Keep GitHub Actions actions updated and explicitly reviewed.
- Avoid adding a new front-end library for a single trivial interaction.

## Accessibility/quality review

- Verify all header links have readable labels.
- Ensure sidebar buttons are keyboard accessible; current buttons use `aria-expanded`.
- Use descriptive image alternative text.
- Avoid unnecessary emoji in critical technical headings if it harms clarity.
- Test narrow screens and 200% browser zoom for overlap.
- Ensure color contrast and focus states remain visible after CSS edits.

## Publishing quality standards

A publishable LLD article should have working code and tests whenever practical. A publishable HLD case study should state assumptions, constraints, and trade-offs rather than presenting one unexplained diagram. Publicly distinguishing your own solution from borrowed concepts improves credibility.

Next: [Contributing](16-contributing.md).
