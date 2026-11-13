"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  if (items.length === 0) return null;

  return (
    <div className="table-of-contents">
      <button
        type="button"
        className="toc-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="toc-title">On this page</span>
        <span className="toc-count">{items.length} sections</span>
        <svg
          className="ml-2 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open ? (
        <ul className="list-none px-5 pb-4 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? "pl-4" : undefined}
            >
              <a
                href={`#${item.id}`}
                className="text-sm no-underline hover:underline"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
