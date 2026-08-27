import { useCallback } from 'react';
import { fetchUserRepos } from '../services/github';
import type { GitHubRepo } from '../types/github';
import { useFetch, type FetchResult } from './useFetch';

/** GitHub API から指定ユーザーの公開リポジトリを取得するカスタムフック */
export function useGitHubRepos(username: string): FetchResult<GitHubRepo[]> {
  const fetcher = useCallback((signal: AbortSignal) => fetchUserRepos(username, signal), [username]);

  return useFetch(fetcher);
}
