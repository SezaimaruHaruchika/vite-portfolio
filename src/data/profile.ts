/**
 * プロフィール・SNS リンクなど、サイト全体で使う固定情報。
 * 環境変数（.env）から読み込み、未設定のものは undefined にしてリンクを非表示にする。
 */
const githubUsername = import.meta.env.VITE_GITHUB_USERNAME?.trim() || 'SezaimaruHaruchika';
const xUrl = import.meta.env.VITE_X_URL?.trim() || undefined;
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || undefined;

/**
 * About ページのプロフィール画像。
 * public/avatar.jpg などに画像を置いて '/avatar.jpg' を指定する。undefined のときは丸いプレースホルダーを表示。
 */
const avatarUrl = undefined as string | undefined;

export const profile = {
  /** GitHub のユーザー名（Projects ページの取得元にもなる） */
  githubUsername,
  githubUrl: `https://github.com/${githubUsername}`,
  xUrl,
  contactEmail,
  avatarUrl,
  /** About ページに表示する使用技術タグ */
  techStack: ['Node.js', 'TypeScript', 'Vite React', 'Next.js', 'Hono', 'Java'],
} as const;
