import { site } from "@/config/site";

export function getGitHubUsername(): string {
  const match = site.github.match(/github\.com\/([^/?#]+)/i);
  if (!match?.[1]) {
    throw new Error("site.github must be a valid GitHub profile URL");
  }
  return match[1];
}

type SiteTheme = "dark" | "light";

const palette = {
  dark: {
    panel: "0a0a0a",
    border: "262626",
    title: "e5e5e5",
    text: "a3a3a3",
    accent: "e5484d",
  },
  light: {
    panel: "ffffff",
    border: "e5e5e5",
    title: "171717",
    text: "525252",
    accent: "e5484d",
  },
} as const;

export function githubStreakStatsUrl(username: string, theme: SiteTheme): string {
  const c = palette[theme];
  const params = new URLSearchParams({
    user: username,
    hide_border: "true",
    background: c.panel,
    border: c.border,
    stroke: c.border,
    ring: c.accent,
    fire: c.accent,
    currStreakNum: c.title,
    sideNums: c.text,
    currStreakLabel: c.text,
    sideLabels: c.text,
    dates: c.text,
  });
  return `https://streak-stats.demolab.com/?${params}`;
}
