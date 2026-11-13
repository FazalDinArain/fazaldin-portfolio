import { about } from "@/config/about";
import { site } from "@/config/site";
import { OgLayout } from "@/lib/og";

export const alt = `About ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return OgLayout({
    title: "About — Background & Skills",
    subtitle: about.intro[0],
    tags: site.hero.tags.slice(0, 4),
  });
}
