import { Link } from "next-view-transitions";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { formatPostDateLong } from "@/lib/dates";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="base-card article-card has-cover"
    >
      {post.cover ? (
        <div className="card-cover">
          <Image
            src={post.cover}
            alt=""
            width={720}
            height={405}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      ) : null}
      <span className="card-meta">{formatPostDateLong(post.date)}</span>
      <span className="card-title">{post.title}</span>
      <span className="card-description">{post.description}</span>
      {post.tags.length > 0 ? (
        <div className="tags-list">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <span className="arrow-link arrow-link--accent">
        Read article
        <svg
          className="arrow-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289C13.9024 5.68342 13.9024 6.31658 14.2929 6.70711L18.5858 11L3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L18.5858 13L14.2929 17.2929C13.9024 17.6834 13.9024 18.3166 14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071L21.7071 12.7071C22.0976 12.3166 22.0976 11.6834 21.7071 11.2929L15.7071 5.29289Z" />
        </svg>
      </span>
    </Link>
  );
}
