"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/projects/", label: "Projects" },
  { href: "/contact/", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="nav-scroll">
          <ul className="nav-list">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href);
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
        </div>
        <div className="nav-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
