import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
}

/** トップページのナビゲーションカード（Figma: nav-card-light） */
export function NavCard({ to, icon, title, description }: NavCardProps) {
  return (
    <Link
      to={to}
      className="group flex h-16 w-full items-center gap-4 rounded-sm border border-border bg-surface px-4 transition-[border-color,box-shadow,transform] hover:-translate-y-px hover:border-border-strong hover:shadow-hover"
    >
      <span
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-text transition-colors group-hover:border-border-strong"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-title font-bold text-text">{title}</span>
        <span className="truncate text-caption text-text-secondary">{description}</span>
      </span>
    </Link>
  );
}
