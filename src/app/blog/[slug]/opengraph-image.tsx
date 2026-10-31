import { getPostBySlug } from "@/lib/posts";
import { OgLayout } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  if (/^\d+$/.test(slug)) {
    return OgLayout({ title: `Blog — Page ${slug}` });
  }
  const post = getPostBySlug(slug);
  if (!post) {
    return OgLayout({ title: "Blog" });
  }
  return OgLayout({ title: post.title, subtitle: post.description });
}
