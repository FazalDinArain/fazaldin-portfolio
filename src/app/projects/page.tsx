import { getAllProjectsMeta } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsPlaceholder } from "@/components/ProjectsPlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects - Case Studies",
  description:
    "Detailed case studies showcasing problem-solving approach, technical decisions, and measurable impact across various engineering projects.",
  path: "/projects/",
});

export default function ProjectsPage() {
  const projects = getAllProjectsMeta();
  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-intro">
          Detailed case studies showcasing problem-solving approach, technical
          decisions, and measurable impact across various engineering projects.
        </p>
      </header>
      <div className="card-list">
        {projects.length > 0 ? (
          projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))
        ) : (
          <ProjectsPlaceholder />
        )}
      </div>
    </main>
  );
}
