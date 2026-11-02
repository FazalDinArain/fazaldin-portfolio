import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteBottomNav } from "@/components/SiteBottomNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeScript } from "@/components/ThemeScript";
import { site } from "@/config/site";
import { themeMeta } from "@/config/theme";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: site.title,
    description: site.defaultDescription,
    path: "/",
    noSuffix: true,
    ogImageAlt: `${site.name} — ${site.hero.headline}`,
    keywords: [...site.hero.tags, ...site.jsonLd.knowsAbout],
  }),
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
    apple: [
      {
        url: "/images/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransitions>
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <head>
          <ThemeScript />
          <meta name="theme-color" content={themeMeta.themeColor} />
        </head>
        <body className={`${inter.variable} ${jetbrains.variable}`}>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <SiteBottomNav />
        </body>
      </html>
    </ViewTransitions>
  );
}
