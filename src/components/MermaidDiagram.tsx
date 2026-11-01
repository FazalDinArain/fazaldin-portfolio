"use client";

import { useEffect, useRef, useState } from "react";
import {
  getMermaidThemeVariables,
  getSiteTheme,
  type SiteTheme,
} from "@/lib/mermaid-theme";

const flowchartConfig = {
  curve: "basis" as const,
  padding: 20,
  nodeSpacing: 48,
  rankSpacing: 72,
  htmlLabels: true,
  wrappingWidth: 200,
  subGraphTitleMargin: { top: 16, bottom: 28 },
};

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [theme, setTheme] = useState<SiteTheme>("dark");

  useEffect(() => {
    setTheme(getSiteTheme());
    const obs = new MutationObserver(() => {
      setTheme(getSiteTheme());
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: getMermaidThemeVariables(),
        flowchart: flowchartConfig,
      });
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      try {
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled && ref.current) {
          ref.current.textContent = chart;
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  return (
    <div
      ref={ref}
      className="mermaid-diagram my-8 rounded-md border p-6 md:p-8 overflow-x-auto"
      data-theme={theme}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
