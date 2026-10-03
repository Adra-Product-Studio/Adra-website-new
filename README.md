# Adra Product Studio — website

This is a minimal Next.js + shadcn/ui site designed for easy deployment on Vercel.

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Local dev

```bash
# Node.js 22; use the committed npm lockfile
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Security and verification

```bash
npm audit --audit-level=low
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npx playwright test
```

Browser tests use a production build, not the development server. See
[`docs/security-review.md`](docs/security-review.md) for the review scope,
findings, deployment checks and CSP tradeoffs. The enforced script policy
uses a new nonce per HTML response, so HTML is rendered on request and is not
shared through a CDN cache. Static assets remain cacheable.

There are no application forms, API routes or Server Actions. The proxy accepts
GET/HEAD only and the CSP denies form submissions. Revisit these controls before
adding write endpoints, analytics, embeds or remote images; do not weaken them
globally to silence a browser error.

## Editing content

Most copy + lists live in:

- `lib/site-content.ts`

The main layout and page sections are in:

- `app/layout.tsx`
- `app/page.tsx`

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project**, import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `next build` (default)
5. Output: (leave default)

That’s it.

## Notes

- The client section currently uses clean text-based “logos” (company names) to keep the project self-contained.
  Replace those cards with SVG logos in `app/page.tsx` if you want exact brand marks.
