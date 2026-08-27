import type { CSSProperties } from 'react';
import { cx } from '../../utils/cx';

interface SkeletonProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  /** 角丸を大きくする（カード全体のプレースホルダーなど） */
  rounded?: boolean;
  className?: string;
}

/** 読み込み中に表示するプレースホルダー（Skeleton UI） */
export function Skeleton({ width = '100%', height = 16, rounded = false, className }: SkeletonProps) {
  return (
    <span
      className={cx(
        'block animate-shimmer bg-[linear-gradient(90deg,var(--c-border)_25%,color-mix(in_srgb,var(--c-border)_40%,var(--c-surface))_50%,var(--c-border)_75%)] [background-size:200%_100%]',
        rounded ? 'rounded-md' : 'rounded-[4px]',
        className,
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
