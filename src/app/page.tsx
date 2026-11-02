import { Link } from "next-view-transitions";
import { site } from "@/config/site";
import { getFeaturedProjects } from "@/lib/projects";
// import { getRecentPosts } from "@/lib/posts";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsPlaceholder } from "@/components/ProjectsPlaceholder";
// import { PostRow } from "@/components/PostRow";
import { ArrowLink } from "@/components/ArrowLink";
import { JsonLd } from "@/components/JsonLd";
import { buildHomeGraphJsonLd } from "@/lib/schema";
import { GitHubActivity } from "@/components/GitHubActivity";

export default function HomePage() {
  const featured = getFeaturedProjects();
  // const recent = getRecentPosts(3);

  return (
    <>
      <JsonLd data={buildHomeGraphJsonLd()} />
      <div className="home-page">
        <section className="hero" aria-label="Introduction">
          <p className="hero-greeting">{site.hero.greeting}</p>
          <h1 className="hero-title">{site.hero.headline}</h1>
          <p className="hero-subtitle">{site.hero.subtitle}</p>
          <div className="hero-tags">
            {site.hero.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="hero-cta">
            <Link href="/projects/" className="btn-primary">
              View My Work
            </Link>
            <Link href="/contact/" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </section>
        <GitHubActivity />
        <section
          className="featured-projects"
          aria-label="Featured projects"
        >
          <div className="section-header">
            <h2 className="section-heading">Featured Projects</h2>
            <ArrowLink href="/projects/" variant="muted">
              View all
            </ArrowLink>
          </div>
          <div className="card-list">
            {featured.length > 0 ? (
              featured.map((p, index) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  priorityImage={index === 0}
                />
              ))
            ) : (
              <ProjectsPlaceholder />
            )}
          </div>
        </section>

        {/* <section className="recent-posts mb-20" aria-label="Recent blog posts">
          <div className="section-header">
            <h2 className="section-heading">Recent Blog Posts</h2>
            <ArrowLink href="/blog/" variant="muted">
              View all
            </ArrowLink>
          </div>
          <div className="posts-list">
            {recent.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </section> */}
      </div>
    </>
  );
}
