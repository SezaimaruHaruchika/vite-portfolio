import type { SkillCategory } from '../types/skill';

/**
 * Skills ページに表示するスキル一覧（Figma の Skills 画面と同じ内容）。
 * カテゴリ名・説明文は言語によって変わるため i18n 側（skills.categories）で持ち、
 * ここには言語に依存しないデータだけを置く。
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
      { name: 'Vite', level: 3, years: 1 },
    ],
  },
  {
    id: 'backend',
    number: '02',
    label: 'BACKEND',
    skills: [
      { name: 'Node.js', level: 4, years: 2 },
      { name: 'Hono', level: 3, years: 1 },
      { name: 'Java', level: 3, years: 2 },
      { name: 'Strapi', level: 2, years: 1 },
    ],
  },
  {
    id: 'infra',
    number: '03',
    label: 'INFRA / TOOLS',
    skills: [
      { name: 'Git', level: 4, years: 2 },
      { name: 'Docker', level: 2, years: 1 },
      { name: 'Figma', level: 3, years: 1 },
      { name: 'PostgreSQL', level: 2, years: 1 },
    ],
  },
];
