import type { MetadataRoute } from "next";
import { pageUrl } from "@/lib/seo";
import { getAllProjectSlugs } from "@/lib/projects";
import { getAllPostSlugs, getTotalPages } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths = ["/", "/about/", "/contact/", "/projects/", "/blog/"] as const;

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: pageUrl(path === "/" ? "/" : path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/projects/" ? 0.9 : 0.8,
  }));

  for (const slug of getAllProjectSlugs()) {
    entries.push({
      url: pageUrl(`/projects/${slug}/`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const slug of getAllPostSlugs()) {
    entries.push({
      url: pageUrl(`/blog/${slug}/`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const totalBlogPages = getTotalPages();
  for (let page = 2; page <= totalBlogPages; page++) {
    entries.push({
      url: pageUrl(`/blog/${page}/`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
