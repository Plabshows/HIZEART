# HIZE ART Admin Setup

The admin panel lives at:

```txt
https://hizeart.vercel.app/admin/
```

It now uses Supabase for login, editable content and image uploads:

- Supabase Auth: private admin login.
- Supabase Database: page and collection content.
- Supabase Storage: uploaded images.
- Vercel Deploy Hook: optional automatic rebuild after saving.

## 1. Create The Supabase Tables And Bucket

Open Supabase -> SQL Editor and run:

```txt
supabase/migrations/20260512170000_hize_admin_content.sql
```

This creates:

- `public.site_documents`
- public read access for the static site
- write access only for `info@hizeart.com`
- public bucket `hize-images`
- upload/delete access only for `info@hizeart.com`

## 2. Create The Admin User

In Supabase -> Authentication -> Users, create:

```txt
Email: info@hizeart.com
Password: your private password
```

Do not commit this password to the repository.

## 3. Seed Current Site Content

After the SQL and user are ready, run locally:

```bash
SUPABASE_ADMIN_EMAIL=info@hizeart.com SUPABASE_ADMIN_PASSWORD='your-password' npm run supabase:seed
```

This copies the current JSON content from `data/` into Supabase.

## 4. Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

```txt
PUBLIC_SUPABASE_URL=https://omhjbjvjzkxjmqqionbs.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9
ADMIN_EMAIL=info@hizeart.com
```

Optional but recommended:

```txt
VERCEL_DEPLOY_HOOK_URL=your-vercel-deploy-hook-url
```

Create the deploy hook in Vercel -> Project Settings -> Git -> Deploy Hooks. Choose branch `main`.

## 5. How Editing Works

1. Open `/admin/`.
2. Log in with the Supabase admin user.
3. Edit pages, works, projects, murals, exhibitions, collaborations or asset lists.
4. Upload images from image fields.
5. Click `Save changes`.
6. The admin saves content in Supabase.
7. If `VERCEL_DEPLOY_HOOK_URL` is configured, Vercel rebuilds the static site.

If the deploy hook is not configured, the content still saves in Supabase, but you must redeploy manually in Vercel to publish the static site.
