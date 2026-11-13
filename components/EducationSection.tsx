import { education } from "@/config/education";

export function EducationSection() {
  return (
    <section className="mb-12" aria-label="Education">
      <h2 className="section-heading">Education</h2>
      <div className="resume-cards-grid">
        {education.map((entry) => (
          <article key={entry.id} className="resume-card">
            <p className="resume-card-date mb-3">{entry.dateRange}</p>
            <h3 className="resume-card-title">{entry.school}</h3>
            <p className="resume-card-degree mb-0">{entry.degree}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
