import { Suspense } from "react";
import { site } from "@/config/site";
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
    ogImageAlt: `${project.title} — ${site.name}`,
    keywords: project.tags,
  });
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectCaseStudyFallback />}>
      <ProjectCaseStudy params={params} />
    </Suspense>
  );
}
