"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { mainNavLinks, isNavActive } from "@/config/nav";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-nav max-md:justify-end max-md:py-3">
        <nav className="nav-scroll max-md:hidden" aria-label="Main navigation">
          <ul className="nav-list">
            {mainNavLinks.map(({ href, label }) => {
              const active = isNavActive(pathname, href);
              return (
                <li key={href} className="nav-item">
                  <Link
                    href={href}
                    className={`nav-link${active ? " nav-link--active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="nav-end max-md:border-l-0 max-md:px-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
