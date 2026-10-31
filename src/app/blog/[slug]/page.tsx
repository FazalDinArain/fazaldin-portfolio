import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { getAllPostSlugs, getPostBySlug, getTotalPages } from "@/lib/posts";
import { buildMetadata, pageUrl } from "@/lib/seo";
import { formatPostDateLong } from "@/lib/dates";
import { extractToc } from "@/lib/toc";
import { BlogListing } from "@/components/BlogListing";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

function isBlogPageNumber(slug: string): number | null {
  if (!/^\d+$/.test(slug)) return null;
  const n = parseInt(slug, 10);
  if (n < 2) return null;
  const max = getTotalPages();
  return n <= max ? n : null;
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs().map((slug) => ({ slug }));
  const pages = Array.from({ length: getTotalPages() - 1 }, (_, i) => ({
    slug: String(i + 2),
  }));
  return [...posts, ...pages];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pageNum = isBlogPageNumber(slug);
  if (pageNum) {
    return buildMetadata({
      title: `Blog - Technical Articles & Insights - Page ${pageNum}`,
      description:
        "Technical articles, insights, and lessons learned from building web applications with Laravel and integrating AI-powered features.",
      path: `/blog/${pageNum}/`,
    });
  }
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} - Blog`,
    description: post.description,
    path: `/blog/${slug}/`,
    ogType: "article",
  });
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const pageNum = isBlogPageNumber(slug);
  if (pageNum) {
    return <BlogListing page={pageNum} />;
  }

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    image: post.cover ? pageUrl(post.cover) : pageUrl("/images/og-image.png"),
    mainEntityOfPage: pageUrl(`/blog/${slug}/`),
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <article className="article">
        {post.cover ? (
          <div className="article-cover rounded-lg overflow-hidden mb-10">
            <Image src={post.cover} alt="" width={800} height={450} priority />
          </div>
        ) : null}
        <header className="article-header">
          <h1>{post.title}</h1>
          <div className="article-meta">
            <time dateTime={post.date}>{formatPostDateLong(post.date)}</time>
          </div>
          {post.tags.length > 0 ? (
            <div className="tags-list mt-4">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>
        <TableOfContents items={toc} />
        <MarkdownContent content={post.content} />
        <div className="mt-12">
          <Link href="/blog/" className="back-link">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L5.41422 13L9.70711 17.2929Z" />
            </svg>
            All articles
          </Link>
        </div>
      </article>
      <ScrollToTop />
    </>
  );
}
