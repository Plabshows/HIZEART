# HIZE ART Website

Static Astro website for HIZE ART, prepared for GitHub and Vercel.

## Stack

- Astro static output
- JSON content in `data/`
- Images in `public/assets/images/`
- SEO and redirects configured for production

## Local Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run qa:html
npm test
npm run predeploy
```

## GitHub First Setup

Create an empty GitHub repository, then from this project folder run:

```bash
git remote add origin git@github.com:YOUR_USER_OR_ORG/hize-art-website.git
git push -u origin main
```

If you prefer HTTPS:

```bash
git remote add origin https://github.com/YOUR_USER_OR_ORG/hize-art-website.git
git push -u origin main
```

## Vercel

After the repository is on GitHub, import it in Vercel.

Use:

- Framework Preset: Astro
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

More detail is in `DEPLOY_VERCEL.md`.

## Admin CMS

The admin is available at `/admin/` after deployment.

It is a custom password-protected panel for the Vercel site:

- edits page content in `data/pages.json`
- edits works, projects, murals, exhibitions, collaborations and asset lists in `data/`
- uploads new images to `public/assets/images/uploads/`
- commits admin changes to `main`
- Vercel deploys automatically after each GitHub commit

Editable areas:

- Page content
- Works
- Projects
- Murals
- Exhibitions & collaborations
- Home collaborations strip
- Image catalogue

Production setup requires admin and GitHub token environment variables in Vercel. See `ADMIN_SETUP.md`.
