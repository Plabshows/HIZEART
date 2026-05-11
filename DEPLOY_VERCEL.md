# HIZE ART - Vercel Deployment

This Astro site is prepared for Vercel as a static deployment.

## Vercel Settings

- Framework Preset: Astro
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: project root

The same settings are defined in `vercel.json`.

## Pre-Deploy Check

Run this before connecting or promoting the production domain:

```bash
npm run predeploy
```

This runs Astro diagnostics, builds the static site, validates generated HTML and validates the main data/routes.

## Recommended First Deploy

1. Create an empty GitHub repository.
2. Push this project to GitHub from the local repository:

```bash
git remote add origin git@github.com:YOUR_USER_OR_ORG/hize-art-website.git
git push -u origin main
```

3. In Vercel, choose **Add New Project** and import the GitHub repository.
4. Confirm the project settings above.
5. Deploy first to the temporary Vercel preview URL.
6. Check:
   - `/`
   - `/works/`
   - `/available-works/`
   - `/murals/`
   - `/projects/`
   - `/vr-art/`
   - `/about/`
   - `/contact/`
   - `/sitemap.xml`
   - `/robots.txt`
7. Only after the preview looks correct, add `hizeart.com` and `www.hizeart.com` in Vercel Domains.

## DNS Cutover From Current Hosting

Before changing DNS, back up the current IONOS/Apache site and any database or email DNS records.

In IONOS DNS, change only the web records requested by Vercel. Do not delete MX records if email is active.

Typical Vercel DNS setup:

- Apex/root domain `hizeart.com`: Vercel A record shown in the Vercel dashboard.
- `www`: CNAME to the Vercel target shown in the Vercel dashboard.

Use the exact values shown by Vercel for this project.

## Rollback

If anything fails after DNS cutover:

1. Remove or pause the production domain in Vercel.
2. Restore the previous IONOS DNS records for the website.
3. Keep the old hosting files until the new version has been live and stable.

## Notes

- `vercel.json` includes redirects for old URLs.
- `_redirects` is kept for Netlify compatibility, but Vercel uses `vercel.json`.
- The site is static; no Vercel adapter is required unless SSR/API routes are added later.
