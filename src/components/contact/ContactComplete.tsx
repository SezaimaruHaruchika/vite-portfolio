import { IconChevronLeft, IconCircleCheck } from '@tabler/icons-react';
import { useEffect } from 'react';
import { ROUTES } from '../../data/routes';
import { useLanguage } from '../../hooks/useLanguage';
import { PillLink } from '../ui/PillLink';

/** 送信完了ページ（Figma: Contact-complete）。送信成功時に Contact ページ全体と置き換わる */
export function ContactComplete() {
  const { t } = useLanguage();

  // フォームの位置までスクロールしていた状態から切り替わるので、先頭に戻す
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    // ヘッダー（--header-h）を除いた全画面の高さ。フッターはスクロールで現れる
    <section className="flex min-h-[calc(100dvh-var(--header-h))] w-full flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <title>{`${t.contact.complete.title} | ${t.common.siteName}`}</title>

      <IconCircleCheck size={44} className="text-accent" aria-hidden="true" />

      <div className="flex flex-col gap-2">
        <h1 className="text-h1 font-bold text-text max-pc:text-h2">{t.contact.complete.title}</h1>
        <p className="text-title font-bold text-text-secondary">{t.contact.complete.subtitle}</p>
      </div>

      <p className="mt-2 max-w-[600px] text-body text-text-secondary">
        {t.contact.complete.lead.map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </p>

      <p className="text-caption text-text-secondary">{t.contact.complete.spamNote}</p>

      <PillLink to={ROUTES.home} leadingIcon={<IconChevronLeft size={24} aria-hidden="true" />}>
        {t.common.backToHome}
      </PillLink>
    </section>
  );
}
