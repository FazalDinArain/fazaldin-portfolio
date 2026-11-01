export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type NestedContributionsResponse = {
  total: Record<string, number>;
  contributions: Record<
    string,
    Record<string, Record<string, ContributionDay>>
  >;
};

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";
const REVALIDATE_SECONDS = 3600;

function flattenContributions(data: NestedContributionsResponse): ContributionDay[] {
  const days: ContributionDay[] = [];
  for (const year of Object.values(data.contributions)) {
    for (const month of Object.values(year)) {
      for (const day of Object.values(month)) {
        days.push(day);
      }
    }
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export function sumContributionTotals(total: Record<string, number>): number {
  return Object.values(total).reduce((sum, n) => sum + n, 0);
}

/** Last ~53 weeks, columns are weeks (Sun–Sat), rows are weekdays. */
export function buildContributionWeeks(
  days: ContributionDay[],
  weeks = 53,
): ContributionDay[][] {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const lastDate = days.at(-1)?.date ?? new Date().toISOString().slice(0, 10);
  const end = parseUtcDate(lastDate);

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - weeks * 7 + 1);
  while (start.getUTCDay() !== 0) {
    start.setUTCDate(start.getUTCDate() - 1);
  }

  const columns: ContributionDay[][] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const week: ContributionDay[] = [];
    for (let i = 0; i < 7; i++) {
      const key = formatUtcDate(cursor);
      week.push(
        byDate.get(key) ?? { date: key, count: 0, level: 0 },
      );
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    columns.push(week);
  }

  return columns;
}

function parseUtcDate(isoDate: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function fetchGitHubContributions(
  username: string,
): Promise<{ days: ContributionDay[]; total: number } | null> {
  try {
    const res = await fetch(
      `${CONTRIBUTIONS_API}/${encodeURIComponent(username)}?format=nested`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as NestedContributionsResponse;
    return {
      days: flattenContributions(data),
      total: sumContributionTotals(data.total),
    };
  } catch {
    return null;
  }
}
