import type { SkillLevel as SkillLevelValue } from '../../types/skill';

interface SkillLevelProps {
  level: SkillLevelValue;
  label?: string;
}

const MAX_LEVEL = 5;

/** 習熟度バー（Figma: skill-level-light。5 段階を 1 本の連続バーで表現） */
export function SkillLevel({ level, label }: SkillLevelProps) {
  return (
    <div
      className="h-2 w-60 max-w-full overflow-hidden rounded-sm bg-border"
      role="meter"
      aria-valuemin={1}
      aria-valuemax={MAX_LEVEL}
      aria-valuenow={level}
      aria-label={label}
    >
      <div
        className="h-full origin-left rounded-sm bg-accent animate-grow"
        style={{ width: `${(level / MAX_LEVEL) * 100}%` }}
      />
    </div>
  );
}
