export type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
};

import { githubApiHeaders } from "@/lib/github-api";

const REVALIDATE_SECONDS = 3600;

export async function fetchGitHubProfile(
  username: string,
): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      {
        headers: githubApiHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      login: string;
      name: string | null;
      bio: string | null;
      public_repos: number;
      followers: number;
      following: number;
    };
    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
    };
  } catch {
    return null;
  }
}
