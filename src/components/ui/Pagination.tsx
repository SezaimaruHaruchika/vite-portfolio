import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useLanguage } from '../../hooks/useLanguage';
import { cx } from '../../utils/cx';

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

const buttonClass = (active = false) =>
  cx(
    'inline-flex size-10 items-center justify-center rounded-sm border transition-colors disabled:cursor-not-allowed disabled:opacity-40',
    active
      ? 'border-accent bg-accent text-on-accent'
      : 'border-border bg-surface text-text-secondary enabled:hover:border-border-strong enabled:hover:text-text',
  );

/** 表示するページ番号を最大 5 個に絞る（現在ページを中心に前後 2 ページ） */
const getVisiblePages = (page: number, pageCount: number): number[] => {
  const maxVisible = 5;
  const start = Math.max(1, Math.min(page - 2, pageCount - maxVisible + 1));
  const end = Math.min(pageCount, start + maxVisible - 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
};

/** ページ送り（Figma: pagination-light） */
export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  const { t } = useLanguage();

  if (pageCount <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="pagination">
      <button
        type="button"
        className={buttonClass()}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t.blog.prevPage}
      >
        <IconChevronLeft size={24} aria-hidden="true" />
      </button>

      {getVisiblePages(page, pageCount).map((n) => (
        <button
          key={n}
          type="button"
          className={cx(buttonClass(n === page), 'font-mono text-[16px] font-medium')}
          onClick={() => onChange(n)}
          aria-label={t.blog.pageLabel(n)}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className={buttonClass()}
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label={t.blog.nextPage}
      >
        <IconChevronRight size={24} aria-hidden="true" />
      </button>
    </nav>
  );
}
