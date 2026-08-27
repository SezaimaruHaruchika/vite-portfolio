import { useLanguage } from '../../hooks/useLanguage';
import type { Skill } from '../../types/skill';
import { SkillLevel } from './SkillLevel';

interface SkillRowProps {
  skill: Skill;
}

/** スキル 1 行（名前 + 習熟度バー + 経験年数。Figma: skill-row-light） */
export function SkillRow({ skill }: SkillRowProps) {
  const { t } = useLanguage();

  return (
    <li className="grid min-h-10 grid-cols-[160px_240px_1fr] items-center gap-4 max-pc:grid-cols-[96px_minmax(0,1fr)_auto] max-pc:gap-3">
      <span className="text-title font-bold text-text">{skill.name}</span>
      <SkillLevel level={skill.level} label={skill.name} />
      <span className="text-right text-caption whitespace-nowrap text-text-secondary">
        {t.skills.years(skill.years)}
      </span>
    </li>
  );
}
