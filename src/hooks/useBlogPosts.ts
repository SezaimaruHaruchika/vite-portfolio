import { useCallback } from 'react';
import { fetchBlogPosts } from '../services/strapi';
import type { BlogCategory, BlogListResult } from '../types/blog';
import { useFetch, type FetchResult } from './useFetch';

/** 1 ページあたりの記事数（Figma の一覧は 5 件） */
export const BLOG_PAGE_SIZE = 5;

/**
 * ブログ記事一覧を Strapi から取得するカスタムフック。
 * page / category が変わると自動で再取得される。
 */
export function useBlogPosts(page: number, category?: BlogCategory): FetchResult<BlogListResult> {
  const fetcher = useCallback(
    (signal: AbortSignal) => fetchBlogPosts({ page, pageSize: BLOG_PAGE_SIZE, category }, signal),
    [page, category],
  );

  return useFetch(fetcher);
}
