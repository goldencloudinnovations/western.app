# western.app

This project is configured for static export and GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

## Static build output

```bash
npm run build
```

The static site is generated into `out/`.

## GitHub Pages

1. Push to `main`.
2. In GitHub repo settings, set **Pages** source to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `out/`.
