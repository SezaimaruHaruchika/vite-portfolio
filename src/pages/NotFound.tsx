import { IconChevronLeft } from '@tabler/icons-react';
import { PillLink } from '../components/ui/PillLink';
import { ROUTES } from '../data/routes';
import { useLanguage } from '../hooks/useLanguage';

/** 404 ページ（存在しない URL にアクセスしたとき） */
export function NotFound() {
  const { t } = useLanguage();

  return (
    // ヘッダー（--header-h）を除いた全画面の高さ。フッターはスクロールで現れる
    <section className="flex min-h-[calc(100dvh-var(--header-h))] w-full flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <title>{`404 | ${t.common.siteName}`}</title>
      <p className="font-mono text-[72px] leading-none font-medium text-accent">404</p>
      <h1 className="text-h2 font-bold text-text">{t.notFound.title}</h1>
      <p className="mb-4 text-title leading-[1.5] text-text-secondary">{t.notFound.description}</p>
      <PillLink to={ROUTES.home} leadingIcon={<IconChevronLeft size={24} aria-hidden="true" />}>
        {t.common.backToHome}
      </PillLink>
    </section>
  );
}
