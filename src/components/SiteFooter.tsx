import { site } from "@/config/site";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <span className="copyright">
          &copy; {year} {site.name}
        </span>
        {/* <div className="footer-social">
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <span className="separator">&middot;</span>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            Linkedin
          </a>
        </div> */}
      </div>
    </footer>
  );
}
