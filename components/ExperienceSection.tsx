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
                <div className="experience-timeline-row experience-timeline-row--title">
                  <h3 className="resume-card-title mb-0 min-w-0">
                    {job.role}
                  </h3>
                  <p className="resume-card-meta-highlight experience-timeline-dates mb-0 shrink-0">
                    {job.dateRange}
                    {job.duration ? (
                      <span className="resume-card-meta-duration">
                        {" | "}
                        {job.duration}
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="experience-timeline-row">
                  <p className="resume-card-subtitle mb-0 min-w-0">
                    {job.company} · {job.employmentType}
                  </p>
                  <p className="experience-timeline-location mb-0 shrink-0">
                    {job.location}
                  </p>
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
