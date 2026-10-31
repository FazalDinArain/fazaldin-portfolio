import { experience } from "@/config/experience";

export function ExperienceSection() {
  return (
    <section className="mb-12" aria-label="Experience">
      <h2 className="section-heading">Experience</h2>
      <div className="experience-panel">
        <ol className="experience-list">
          {experience.map((job) => (
            <li key={job.id} className="experience-list-item">
              <header className="experience-timeline-header">
                <div className="min-w-0">
                  <h3 className="resume-card-title">{job.role}</h3>
                  <p className="resume-card-subtitle">
                    {job.company} · {job.employmentType}
                  </p>
                </div>
                <div className="resume-card-meta">
                  <span className="resume-card-meta-highlight">
                    {job.dateRange}
                  </span>
                  {job.duration ? <span>{job.duration}</span> : null}
                  <span>{job.location}</span>
                </div>
              </header>
              <ul className="resume-card-list">
                {job.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
