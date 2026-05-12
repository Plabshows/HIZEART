# HIZE ART Website

Static Astro website for HIZE ART, prepared for GitHub, Vercel and Supabase-powered content editing.

## Stack

- Astro static output
- Supabase Auth for `/admin/`
- Supabase Database for editable site content
- Supabase Storage for uploaded images
- Local JSON in `data/` as build fallback and seed source
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

Seed current JSON content into Supabase:

```bash
SUPABASE_ADMIN_EMAIL=info@hizeart.com SUPABASE_ADMIN_PASSWORD='your-password' npm run supabase:seed
```

## Vercel

Use:

- Framework Preset: Astro
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

More detail is in `DEPLOY_VERCEL.md`.

## Admin CMS

The admin is available at `/admin/` after deployment.

Editable areas:

- Page content
- Works
- Projects
- Murals
- Exhibitions & collaborations
- Home collaborations strip
- Image catalogue

The admin saves to Supabase. Vercel rebuilds automatically after each save when `VERCEL_DEPLOY_HOOK_URL` is configured.

Full setup is in `ADMIN_SETUP.md`.
