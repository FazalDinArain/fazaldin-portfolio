import { Link } from "next-view-transitions";
import { site } from "@/config/site";
import { getFeaturedProjects } from "@/lib/projects";
// import { getRecentPosts } from "@/lib/posts";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsPlaceholder } from "@/components/ProjectsPlaceholder";
// import { PostRow } from "@/components/PostRow";
import { ArrowLink } from "@/components/ArrowLink";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  const featured = getFeaturedProjects();
  // const recent = getRecentPosts(3);

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    description: site.defaultDescription,
    url: site.url,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: site.name,
      jobTitle: site.jsonLd.jobTitle,
      url: site.url,
    },
  };

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: site.title,
    description: site.defaultDescription,
    url: site.url,
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle: site.jsonLd.jobTitle,
      url: site.url,
      sameAs: [site.github, site.linkedin],
      email: site.email,
      knowsAbout: site.jsonLd.knowsAbout,
    },
  };

  return (
    <>
      <JsonLd data={websiteLd} />
      <JsonLd data={profileLd} />
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

        <section
          className="featured-projects mb-20"
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

        <section className="cta" aria-label="Get in touch">
          <h2>Let&apos;s Work Together</h2>
          <p>
            I&apos;m always up for challenging projects and good technical
            conversations.
          </p>
          <div className="cta-buttons">
            <Link href="/contact/" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/projects/" className="btn-secondary">
              View My Work
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
