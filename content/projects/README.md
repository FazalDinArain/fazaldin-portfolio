# Project case studies

Add or replace portfolio projects by creating `{slug}.mdx` in this folder.

## Frontmatter schema

```yaml
title: "Project title"
slug: "url-segment"
description: "One-line summary for cards and SEO"
cover: "/images/your-cover.webp"
featured: true # shows on home with star badge
status: ongoing # or archived
role: "Designer & Engineer"
year: "2026"
tags:
  - "Next.js"
  - "TypeScript"
```

When you add `{slug}.mdx` files here, they appear on `/projects/` automatically. Set `featured: true` to show a project on the home page. Until then, a placeholder is shown on Home and Projects.
