import { Link } from "next-view-transitions";
import type { PostMeta } from "@/lib/posts";
import { formatPostDateShort } from "@/lib/dates";

export function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="post-item">
      <span className="post-date">{formatPostDateShort(post.date)}</span>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-description">{post.description}</p>
    </Link>
  );
}
