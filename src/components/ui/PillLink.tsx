import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';

interface PillLinkBaseProps {
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
}

/** サイト内リンク（React Router の Link） */
interface InternalPillLinkProps extends PillLinkBaseProps {
  to: string;
  href?: never;
}

/** 外部リンク（別タブで開く） */
interface ExternalPillLinkProps extends PillLinkBaseProps {
  href: string;
  to?: never;
}

type PillLinkProps = InternalPillLinkProps | ExternalPillLinkProps;

/**
 * 枠線つきのピル型リンク（Figma: contact cta / back cta / GitHub でもっと見る）。
 * to を渡すとサイト内遷移、href を渡すと外部リンクになる。
 */
export function PillLink({ children, leadingIcon, trailingIcon, className, ...rest }: PillLinkProps) {
  const content = (
    <>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </>
  );
  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-pill-lg border border-border bg-surface px-4 py-2 text-caption whitespace-nowrap text-text-secondary transition-[border-color,color,box-shadow] hover:border-border-strong hover:text-text hover:shadow-hover',
    className,
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} href={rest.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} to={rest.to}>
      {content}
    </Link>
  );
}
