# Project case studies

Add or replace portfolio projects by creating `{slug}.mdx` in this folder.

## Frontmatter schema

```yaml
title: "Project title"
slug: "url-segment"
description: "One-line summary for cards and SEO"
cover: "/images/placeholder-cover.svg" # or your own file under public/images/
featured: true # shows on home with star badge
status: ongoing # or archived
role: "Designer & Engineer"
year: "2026"
tags:
  - "Next.js"
  - "TypeScript"
```

Start from `example-project.mdx`. When you add or replace `{slug}.mdx` files here, they appear on `/projects/` automatically. Set `featured: true` to show a project on the home page (the home section stays on the “coming soon” placeholder until at least one project is featured).
