import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { projectsDir, normalizeAssetPath } from "@/lib/paths";

export type ProjectMeta = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  featured: boolean;
  role: string;
  year: string;
  status: "ongoing" | "archived";
  tags: string[];
};

export type Project = ProjectMeta & { content: string };

function readProjectFile(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) || slug,
    title: data.title as string,
    description: data.description as string,
    cover: normalizeAssetPath(data.cover as string),
    featured: Boolean(data.featured),
    role: (data.role as string) || "Designer & Engineer",
    year: String(data.year || "2026"),
    status: (data.status as "ongoing" | "archived") || "ongoing",
    tags: (data.tags as string[]) || [],
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjectsMeta(): ProjectMeta[] {
  return getAllProjectSlugs()
    .map((slug) => readProjectFile(slug))
    .filter((p): p is Project => p !== null)
    .map(({ content, ...meta }) => {
      void content;
      return meta;
    });
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjectsMeta().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | null {
  return readProjectFile(slug);
}
