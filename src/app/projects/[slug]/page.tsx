import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { extractToc } from "@/lib/toc";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TableOfContents } from "@/components/TableOfContents";

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

  const toc = extractToc(project.content);

  return (
    <article className="article article--case-study">
      {project.cover ? (
        <div className="article-cover">
          <Image
            src={project.cover}
            alt=""
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover"
          />
        </div>
      ) : null}
      <header className="article-header">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="card-meta mb-0">
            {project.role} · {project.year}
          </p>
          {project.status === "ongoing" ? (
            <span className="status-badge status--ongoing">Ongoing</span>
          ) : null}
        </div>
        <h1>{project.title}</h1>
        <p className="text-lg case-study-lead">{project.description}</p>
        {project.tags.length > 0 ? (
          <div className="tags-list mt-5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      {toc.length > 0 ? <TableOfContents items={toc} /> : null}
      <MarkdownContent
        content={project.content}
        className="article-content case-study-content"
      />
    </article>
  );
}
