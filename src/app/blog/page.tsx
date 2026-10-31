import { buildMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/BlogListing";

export const metadata = buildMetadata({
  title: "Blog - Technical Articles & Insights",
  description:
    "Technical articles, insights, and lessons learned from building web applications with Laravel and integrating AI-powered features.",
  path: "/blog/",
});

export default function BlogIndexPage() {
  return <BlogListing page={1} />;
}
