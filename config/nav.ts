export type NavIconName = "home" | "about" | "projects" | "contact";

export const mainNavLinks: {
  href: string;
  label: string;
  icon: NavIconName;
}[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about/", label: "About", icon: "about" },
  { href: "/projects/", label: "Projects", icon: "projects" },
  { href: "/contact/", label: "Contact", icon: "contact" },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname.startsWith(href.replace(/\/$/, ""));
}
