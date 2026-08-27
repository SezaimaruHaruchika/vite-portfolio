import type { GitHubRepo } from '../types/github';
import { fetchJson } from './http';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * 指定ユーザーの公開リポジトリを取得する。
 * 例: GET https://api.github.com/users/sezaimaru/repos?sort=pushed&per_page=100
 *
 * 認証なしでも利用できる（1 時間あたり 60 リクエストまで）。
 * フォークしたリポジトリは除外し、最近 push した順に並べて返す。
 */
export async function fetchUserRepos(username: string, signal?: AbortSignal): Promise<GitHubRepo[]> {
  const params = new URLSearchParams({
    type: 'owner',
    sort: 'pushed',
    direction: 'desc',
    per_page: '100',
  });

  const repos = await fetchJson<GitHubRepo[]>(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?${params}`,
    signal,
    { headers: { Accept: 'application/vnd.github+json' } },
  );

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}
