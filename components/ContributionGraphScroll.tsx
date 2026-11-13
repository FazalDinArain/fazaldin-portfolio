"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function ContributionGraphScroll({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const canScroll = el.scrollWidth > el.clientWidth + 1;
    setScrollable(canScroll);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollToLatest = () => {
      if (!motionQuery.matches) {
        el.scrollLeft = el.scrollWidth - el.clientWidth;
      }
      updateEdges();
    };

    scrollToLatest();

    const onMotionChange = () => scrollToLatest();
    motionQuery.addEventListener("change", onMotionChange);
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
    };
  }, [updateEdges]);

  const edgeClass = [
    "github-contrib-scroll-outer",
    scrollable ? "is-scrollable" : "",
    atStart ? "is-at-start" : "",
    atEnd ? "is-at-end" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={edgeClass}>
      <div ref={scrollRef} className="github-contrib-scroll">
        {children}
      </div>
    </div>
  );
}
