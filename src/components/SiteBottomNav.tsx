"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { mainNavLinks, isNavActive } from "@/config/nav";
import { NavIcon } from "@/components/NavIcon";

export function SiteBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="site-bottom-nav fixed inset-x-0 bottom-0 z-[100] border-t"
      aria-label="Main navigation"
    >
      <ul className="bottom-nav-list">
        {mainNavLinks.map(({ href, label, icon }) => {
          const active = isNavActive(pathname, href);
          return (
            <li key={href} className="bottom-nav-item">
              <Link
                href={href}
                className={`bottom-nav-link${active ? " bottom-nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <NavIcon name={icon} />
                <span className="bottom-nav-label">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
