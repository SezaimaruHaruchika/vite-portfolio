import { useLanguage } from '../../hooks/useLanguage';
import type { SkillCategory } from '../../types/skill';
import { SkillRow } from './SkillRow';

interface SkillCardProps {
  category: SkillCategory;
}

/** カテゴリ別スキルカード（Figma: skill-card-light） */
export function SkillCard({ category }: SkillCardProps) {
  const { t } = useLanguage();
  const text = t.skills.categories[category.id];

  return (
    <section
      className="flex w-full flex-col gap-4 rounded-md border border-border bg-surface p-6 max-pc:p-4"
      aria-labelledby={`skill-${category.id}`}
    >
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-title font-bold text-accent">
          <span className="font-mono font-medium">{category.number}</span>
          <span>{category.label}</span>
        </p>
        <h2 id={`skill-${category.id}`} className="text-h3 font-bold text-text">
          {text.title}
        </h2>
        <p className="text-caption leading-[1.4] text-text-secondary">{text.description}</p>
      </div>

      <hr className="h-px w-full border-0 bg-text" />

      <ul className="flex flex-col gap-2">
        {category.skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </ul>
    </section>
  );
}
