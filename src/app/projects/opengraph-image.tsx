import { seoMeta } from "@/config/seo-meta";
import { site } from "@/config/site";
import { OgLayout } from "@/lib/og";

export const alt = `${seoMeta.projectsTitle} | ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return OgLayout({
    title: seoMeta.projectsTitle,
    subtitle: seoMeta.projectsDescription,
    tags: site.hero.tags.slice(0, 4),
  });
}
