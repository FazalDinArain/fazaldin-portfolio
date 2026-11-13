"use client";

import { useEffect, useState } from "react";
import { githubStreakStatsUrl } from "@/lib/github";

function useSiteTheme(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const read = () => {
      const value = document.documentElement.getAttribute("data-theme");
      setTheme(value === "light" ? "light" : "dark");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

type Props = {
  username: string;
};

export function GitHubStreakStats({ username }: Props) {
  const theme = useSiteTheme();
  const src = githubStreakStatsUrl(username, theme);

  return (
    <div className="github-stats-card github-streak-stats-card">
      {/* eslint-disable-next-line @next/next/no-img-element -- third-party SVG; theme-specific URL */}
      <img
        key={theme}
        src={src}
        alt={`${username} GitHub contribution streak`}
        className="github-activity-stat"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
