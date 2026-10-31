import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ArrowLink } from "@/components/ArrowLink";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} - Projects`,
    description: project.description,
    path: `/projects/${slug}/`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="article">
      {project.cover ? (
        <div className="article-cover rounded-lg overflow-hidden mb-10">
          <Image src={project.cover} alt="" width={800} height={450} priority />
        </div>
      ) : null}
      <header className="article-header">
        <p className="card-meta mb-2">
          {project.role} · {project.year}
        </p>
        <h1>{project.title}</h1>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          {project.description}
        </p>
      </header>
      <MarkdownContent content={project.content} />
      <div className="mt-12 flex gap-6">
        <ArrowLink href="/projects/" variant="muted">
          All projects
        </ArrowLink>
        <Link href="/contact/" className="btn-primary">
          Get in Touch
        </Link>
      </div>
    </article>
  );
}
