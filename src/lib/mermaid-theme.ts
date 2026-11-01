export type SiteTheme = "light" | "dark";

export function getSiteTheme(): SiteTheme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/** Mermaid theme tokens aligned with CSS variables in globals.css */
export function getMermaidThemeVariables() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const v = (token: string) => styles.getPropertyValue(token).trim();
  const isLight = getSiteTheme() === "light";

  const bg = v("--color-bg");
  const bgSecondary = v("--color-bg-secondary");
  const bgElevated = v("--color-bg-elevated");
  const text = v("--color-text");
  const textSecondary = v("--color-text-secondary");
  const textMuted = v("--color-text-muted");

  return {
    darkMode: !isLight,
    background: "transparent",
    primaryColor: bgElevated || bgSecondary,
    primaryBorderColor: bgElevated || bgSecondary,
    primaryTextColor: text,
    secondaryColor: bgSecondary,
    secondaryBorderColor: bgSecondary,
    secondaryTextColor: text,
    tertiaryColor: bgSecondary,
    tertiaryBorderColor: bgSecondary,
    tertiaryTextColor: textSecondary,
    lineColor: textMuted,
    textColor: text,
    mainBkg: bgElevated || bgSecondary,
    nodeBorder: bgElevated || bgSecondary,
    clusterBkg: bgSecondary,
    clusterBorder: bgSecondary,
    titleColor: textSecondary,
    edgeLabelBackground: bg,
    fontFamily: "inherit",
    fontSize: "13px",
  };
}
