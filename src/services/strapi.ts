import type {
  BlogListResult,
  BlogPost,
  BlogQuery,
  StrapiListResponse,
  StrapiSingleResponse,
} from '../types/blog';
import { fetchJson } from './http';

/** Strapi のベース URL（.env の VITE_STRAPI_URL。未設定ならローカル） */
export const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');

const BLOG_ENDPOINT = `${STRAPI_URL}/api/blogs`;

/**
 * ブログ記事の一覧を取得する。
 * 例: GET /api/blogs?populate=image&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=5
 */
export async function fetchBlogPosts(query: BlogQuery, signal?: AbortSignal): Promise<BlogListResult> {
  const params = new URLSearchParams({
    populate: 'image',
    sort: 'publishedAt:desc',
    'pagination[page]': String(query.page),
    'pagination[pageSize]': String(query.pageSize),
  });

  // カテゴリで絞り込み（"すべて" のときは付けない）
  if (query.category) {
    params.set('filters[category][$eq]', query.category);
  }

  const response = await fetchJson<StrapiListResponse<BlogPost>>(`${BLOG_ENDPOINT}?${params}`, signal);

  return {
    posts: response.data,
    pagination: response.meta.pagination,
  };
}

/**
 * ブログ記事を 1 件取得する。
 * 例: GET /api/blogs/abc123xyz?populate=image
 */
export async function fetchBlogPost(documentId: string, signal?: AbortSignal): Promise<BlogPost> {
  const params = new URLSearchParams({ populate: 'image' });
  const response = await fetchJson<StrapiSingleResponse<BlogPost>>(
    `${BLOG_ENDPOINT}/${encodeURIComponent(documentId)}?${params}`,
    signal,
  );
  return response.data;
}

/**
 * Strapi の画像 URL を表示用の絶対 URL に変換する。
 * ローカルアップロードの場合 "/uploads/xxx.png" のような相対パスで返ってくるため、
 * ベース URL を前に付ける（S3 などの絶対 URL はそのまま返す）。
 */
export function resolveStrapiMediaUrl(url: string): string {
  return /^https?:\/\//.test(url) ? url : `${STRAPI_URL}${url}`;
}
