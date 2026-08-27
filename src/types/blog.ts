/**
 * Strapi の Blog コンテンツタイプに対応する型定義。
 *
 * Strapi 側の設定（Content-Type Builder）:
 *   - title:       Text (Short text)      required
 *   - content:     Rich text (Markdown)   required
 *   - image:       Media (Single image)
 *   - category:    Enumeration (tech / devlog / study / misc) required
 *   - publishedAt: Draft & Publish を有効にすると自動で付与される
 */

/** カテゴリの一覧（Strapi の Enumeration と同じ値） */
export const BLOG_CATEGORIES = ['tech', 'devlog', 'study', 'misc'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const isBlogCategory = (value: unknown): value is BlogCategory =>
  typeof value === 'string' && (BLOG_CATEGORIES as readonly string[]).includes(value);

/** Strapi の Media（画像）フィールド */
export interface StrapiImage {
  id: number;
  documentId: string;
  /** "/uploads/xxx.png" のような相対パス、または絶対 URL */
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large', StrapiImageFormat>>;
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

/** ブログ記事 1 件 */
export interface BlogPost {
  id: number;
  /** Strapi v5 の一意な ID。詳細ページの URL に使う */
  documentId: string;
  title: string;
  /** Markdown 形式の本文 */
  content: string;
  category: BlogCategory;
  publishedAt: string;
  image: StrapiImage | null;
}

/** Strapi のページネーション情報 */
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** 一覧取得（GET /api/blogs）のレスポンス */
export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}

/** 1 件取得（GET /api/blogs/:documentId）のレスポンス */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}

/** 一覧取得時の検索条件 */
export interface BlogQuery {
  page: number;
  pageSize: number;
  category?: BlogCategory;
}

/** 一覧取得の結果（記事 + ページ情報） */
export interface BlogListResult {
  posts: BlogPost[];
  pagination: StrapiPagination;
}
