import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** 文字の左に表示するアイコン */
  leadingIcon?: ReactNode;
  /** 文字の右に表示するアイコン */
  trailingIcon?: ReactNode;
}

/** アクセントカラーのメインボタン（Figma: CTA-primary） */
export function Button({ children, leadingIcon, trailingIcon, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex min-h-10 items-center justify-center gap-2.5 rounded-sm bg-accent px-4 py-2 text-title font-bold whitespace-nowrap text-on-accent transition-[filter,transform,opacity] enabled:hover:brightness-[1.08] enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...rest}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}
