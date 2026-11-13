import { seoMeta } from "@/config/seo-meta";
import { buildMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/BlogListing";

export const metadata = buildMetadata({
  title: seoMeta.blogTitle,
  description: seoMeta.blogDescription,
  path: "/blog/",
  keywords: ["Laravel", "REST APIs", "React", "Next.js", "web development"],
});

export default function BlogIndexPage() {
  return <BlogListing page={1} />;
}
