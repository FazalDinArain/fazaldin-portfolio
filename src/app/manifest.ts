import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { themeDark, themeMeta } from "@/config/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: themeDark.bg,
    theme_color: themeMeta.themeColor,
    lang: "en",
    icons: [
      {
        src: "/images/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
