/**
 * ルート（URL）の定義。
 * 文字列を各所に直接書かず、ここから参照することでタイプミスを防ぐ。
 */
export const ROUTES = {
  home: '/',
  about: '/about',
  skills: '/skills',
  projects: '/projects',
  blog: '/blog',
  blogDetail: (id: string) => `/blog/${id}`,
  contact: '/contact',
} as const;

/** ヘッダー・フッターに並べるナビゲーション項目（i18n のキーと対応） */
export const NAV_ITEMS = [
  { key: 'about', path: ROUTES.about },
  { key: 'skills', path: ROUTES.skills },
  { key: 'blog', path: ROUTES.blog },
  { key: 'projects', path: ROUTES.projects },
  { key: 'contact', path: ROUTES.contact },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'];
