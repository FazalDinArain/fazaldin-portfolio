import { site } from "@/config/site";
import { fetchGitHubContributions } from "@/lib/github-contributions";
import { fetchGitHubProfile } from "@/lib/github-profile";
import { getGitHubUsername } from "@/lib/github";
import { ContributionCalendar } from "@/components/ContributionCalendar";
import { GitHubProfileStatsCard } from "@/components/GitHubProfileStatsCard";
import { GitHubStreakStats } from "@/components/GitHubStreakStats";

export async function GitHubActivity() {
  const username = getGitHubUsername();
  const [contributions, profile] = await Promise.all([
    fetchGitHubContributions(username),
    fetchGitHubProfile(username),
  ]);

  const total = contributions?.total ?? 0;
  const fullyUnavailable = !contributions && !profile;

  return (
    <section className="mb-12" aria-label="GitHub activity">
      <div className="section-header">
        <h2 className="section-heading">GitHub Activity</h2>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link arrow-link--muted shrink-0"
        >
          @{username}
          <svg
            className="arrow-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289C13.9024 5.68342 13.9024 6.31658 14.2929 6.70711L18.5858 11L3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L18.5858 13L14.2929 17.2929C13.9024 17.6834 13.9024 18.3166 14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071L21.7071 12.7071C22.0976 12.3166 22.0976 11.6834 21.7071 11.2929L15.7071 5.29289Z" />
          </svg>
        </a>
      </div>
      <div className="github-activity-panel">
        {fullyUnavailable ? (
          <p className="github-activity-fallback">
            GitHub stats are temporarily unavailable. View my profile on{" "}
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        ) : (
          <>
            {contributions ? (
              <ContributionCalendar days={contributions.days} total={total} />
            ) : (
              <p className="github-activity-fallback github-activity-fallback--inline">
                Contribution graph is temporarily unavailable.
              </p>
            )}
            <div className="github-activity-stats">
              <GitHubStreakStats username={username} />
              {profile ? (
                <GitHubProfileStatsCard
                  profile={profile}
                  totalContributions={total}
                />
              ) : (
                <p className="github-activity-fallback github-activity-fallback--inline">
                  Profile stats are temporarily unavailable.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
