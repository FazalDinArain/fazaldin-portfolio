export function parsePostDate(dateStr: string): number {
  const t = Date.parse(dateStr);
  return Number.isNaN(t) ? 0 : t;
}

export function formatPostDateShort(dateStr: string): string {
  const t = parsePostDate(dateStr);
  if (!t) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(t));
}

export function formatPostDateLong(dateStr: string): string {
  const t = parsePostDate(dateStr);
  if (!t) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(t));
}
