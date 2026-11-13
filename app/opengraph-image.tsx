import { site } from "@/config/site";
import { OgLayout } from "@/lib/og";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return OgLayout({
    greeting: site.hero.greeting,
    title: site.hero.headline,
    subtitle: site.hero.subtitle,
    tags: site.hero.tags,
  });
}
