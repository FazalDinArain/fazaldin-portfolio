import { Link } from "next-view-transitions";
import Image from "next/image";
import type { ProjectMeta } from "@/lib/projects";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="base-card project-card has-cover"
    >
      {project.cover ? (
        <div className="card-cover">
          <Image
            src={project.cover}
            alt=""
            width={720}
            height={405}
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="flex items-center gap-3 mb-3">
        {project.featured ? (
          <span className="featured-badge">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Featured
          </span>
        ) : null}
        {project.status === "ongoing" ? (
          <span className="status-badge status--ongoing">Ongoing</span>
        ) : null}
      </div>
      <span className="card-meta">
        {project.role} · {project.year}
      </span>
      <span className="card-title">{project.title}</span>
      <span className="card-description">{project.description}</span>
      {project.tags.length > 0 ? (
        <div className="tags-list">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 ? (
            <span className="tag">+{project.tags.length - 4}</span>
          ) : null}
        </div>
      ) : null}
      <span className="arrow-link arrow-link--accent">
        View case study
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
