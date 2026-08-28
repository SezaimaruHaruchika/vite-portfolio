import type { SkillCategory } from '../types/skill';

/**
 * Skills ページに表示するスキル一覧。
 * カテゴリ名・説明文は言語によって変わるため i18n 側（skills.categories）で持ち、
 * ここには言語に依存しないデータだけを置く。
 * years に 1 未満（例: 0.5）を入れると「1 年未満」と表示される。
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    number: '01',
    label: 'FRONTEND',
    skills: [
      { name: 'TypeScript', level: 4, years: 2 },
      { name: 'React', level: 4, years: 2 },
      { name: 'Next.js', level: 3, years: 1 },
      { name: 'Vite', level: 3, years: 2 },
    ],
  },
  {
    id: 'backend',
    number: '02',
    label: 'BACKEND',
    skills: [
      { name: 'Python (Django)', level: 4, years: 3 },
      { name: 'PHP', level: 4, years: 3 },
      { name: 'Node.js', level: 4, years: 2 },
      { name: 'Express', level: 3, years: 2 },
      { name: 'Hono', level: 3, years: 2 },
      { name: 'Java', level: 3, years: 2 },
      { name: 'Strapi', level: 2, years: 0.5 },
    ],
  },
  {
    id: 'infra',
    number: '03',
    label: 'INFRA / TOOLS',
    skills: [
      { name: 'Git', level: 4, years: 4 },
      { name: 'Figma', level: 3, years: 2 },
      { name: 'DB Browser for SQLite', level: 3, years: 2 },
      { name: 'Cloudflare D1 / R2', level: 3, years: 2 },
      { name: 'AWS (EC2 / Route 53)', level: 2, years: 0.5 },
    ],
  },
];
