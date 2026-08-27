import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { cx } from '../../utils/cx';

interface AlertProps {
  variant: 'success' | 'error';
  message: string;
}

/** フォーム送信の結果表示（Figma: alert-success / alert-error） */
export function Alert({ variant, message }: AlertProps) {
  const Icon = variant === 'success' ? IconCircleCheck : IconAlertCircle;

  return (
    <div
      className={cx(
        'flex w-full items-center gap-2 rounded-sm border bg-surface p-4 text-text animate-[fade-in_0.3s_var(--ease-brand)]',
        variant === 'error' ? 'border-error' : 'border-accent',
      )}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <Icon
        size={24}
        className={cx('shrink-0', variant === 'error' ? 'text-error' : 'text-accent')}
        aria-hidden="true"
      />
      <p className="text-caption leading-[1.4]">{message}</p>
    </div>
  );
}
