/** 習熟度（6 段階） */
export type SkillLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SkillCategoryId = 'frontend' | 'backend' | 'infra';

export interface Skill {
  name: string;
  level: SkillLevel;
  /** 経験年数 */
  years: number;
}

export interface SkillCategory {
  id: SkillCategoryId;
  /** カード左上の番号ラベル（"01" など） */
  number: string;
  /** 英語のカテゴリ名（"FRONTEND" など） */
  label: string;
  skills: Skill[];
}
