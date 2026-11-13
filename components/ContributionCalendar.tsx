import {
  buildContributionMonthLabels,
  buildContributionWeeks,
  CONTRIBUTION_WEEKDAY_LABELS,
  type ContributionDay,
} from "@/lib/github-contributions";
import { ContributionGraphScroll } from "@/components/ContributionGraphScroll";

type Props = {
  days: ContributionDay[];
  total: number;
};

export function ContributionCalendar({ days, total }: Props) {
  const weeks = buildContributionWeeks(days);
  const monthLabels = buildContributionMonthLabels(weeks);

  return (
    <div className="github-contrib-calendar">
      <p className="github-contrib-summary">
        <strong>{total.toLocaleString()}</strong> contributions in the last year
      </p>
      <ContributionGraphScroll>
        <div
          className="github-contrib-graph-inner"
          role="img"
          aria-label={`${total} GitHub contributions in the last year. Scroll horizontally on small screens to see the full year.`}
        >
          <div className="github-contrib-label-col" aria-hidden>
            <div className="github-contrib-month-spacer" />
            <div className="github-contrib-week github-contrib-week--labels">
              {CONTRIBUTION_WEEKDAY_LABELS.map((label, rowIndex) => (
                <span key={rowIndex} className="github-contrib-day-label">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="github-contrib-graph-main">
            <div className="github-contrib-month-row">
              {monthLabels.map((month, weekIndex) => (
                <span
                  key={weeks[weekIndex]?.[0]?.date ?? `month-${weekIndex}`}
                  className="github-contrib-month-col"
                >
                  {month ?? ""}
                </span>
              ))}
            </div>
            <div className="github-contrib-grid">
              {weeks.map((week, weekIndex) => (
                <div
                  key={week[0]?.date ?? `week-${weekIndex}`}
                  className="github-contrib-week"
                >
                  {week.map((day) => (
                    <span
                      key={day.date}
                      className="github-contrib-cell"
                      data-level={Math.min(day.level, 4)}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContributionGraphScroll>
      <div className="github-contrib-legend" aria-hidden>
        <span>Less</span>
        <span className="github-contrib-cell" data-level={0} />
        <span className="github-contrib-cell" data-level={1} />
        <span className="github-contrib-cell" data-level={2} />
        <span className="github-contrib-cell" data-level={3} />
        <span className="github-contrib-cell" data-level={4} />
        <span>More</span>
      </div>
    </div>
  );
}
