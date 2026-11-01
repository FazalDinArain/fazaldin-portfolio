import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMeta = {
  title: string;
  description?: string;
  path?: string;
  ogType?: "website" | "article";
  noSuffix?: boolean;
};

export function pageUrl(path = ""): string {
  const base = site.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}${p.endsWith("/") ? "" : "/"}`;
}

/** Route-level OG image from Next.js `opengraph-image` convention. */
export function openGraphImageUrl(path = "/"): string {
  if (path === "/" || path === "") {
    return pageUrl("/opengraph-image");
  }
  const base = path.replace(/\/$/, "");
  return pageUrl(`${base}/opengraph-image`);
}

export function buildMetadata({
  title,
  description = site.defaultDescription,
  path = "/",
  ogType = "website",
  noSuffix = false,
}: PageMeta): Metadata {
  const fullTitle = noSuffix ? title : `${title} | ${site.name}`;
  const url = pageUrl(path);
  const ogImage = openGraphImageUrl(path);

  return {
    title: fullTitle,
    description,
    authors: [{ name: site.name }],
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      url,
      title: fullTitle,
      description,
      siteName: site.title,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
