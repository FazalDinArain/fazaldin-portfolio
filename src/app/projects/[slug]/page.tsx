import { Suspense } from "react";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import {
  ProjectCaseStudy,
  ProjectCaseStudyFallback,
} from "@/components/ProjectCaseStudy";

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

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectCaseStudyFallback />}>
      <ProjectCaseStudy params={params} />
    </Suspense>
  );
}
