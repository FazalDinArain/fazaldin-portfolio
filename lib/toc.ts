export type TocItem = { id: string; text: string; level: 2 | 3 };

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)$/);
    if (m2) {
      items.push({ level: 2, text: m2[1].trim(), id: slugify(m2[1]) });
      continue;
    }
    const m3 = line.match(/^###\s+(.+)$/);
    if (m3) {
      items.push({ level: 3, text: m3[1].trim(), id: slugify(m3[1]) });
    }
  }
  return items;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
