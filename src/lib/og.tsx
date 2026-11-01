import { ImageResponse } from "@vercel/og";
import { site } from "@/config/site";
import { themeDark } from "@/config/theme";

export const ogSize = { width: 1200, height: 630 };

function siteHostname(): string {
  try {
    return new URL(site.url).hostname.replace(/^www\./, "");
  } catch {
    return site.url;
  }
}

export function OgLayout({
  title,
  subtitle,
  tags,
}: {
  title: string;
  subtitle?: string;
  tags?: readonly string[];
}) {
  const displayTags = tags?.slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: themeDark.bg,
          color: themeDark.text,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: themeDark.accent,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: themeDark.accent,
            opacity: 0.08,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 26,
              color: themeDark.accent,
              marginBottom: 20,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 26,
                color: themeDark.textSecondary,
                marginTop: 28,
                lineHeight: 1.45,
                maxWidth: 920,
              }}
            >
              {subtitle.slice(0, 180)}
            </div>
          ) : null}
          {displayTags && displayTags.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 36,
              }}
            >
              {displayTags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 20,
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: `1px solid ${themeDark.textSecondary}`,
                    color: themeDark.textSecondary,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: themeDark.textSecondary,
            borderTop: `1px solid ${themeDark.textSecondary}33`,
            paddingTop: 28,
          }}
        >
          <span>{site.jsonLd.jobTitle}</span>
          <span>{siteHostname()}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
