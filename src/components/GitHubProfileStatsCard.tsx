import type { GitHubProfile } from "@/lib/github-profile";

type Props = {
  profile: GitHubProfile;
  totalContributions: number;
};

export function GitHubProfileStatsCard({
  profile,
  totalContributions,
}: Props) {
  const stats = [
    { label: "Public repos", value: profile.publicRepos },
    { label: "Contributions", value: totalContributions },
    { label: "Followers", value: profile.followers },
    { label: "Following", value: profile.following },
  ] as const;

  return (
    <div className="github-stats-card github-profile-stats">
      {(profile.name ?? profile.bio) && (
        <div className="github-profile-stats-header">
          {profile.name ? (
            <p className="github-profile-stats-name">{profile.name}</p>
          ) : null}
          {profile.bio ? (
            <p className="github-profile-stats-bio">{profile.bio}</p>
          ) : null}
        </div>
      )}
      <dl className="github-profile-stats-grid">
        {stats.map(({ label, value }) => (
          <div key={label} className="github-profile-stat">
            <dt>{label}</dt>
            <dd>{value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
