import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { postsDir, normalizeAssetPath } from "@/lib/paths";
import { parsePostDate } from "@/lib/dates";

export const POSTS_PER_PAGE = 5;

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover: string;
};

export type Post = PostMeta & { content: string };

function readPostFile(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) || slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) || [],
    cover: normalizeAssetPath(data.cover as string),
    content,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => readPostFile(slug))
    .filter((p): p is Post => p !== null)
    .map(({ content, ...meta }) => {
      void content;
      return meta;
    })
    .sort((a, b) => parsePostDate(b.date) - parsePostDate(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug);
}

export function getRecentPosts(limit: number): PostMeta[] {
  return getAllPostsMeta().slice(0, limit);
}

export function getTotalPages(): number {
  return Math.max(1, Math.ceil(getAllPostsMeta().length / POSTS_PER_PAGE));
}

export function getPostsPage(page: number): {
  posts: PostMeta[];
  total: number;
  page: number;
  totalPages: number;
  rangeLabel: string;
} {
  const all = getAllPostsMeta();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const posts = all.slice(start, start + POSTS_PER_PAGE);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + POSTS_PER_PAGE, total);
  return {
    posts,
    total,
    page: safePage,
    totalPages,
    rangeLabel: `Showing ${from}–${to} of ${total} articles`,
  };
}
