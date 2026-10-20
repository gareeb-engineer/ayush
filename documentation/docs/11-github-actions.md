# 11 — Deploy with GitHub Actions and GitHub Pages

## Recommended build sequence

```text
checkout Git content
   -> setup Node + Python
   -> install Node dependencies
   -> generate nav in content source
   -> Antora build
   -> upload generated site
   -> deploy GitHub Pages
```

A complete **example workflow** is included at `example-repository/.github/workflows/deploy-antora.yml`. Merge it into your existing deployment workflow rather than creating conflicting deployments.

## Critical preconditions

1. The repo Actions settings permit **GitHub Pages deployment by GitHub Actions**.
2. The workflow has `pages: write` and `id-token: write` permissions.
3. Build and deployment jobs point to the same generated output directory, here `build-output`.
4. Your `site.url` correctly includes the GitHub Pages base path:
   - User/organization Pages: `https://USERNAME.github.io`
   - Project Pages: `https://USERNAME.github.io/REPOSITORY`
5. The example is **single-repository / local content source** (`content.sources.url: .`). Adjust if your content is remote or under `docs/`.
6. Your repository commits `package-lock.json` if the workflow uses `npm ci`. The example workflow runs `npm install` for a first-time demo; pin and lock versions for production.

## Minimal relevant workflow excerpt

```yaml
name: Deploy Antora portfolio
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: npm install
      - run: python tools/generate_nav.py --content-root .
      - run: npx antora antora-playbook.yaml
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build-output
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Production:** commit a lock file and replace `npm install` with `npm ci`. This example is not meant to overwrite existing custom permissions, caching, domain setup, or branch protections.

## New article workflow

1. Add file under content `modules/.../pages/`.
2. Add the diagram/code attachments.
3. Run Python and Antora locally; verify xrefs.
4. Commit the `.adoc` and (optionally) generated `nav-generated.adoc`. Choose a single source of truth for nav in CI; avoid surprise differences.
5. Push the branch and open a pull request.
6. Merge into the deployment branch and review GitHub Actions logs.
7. Verify the published page and its sidebar link.

## Header-only link edit

Edit `header-links.adoc`; push. The Antora build picks up the new static HTML. The nav generator can still run harmlessly as part of every CI build, even though it is not needed for that specific edit.

## Remote-content caveat

If your playbook uses a remote Git source (`https://...git`) instead of the runner's local `.` worktree, generating nav in the runner repository **does not change that remote source**. Generate/commit the nav file in the actual content repo, or check out the source repository into a workspace path and point Antora at it.

## Troubleshooting CI/CD

- **Python works locally but not in Actions:** check content-root path and checkout directory.
- **Navigation missing after deploy:** generator ran in wrong repo/folder, `antora.yml` didn't register nav, or remote content was used.
- **Build passes but site old:** check publishing branch, deployed artifact path, and browser cache.
- **Broken CSS on GitHub Pages:** check `site.url` subpath and generated CSS link, not just CSS content.
- **Permissions error deploying Pages:** enable GitHub Actions as the Pages source and check job permissions/environment.

See also [Troubleshooting](12-troubleshooting.md), [Maintenance](13-maintenance.md).
