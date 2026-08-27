import { useLanguage } from '../../hooks/useLanguage';
import { useInitialLoading } from '../../hooks/useInitialLoading';
import { cx } from '../../utils/cx';

/** 最低表示時間（ms）。animate-bar-progress の時間（1.2s）と揃える */
const MIN_DURATION = 1200;
/** フェードアウト時間（ms）。transition の duration-400 と揃える */
const EXIT_DURATION = 400;

/**
 * サイトに入る前に表示するローディング画面。
 * ブランド名とアクセントカラーのプログレスバーを表示し、
 * 準備ができたらフェードアウトしてサイト本体を見せる。
 */
export function LoadingScreen() {
  const { t } = useLanguage();
  const phase = useInitialLoading({ minDuration: MIN_DURATION, exitDuration: EXIT_DURATION });

  if (phase === 'done') return null;

  return (
    <div
      className={cx(
        'fixed inset-0 z-1000 flex items-center justify-center bg-bg transition-opacity duration-400 ease-brand',
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
      role="status"
      aria-live="polite"
      aria-label={t.common.loading}
    >
      <div className="flex flex-col items-center gap-6 px-4 animate-[fade-in_0.4s_var(--ease-brand)]">
        <svg
          className="size-12 text-accent animate-mark-bounce motion-reduce:animate-none"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <rect width="64" height="64" rx="14" fill="currentColor" />
          <path
            d="M22 20h20M22 32h14M22 44h20"
            stroke="var(--color-on-accent)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-center text-[36px] text-text max-pc:text-[24px]">{t.common.siteName}</p>
        <div className="h-2 w-60 max-w-full overflow-hidden rounded-sm bg-border">
          <div className="h-full origin-left rounded-sm bg-accent animate-bar-progress motion-reduce:transform-none motion-reduce:animate-none" />
        </div>
        <p className="text-center text-caption tracking-[0.08em] text-text-secondary">{t.home.catchcopy}</p>
      </div>
    </div>
  );
}
