import { about } from "@/config/about";
import { site } from "@/config/site";
import { skillCategories } from "@/config/skills";
import { buildMetadata } from "@/lib/seo";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { GitHubActivity } from "@/components/GitHubActivity";

export const metadata = buildMetadata({
  title: "About - Background & Skills",
  description: about.intro[0],
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div className="page-container about-page">
      <header className="page-header">
        <h1 className="page-title">About</h1>
        <p
          className="text-base font-medium mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          {about.role}
        </p>
        <div className="space-y-4">
          {about.intro.map((paragraph) => (
            <p key={paragraph} className="page-intro mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 mb-0">
          <a href={site.cvUrl} download className="btn-secondary">
            Download CV
          </a>
        </p>
      </header>

      <section className="skills-section mb-12" aria-label="Technologies">
        <h2 className="section-heading">Technologies I work with</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skillCategories.map((cat) => (
            <div key={cat.name} className="skill-card">
              <h3 className="skill-card-title">{cat.name}</h3>
              <div className="tags-list mb-0">
                {cat.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <GitHubActivity />

      <ExperienceSection />
      <EducationSection />

      <p
        className="page-intro mb-12"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {about.closing}
      </p>
    </div>
  );
}
