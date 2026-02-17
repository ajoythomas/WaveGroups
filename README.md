# Wave Groups - Next.js + Cloudflare Migration

This project rebuilds [wavegroups.com](https://www.wavegroups.com/) as a static-first Next.js site with Cloudflare-compatible form APIs.

## Tech Stack

- Next.js App Router + TypeScript
- Cloudflare Pages hosting
- Next.js API routes for form handling
- Cloudflare Turnstile verification
- Cloudflare R2 signed uploads for resumes
- Transactional email via API (Resend-compatible endpoint)

## Routes Included

- `/`
- `/about-wave`
- `/services`
- `/service-item/[slug]`
- `/projects`
- `/portfolio-item/[slug]`
- `/careers`
- `/career-item/[slug]`
- `/contact-us`

Legacy redirects are configured in `next.config.ts`.

## API Endpoints

- `POST /api/contact`
- `POST /api/careers/upload-url`
- `POST /api/careers/apply`

## Environment Variables

Create `.env.local` and configure:

```bash
NEXT_PUBLIC_SITE_URL=https://www.wavegroups.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

EMAIL_API_KEY=
FROM_EMAIL=
CONTACT_TO_EMAIL=
CAREERS_TO_EMAIL=

R2_BUCKET=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=
R2_PUBLIC_BASE_URL=
```

`R2_ENDPOINT` format example:
`https://<account-id>.r2.cloudflarestorage.com`

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Create a Cloudflare Pages project and connect the repo.
3. Use build command: `npm run build`
4. Use the **Next.js framework preset** in Pages (do not set a custom static output directory).
5. Add all required environment variables.
6. Add custom domain `www.wavegroups.com`.

If your Pages setup expects a Next.js preset, select **Next.js** framework preset.

## Notes

- Careers application uploads resume files to R2 via signed URL.
- Resume files are referenced in email by URL/path (not attached binary files).
- Turnstile is optional locally, enforced when `TURNSTILE_SECRET_KEY` is set.
