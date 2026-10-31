import { getProjectBySlug } from "@/lib/projects";
import { OgLayout } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return OgLayout({ title: "Projects" });
  }
  return OgLayout({ title: project.title, subtitle: project.description });
}
