# Adra Product Studio — website

This is a minimal Next.js + shadcn/ui site designed for easy deployment on Vercel.

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Local dev

```bash
# choose one
pnpm install
pnpm dev

# or
npm install
npm run dev
```

Open `http://localhost:3000`.

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
