import { ImageResponse } from "@vercel/og";
import { site } from "@/config/site";
import { themeDark } from "@/config/theme";

export const ogSize = { width: 1200, height: 630 };

export function OgLayout({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: themeDark.bg,
          color: themeDark.text,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: themeDark.accent,
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 28,
              color: themeDark.textSecondary,
              marginTop: 32,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {subtitle.slice(0, 160)}
          </div>
        ) : null}
      </div>
    ),
    ogSize,
  );
}
