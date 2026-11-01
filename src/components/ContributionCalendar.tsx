import {
  buildContributionWeeks,
  type ContributionDay,
} from "@/lib/github-contributions";

type Props = {
  days: ContributionDay[];
  total: number;
};

export function ContributionCalendar({ days, total }: Props) {
  const weeks = buildContributionWeeks(days);

  return (
    <div className="github-contrib-calendar">
      <p className="github-contrib-summary">
        <strong>{total.toLocaleString()}</strong> contributions in the last year
      </p>
      <div className="github-contrib-scroll">
        <div
          className="github-contrib-grid"
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
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
