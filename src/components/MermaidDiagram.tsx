"use client";

import { useEffect, useRef, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#161b22",
          primaryTextColor: "#f0f6fc",
        },
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
  }, [chart]);

  return (
    <div
      ref={ref}
      className="my-8 rounded-lg border p-4 text-center overflow-x-auto"
      style={{ background: "#161b22", borderColor: "var(--color-border)" }}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
