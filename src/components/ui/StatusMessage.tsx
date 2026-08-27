import { IconAlertCircle } from '@tabler/icons-react';
import { useLanguage } from '../../hooks/useLanguage';
import { cx } from '../../utils/cx';

interface StatusMessageProps {
  message: string;
  /** エラー表示にする（アイコンと再読み込みボタンつき） */
  variant?: 'info' | 'error';
  onRetry?: () => void;
}

/** 一覧が空のとき・取得に失敗したときのメッセージ表示 */
export function StatusMessage({ message, variant = 'info', onRetry }: StatusMessageProps) {
  const { t } = useLanguage();

  return (
    <div
      className={cx(
        'flex w-full flex-col items-center gap-4 rounded-md border bg-surface px-6 py-8 text-center',
        variant === 'error' ? 'border-error text-error' : 'border-border text-text-secondary',
      )}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {variant === 'error' && <IconAlertCircle size={24} aria-hidden="true" />}
      <p className="text-caption leading-[1.6]">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="rounded-pill-lg border border-border bg-surface px-4 py-2 text-caption text-text transition-colors hover:border-border-strong"
          onClick={onRetry}
        >
          {t.common.retry}
        </button>
      )}
    </div>
  );
}
