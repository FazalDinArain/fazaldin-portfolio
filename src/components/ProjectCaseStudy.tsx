import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/projects";
import { extractToc } from "@/lib/toc";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TableOfContents } from "@/components/TableOfContents";

type Params = Promise<{ slug: string }>;

export function ProjectCaseStudyFallback() {
  return (
    <article className="article article--case-study" aria-busy="true">
      <div className="article-cover case-study-skeleton" />
      <header className="article-header">
        <div className="case-study-skeleton h-4 w-48 rounded mb-3" />
        <div className="case-study-skeleton h-10 w-full max-w-xl rounded mb-4" />
        <div className="case-study-skeleton h-5 w-full max-w-2xl rounded" />
      </header>
    </article>
  );
}

export async function ProjectCaseStudy({ params }: { params: Params }) {
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
            width={1600}
            height={900}
            priority
            loading="eager"
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="w-full h-auto"
            style={{ width: "100%", height: "auto" }}
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
