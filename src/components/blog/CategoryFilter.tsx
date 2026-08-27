import { useLanguage } from '../../hooks/useLanguage';
import { BLOG_CATEGORIES, type BlogCategory } from '../../types/blog';
import { FilterChip } from '../ui/FilterChip';

interface CategoryFilterProps {
  /** 選択中のカテゴリ（undefined = すべて） */
  selected: BlogCategory | undefined;
  onChange: (category: BlogCategory | undefined) => void;
}

/** ブログのカテゴリフィルター（Figma: Category filter） */
export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-title font-bold text-text">{t.blog.categoryLabel}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.blog.categoryLabel}>
        <FilterChip active={selected === undefined} onClick={() => onChange(undefined)}>
          {t.blog.allCategories}
        </FilterChip>
        {BLOG_CATEGORIES.map((category) => (
          <FilterChip key={category} active={selected === category} onClick={() => onChange(category)}>
            {t.blog.categories[category]}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}
