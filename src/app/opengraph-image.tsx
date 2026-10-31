import { site } from "@/config/site";
import { OgLayout } from "@/lib/og";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return OgLayout({
    title: site.title,
    subtitle: site.defaultDescription,
  });
}
