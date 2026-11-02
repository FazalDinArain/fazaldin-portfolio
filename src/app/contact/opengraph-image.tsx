import { seoMeta } from "@/config/seo-meta";
import { site } from "@/config/site";
import { OgLayout } from "@/lib/og";

export const alt = `${seoMeta.contactTitle} | ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return OgLayout({
    title: seoMeta.contactTitle,
    subtitle: seoMeta.contactDescription,
    tags: ["Email", "LinkedIn", "GitHub"],
  });
}
