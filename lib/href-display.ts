/** Human-readable host + path for external profile links (no protocol). */
export function hrefDisplay(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname.replace(/\/$/, "");
    return path && path !== "/" ? `${host}${path}` : host;
  } catch {
    return url;
  }
}
