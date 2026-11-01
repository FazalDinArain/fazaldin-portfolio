/**
 * Hex colors for surfaces that cannot read CSS variables (OG images, meta theme-color).
 * Keep in sync with `:root` in src/app/globals.css when changing the default dark theme.
 * Also update public/site.webmanifest background_color / theme_color if needed.
 */
export const themeDark = {
  bg: "#0a0a0a",
  text: "#e5e5e5",
  textSecondary: "#a3a3a3",
  accent: "#e5484d",
} as const;

export const themeMeta = {
  themeColor: themeDark.bg,
} as const;
