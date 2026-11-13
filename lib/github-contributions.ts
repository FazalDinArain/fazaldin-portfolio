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

/** Last ~53 weeks; each column is Mon–Sun (Mon top, Sun bottom). */
export function buildContributionWeeks(
  days: ContributionDay[],
  weeks = 53,
): ContributionDay[][] {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const lastDate = days.at(-1)?.date ?? new Date().toISOString().slice(0, 10);
  const end = parseUtcDate(lastDate);

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - weeks * 7 + 1);
  while (start.getUTCDay() !== 1) {
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

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Mon / Wed / Fri / Sun beside rows (Mon = index 0, Sun = index 6). */
export const CONTRIBUTION_WEEKDAY_LABELS = [
  "Mon",
  "",
  "Wed",
  "",
  "Fri",
  "",
  "Sun",
] as const;

/** One label per week column; null when GitHub would leave the slot empty. */
export function buildContributionMonthLabels(
  weeks: ContributionDay[][],
): (string | null)[] {
  return weeks.map((week, weekIndex) => {
    if (week.length === 0) return null;

    for (const day of week) {
      const d = parseUtcDate(day.date);
      if (d.getUTCDate() === 1) {
        return MONTH_SHORT[d.getUTCMonth()];
      }
    }

    if (weekIndex === 0) {
      return MONTH_SHORT[parseUtcDate(week[0].date).getUTCMonth()];
    }

    const first = parseUtcDate(week[0].date);
    const prevWeek = weeks[weekIndex - 1];
    const prevLast = parseUtcDate(prevWeek[prevWeek.length - 1].date);
    if (first.getUTCMonth() !== prevLast.getUTCMonth()) {
      return MONTH_SHORT[first.getUTCMonth()];
    }

    return null;
  });
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
