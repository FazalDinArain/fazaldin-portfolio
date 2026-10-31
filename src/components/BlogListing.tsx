import { BlogCard } from "@/components/BlogCard";
import { Pagination } from "@/components/Pagination";
import { getPostsPage } from "@/lib/posts";

export function BlogListing({ page }: { page: number }) {
  const { posts, rangeLabel, totalPages, page: current } = getPostsPage(page);

  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">Blog</h1>
        <p className="page-intro">
          Technical articles, insights, and lessons learned from building web
          applications. I write about Laravel, AI integration, and the challenges
          of delivering reliable software.
        </p>
        <p className="page-stats">{rangeLabel}</p>
      </header>
      <div className="card-list">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination page={current} totalPages={totalPages} />
    </main>
  );
}
