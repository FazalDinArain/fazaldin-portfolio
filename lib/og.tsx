import { ImageResponse } from "@vercel/og";
import { themeDark } from "@/config/theme";

export const ogSize = { width: 1200, height: 630 };

const ogBorder = "#262626";
const dotGrid = `radial-gradient(circle, rgba(229, 72, 77, 0.12) 1.5px, transparent 1.5px)`;

type OgFontData = {
  regular: ArrayBuffer;
  medium: ArrayBuffer;
  bold: ArrayBuffer;
};

let fontsPromise: Promise<OgFontData> | undefined;

async function loadOgFonts(): Promise<OgFontData> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetch(
        "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff",
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.woff",
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-700-normal.woff",
      ).then((res) => res.arrayBuffer()),
    ]).then(([regular, medium, bold]) => ({ regular, medium, bold }));
  }
  return fontsPromise;
}

export async function OgLayout({
  greeting,
  title,
  subtitle,
  tags,
}: {
  greeting?: string;
  title: string;
  subtitle?: string;
  tags?: readonly string[];
}) {
  const displayTags = tags?.slice(0, 5);
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "36px 36px",
          background: themeDark.bg,
          backgroundImage: dotGrid,
          backgroundSize: "24px 24px",
          color: themeDark.text,
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {greeting ? (
            <div
              style={{
                fontSize: 30,
                color: themeDark.accent,
                marginBottom: 20,
                fontWeight: 500,
              }}
            >
              {greeting}
            </div>
          ) : null}
          <div
            style={{
              fontSize: greeting ? 34 : 32,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 31,
                color: themeDark.textSecondary,
                marginTop: 24,
                lineHeight: 1.3,
                fontWeight: 400,
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
                gap: 10,
                marginTop: 28,
              }}
            >
              {displayTags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 23,
                    padding: "8px 14px",
                    borderRadius: 4,
                    border: `1px solid ${ogBorder}`,
                    background: themeDark.bg,
                    color: themeDark.textSecondary,
                    fontWeight: 400,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "JetBrains Mono",
          data: fonts.regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "JetBrains Mono",
          data: fonts.medium,
          weight: 500,
          style: "normal",
        },
        {
          name: "JetBrains Mono",
          data: fonts.bold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
