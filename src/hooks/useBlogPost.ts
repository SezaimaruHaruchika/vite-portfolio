import { useCallback } from 'react';
import { fetchBlogPost } from '../services/strapi';
import type { BlogPost } from '../types/blog';
import { useFetch, type FetchResult } from './useFetch';

/** ブログ記事を 1 件、documentId で取得するカスタムフック */
export function useBlogPost(documentId: string): FetchResult<BlogPost> {
  const fetcher = useCallback((signal: AbortSignal) => fetchBlogPost(documentId, signal), [documentId]);

  return useFetch(fetcher);
}
