import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';

interface TagProps {
  children: ReactNode;
  /** 背景色を指定する（未指定ならアクセントカラー） */
  background?: string;
  /** 文字色を指定する（未指定なら白） */
  color?: string;
  className?: string;
}

/** ピル型のラベル。スキルタグ・ブログのカテゴリ・言語バッジで共通利用 */
export function Tag({ children, background, color, className }: TagProps) {
  const style: CSSProperties | undefined =
    background || color ? { backgroundColor: background, color } : undefined;

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-pill bg-accent px-4 py-2 text-caption whitespace-nowrap text-on-accent',
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
