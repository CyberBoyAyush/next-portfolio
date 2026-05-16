import { createFileRoute } from '@tanstack/react-router';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  archived: boolean;
}

export interface GitHubStatsResponse {
  username: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguages: Array<{ language: string; count: number }>;
  joinedYear: number;
  fetchedAt: string;
}

const USERNAME = 'cyberboyayush';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'aysh-me-portfolio',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  }
  return (await res.json()) as T;
}

const PER_PAGE = 100;
// Hard cap on pages to keep the unauthenticated rate-limit budget safe.
// 5 pages × 100 repos = 500 owner repos, which is well beyond Ayush's current 73.
const MAX_REPO_PAGES = 5;

async function fetchAllOwnerRepos(): Promise<GitHubRepo[]> {
  const all: GitHubRepo[] = [];
  for (let page = 1; page <= MAX_REPO_PAGES; page++) {
    const repos = await fetchJson<GitHubRepo[]>(
      `https://api.github.com/users/${USERNAME}/repos?per_page=${PER_PAGE}&type=owner&page=${page}`,
    );
    all.push(...repos);
    if (repos.length < PER_PAGE) break;
  }
  return all;
}

async function getStats(): Promise<GitHubStatsResponse> {
  const [user, repos] = await Promise.all([
    fetchJson<GitHubUser>(`https://api.github.com/users/${USERNAME}`),
    fetchAllOwnerRepos(),
  ]);

  const ownRepos = repos.filter((r) => !r.fork && !r.archived);
  const totalStars = ownRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = ownRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  const langCounts = new Map<string, number>();
  for (const repo of ownRepos) {
    if (!repo.language) continue;
    langCounts.set(repo.language, (langCounts.get(repo.language) || 0) + 1);
  }
  const topLanguages = Array.from(langCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language, count]) => ({ language, count }));

  return {
    username: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    totalForks,
    topLanguages,
    joinedYear: new Date(user.created_at).getUTCFullYear(),
    fetchedAt: new Date().toISOString(),
  };
}

export const Route = createFileRoute('/api/github-stats')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const stats = await getStats();
          return Response.json(stats, {
            headers: {
              // Cache for 1 hour at the edge / shared caches, allow stale-while-revalidate.
              // Overrides Nitro's default `Cache-Control: no-store, max-age=0` for /api/**.
              'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
            },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          return Response.json(
            { error: 'Failed to load GitHub stats', message },
            { status: 502, headers: { 'Cache-Control': 'no-store' } },
          );
        }
      },
    },
  },
});
