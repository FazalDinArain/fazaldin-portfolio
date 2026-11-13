import { site } from "@/config/site";
import { pageUrl, sitePersonId } from "@/lib/seo";

export function buildPersonNode() {
  return {
    "@type": "Person" as const,
    "@id": sitePersonId(),
    name: site.name,
    url: pageUrl("/"),
    image: pageUrl("/images/favicon-512x512.png"),
    jobTitle: site.jsonLd.jobTitle,
    sameAs: [site.github, site.linkedin],
    knowsAbout: [...site.jsonLd.knowsAbout],
  };
}

export function buildHomeGraphJsonLd() {
  const personId = sitePersonId();
  const websiteId = `${pageUrl("/")}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(),
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.title,
        description: site.defaultDescription,
        url: pageUrl("/"),
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": pageUrl("/"),
        url: pageUrl("/"),
        name: site.title,
        description: site.defaultDescription,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

export function buildProjectJsonLd(project: {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  cover: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: pageUrl(`/projects/${project.slug}/`),
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    image: project.cover ? pageUrl(project.cover) : undefined,
    author: { "@id": sitePersonId() },
    inLanguage: "en",
  };
}

export function buildBlogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: pageUrl(`/blog/${post.slug}/`),
    inLanguage: "en",
    author: { "@id": sitePersonId() },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: pageUrl("/"),
    },
    image: post.cover ? pageUrl(post.cover) : pageUrl("/opengraph-image"),
    mainEntityOfPage: pageUrl(`/blog/${post.slug}/`),
    keywords: post.tags.length ? post.tags.join(", ") : undefined,
  };
}
