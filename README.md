# FazalDin Portfolio

Portfolio site for **FazalDin**, built with **Next.js**, **Tailwind CSS**, and markdown/MDX content.

## Setup

```bash
npm install
```

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set `NEXT_PUBLIC_SITE_URL` to your deployment URL (for example `https://your-domain.vercel.app`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Content

- Blog posts: `content/posts/*.mdx` (start from `content/posts/example-post.mdx`)
- Projects: `content/projects/*.mdx` (start from `content/projects/example-project.mdx`)
- About page copy: `src/config/about.ts`, skills in `src/config/skills.ts`
- Site config: `src/config/site.ts`

## Deploy (Vercel)

1. Import the repo in Vercel.
2. Add env var `NEXT_PUBLIC_SITE_URL` = your deployment URL.
3. Deploy — OG images use `@vercel/og` on `/opengraph-image` and per-slug routes.

## Features

- Dark/light theme (`data-theme` + localStorage)
- View transitions (`next-view-transitions` + fade CSS)
- Blog pagination (5 posts per page)
- Dynamic Open Graph images
- Mobile-responsive layout (768px / 640px breakpoints)
