/**
 * プロフィール・SNS リンクなど、サイト全体で使う固定情報。
 * 環境変数（.env）から読み込み、未設定のものは undefined にしてリンクを非表示にする。
 */
const githubUsername = import.meta.env.VITE_GITHUB_USERNAME?.trim() || 'SezaimaruHaruchika';
const xUrl = import.meta.env.VITE_X_URL?.trim() || undefined;
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || undefined;

import avatarImage from '../assets/avatar.webp';

/**
 * About ページのプロフィール画像。
 * src/assets/avatar.webp（円形トリミング済み・560px）を Vite 経由でバンドルする。
 * public/ の固定 URL ではなくハッシュ付きアセットになるため、URL を推測して直接取得されにくい。
 * 画像を外したいときは undefined に戻すと丸いプレースホルダー表示になる。
 */
const avatarUrl = avatarImage as string | undefined;

export const profile = {
  /** GitHub のユーザー名（Projects ページの取得元にもなる） */
  githubUsername,
  githubUrl: `https://github.com/${githubUsername}`,
  xUrl,
  contactEmail,
  avatarUrl,
  /** About ページに表示する使用技術タグ（Skills ページの内容と揃える） */
  techStack: ['TypeScript', 'React (Vite)', 'Next.js', 'Node.js', 'Python (Django)', 'PHP', 'Java', 'Strapi'],
} as const;
