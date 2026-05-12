# HIZE ART Admin Setup

The custom admin panel lives at:

```txt
https://hizeart.vercel.app/admin/
```

It is a private panel for editing page copy, works, projects, murals, exhibitions, collaborations and image references. When content is saved, the admin commits JSON/image changes to GitHub. Vercel then redeploys the site automatically.

## Required Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables for Production, Preview and Development if needed:

```txt
ADMIN_EMAIL=info@hizeart.com
ADMIN_PASSWORD=your-private-admin-password
SESSION_SECRET=a-long-random-secret
GITHUB_REPO=Plabshows/HIZEART
GITHUB_BRANCH=main
GITHUB_TOKEN=github-token-with-repo-contents-read-write-access
```

For stronger security, use `ADMIN_PASSWORD_HASH` instead of `ADMIN_PASSWORD`.

Generate the hash locally:

```bash
node -e "const crypto=require('crypto'); const password=process.argv[1]; console.log(crypto.createHash('sha256').update(password).digest('hex'))" "your-private-admin-password"
```

Then set:

```txt
ADMIN_PASSWORD_HASH=the-generated-hash
```

If both `ADMIN_PASSWORD_HASH` and `ADMIN_PASSWORD` exist, the hash is used.

## GitHub Token

Create a fine-grained GitHub Personal Access Token with access only to:

```txt
Repository: Plabshows/HIZEART
Permissions: Contents -> Read and write
```

Store it as `GITHUB_TOKEN` in Vercel. Do not commit it to the repository.

## How Editing Works

1. Open `/admin/`.
2. Log in with the configured admin email and password.
3. Edit content by page or by collection.
4. Upload images from image fields when needed.
5. Click `Save changes`.
6. The admin commits updates to GitHub.
7. Vercel deploys the new static site.

Large image uploads should be optimized before uploading. The current limit is 8 MB per image. After an image upload finishes, click `Save changes` so the edited page or item points to the new image.

If uploads fail, confirm the GitHub token has:

```txt
Repository: Plabshows/HIZEART
Permissions: Contents -> Read and write
```
