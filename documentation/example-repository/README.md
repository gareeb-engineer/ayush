# Example Antora engineering portfolio repository

A copyable demonstration of the structure explained in [`../README.md`](../README.md). This is an **example**, not a copy of anyone's private repository. It uses `name: gareeb-engineer`, `version: v1.0`, `modules/java/pages/index.adoc` as the site homepage, and a `header-links.adoc` page for global top-right navigation.

## First run

```powershell
npm install
python tools/generate_nav.py --content-root .
npx antora antora-playbook.yaml
python -m http.server 8000 --directory build-output
```

Use `http://localhost:8000`. Before deploying publicly, set `site.url` to your actual GitHub Pages URL and replace placeholders in `modules/java/pages/header-links.adoc` and `contact.adoc`.

The example's `.github/workflows/deploy-antora.yml` is for GitHub Pages. Configure Pages to deploy using GitHub Actions. For production builds, commit `package-lock.json` and replace `npm install` with `npm ci`.

**Want fully customized hierarchical sidebar categories?** Swap registration from `modules/ROOT/nav-generated.adoc` to `modules/ROOT/nav.adoc` in `antora.yml` and edit the manual navigation file.
