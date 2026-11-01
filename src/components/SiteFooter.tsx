import { site } from "@/config/site";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <span className="copyright">
          &copy; {year} {site.name}
        </span>
        <div className="footer-social">
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="separator" aria-hidden>
            &middot;
          </span>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
