import type { Metadata } from "next";
import { site } from "@/config/site";

const META_DESCRIPTION_MAX = 160;

export function metaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

type PageMeta = {
  title: string;
  description?: string;
  path?: string;
  ogType?: "website" | "article";
  noSuffix?: boolean;
  ogImageAlt?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    tags?: readonly string[];
  };
};

function appendTrailingSlash(path: string): string {
  if (path.endsWith("/")) return path;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  if (last.includes(".")) return path;
  return `${path}/`;
}

export function pageUrl(path = ""): string {
  const base = site.url.replace(/\/$/, "");
  if (path === "" || path === "/") return `${base}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${appendTrailingSlash(p)}`;
}

/** Route-level OG image from Next.js `opengraph-image` convention. */
export function openGraphImageUrl(path = "/"): string {
  if (path === "/" || path === "") {
    return pageUrl("/opengraph-image");
  }
  const base = path.replace(/\/$/, "");
  return pageUrl(`${base}/opengraph-image`);
}

export function sitePersonId(): string {
  return `${pageUrl("/")}#person`;
}

export function buildMetadata({
  title,
  description = site.defaultDescription,
  path = "/",
  ogType = "website",
  noSuffix = false,
  ogImageAlt,
  keywords,
  noIndex = false,
  article,
}: PageMeta): Metadata {
  const fullTitle = noSuffix ? title : `${title} | ${site.name}`;
  const metaDesc = metaDescription(description);
  const url = pageUrl(path);
  const ogImage = openGraphImageUrl(path);
  const imageAlt = ogImageAlt ?? fullTitle;

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    title: fullTitle,
    description: metaDesc,
    applicationName: site.name,
    authors: [{ name: site.name, url: pageUrl("/") }],
    creator: site.name,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: ogType,
      url,
      title: fullTitle,
      description: metaDesc,
      siteName: site.title,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(ogType === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: [site.name],
            tags: article.tags ? [...article.tags] : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDesc,
      images: [{ url: ogImage, alt: imageAlt }],
    },
  };
}
