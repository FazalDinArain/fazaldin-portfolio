import { Link } from "next-view-transitions";
import { site } from "@/config/site";

export function ProjectsPlaceholder() {
  return (
    <div
      className="rounded-lg border p-8 text-center"
      style={{
        background: "var(--color-bg-secondary)",
        borderColor: "var(--color-border)",
      }}
    >
      <p
        className="text-lg font-semibold mb-2"
        style={{ color: "var(--color-text)" }}
      >
        Case studies coming soon
      </p>
      <p
        className="text-base leading-relaxed max-w-md mx-auto mb-6"
        style={{ color: "var(--color-text-secondary)" }}
      >
        I&apos;m preparing detailed write-ups for selected Laravel and full-stack
        work. In the meantime, see my experience on{" "}
        <Link href="/about/" className="underline underline-offset-2">
          About
        </Link>{" "}
        or reach out via{" "}
        <Link href="/contact/" className="underline underline-offset-2">
          Contact
        </Link>
        .
      </p>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary inline-block"
      >
        View GitHub
      </a>
    </div>
  );
}
