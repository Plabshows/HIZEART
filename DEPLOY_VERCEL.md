# HIZE ART - Vercel Deployment

This Astro site is prepared for Vercel as a static deployment.

## Vercel Settings

- Framework Preset: Astro
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: project root

The same settings are defined in `vercel.json`.

## Supabase Admin Panel

The project includes a private admin at:

```txt
/admin/
```

The admin uses Supabase:

- Auth user: `info@hizeart.com`
- Database table: `public.site_documents`
- Storage bucket: `hize-images`
- Optional Vercel deploy hook for automatic rebuilds

Set these Vercel environment variables:

```txt
PUBLIC_SUPABASE_URL=https://omhjbjvjzkxjmqqionbs.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9
ADMIN_EMAIL=info@hizeart.com
```

Recommended:

```txt
VERCEL_DEPLOY_HOOK_URL=your-vercel-deploy-hook-url
```

Run the SQL in `supabase/migrations/20260512170000_hize_admin_content.sql`, then seed content:

```bash
SUPABASE_ADMIN_EMAIL=info@hizeart.com SUPABASE_ADMIN_PASSWORD='your-password' npm run supabase:seed
```

## Pre-Deploy Check

Run this before promoting the production domain:

```bash
npm run predeploy
```

This runs Astro diagnostics, builds the static site, validates generated HTML and validates the main data/routes.

## Recommended First Deploy

1. Push this project to GitHub.
2. In Vercel, choose **Add New Project** and import the GitHub repository.
3. Confirm the project settings above.
4. Add the Supabase environment variables.
5. Deploy first to the temporary Vercel URL.
6. Check:
   - `/`
   - `/works/`
   - `/available-works/`
   - `/murals/`
   - `/projects/`
   - `/vr-art/`
   - `/about/`
   - `/contact/`
   - `/admin/`
   - `/sitemap.xml`
   - `/robots.txt`
7. Only after the preview looks correct, add `hizeart.com` and `www.hizeart.com` in Vercel Domains.

## DNS Cutover From Current Hosting

Before changing DNS, back up the current site and keep existing email DNS records.

In IONOS DNS, change only the web records requested by Vercel. Do not delete MX records if email is active.

Typical Vercel DNS setup:

- Apex/root domain `hizeart.com`: Vercel A record shown in the Vercel dashboard.
- `www`: CNAME to the Vercel target shown in the Vercel dashboard.

Use the exact values shown by Vercel for this project.

## Rollback

If anything fails after DNS cutover:

1. Remove or pause the production domain in Vercel.
2. Restore the previous DNS records for the website.
3. Keep the old hosting files until the new version has been live and stable.
