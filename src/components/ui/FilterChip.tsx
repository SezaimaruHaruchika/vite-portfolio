import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

interface FilterChipProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

/** カテゴリフィルター用のチップ（選択中はアクセントカラー） */
export function FilterChip({ children, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center rounded-pill border px-4 py-2 text-caption whitespace-nowrap transition-colors',
        active
          ? 'border-accent bg-accent text-on-accent'
          : 'border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text',
      )}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
