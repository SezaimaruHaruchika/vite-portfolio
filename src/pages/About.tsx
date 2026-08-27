import { IconChevronRight, IconMail } from '@tabler/icons-react';
import { PillLink } from '../components/ui/PillLink';
import { Tag } from '../components/ui/Tag';
import { profile } from '../data/profile';
import { ROUTES } from '../data/routes';
import { useLanguage } from '../hooks/useLanguage';

/** アバター（280px。スマホでは 200px）。写真未設定の間はグレーの円 */
const avatarClass = 'size-70 rounded-full bg-border object-cover max-pc:size-50';

/** About ページ（Figma: About） */
export function About() {
  const { t } = useLanguage();

  return (
    // ヘッダー（--header-h）を除いた全画面の高さ。フッターはスクロールで現れる
    <section className="mx-auto grid min-h-[calc(100dvh-var(--header-h))] w-full max-w-[1512px] grid-cols-[280px_minmax(0,684px)] items-center justify-center gap-x-24 px-12 py-16 max-wide:gap-x-12 max-pc:grid-cols-1 max-pc:items-start max-pc:gap-y-8 max-pc:px-4 max-pc:pt-12">
      <title>{`${t.about.subtitle} | ${t.common.siteName}`}</title>

      <div className="flex flex-col items-center gap-4">
        {profile.avatarUrl ? (
          <img className={avatarClass} src={profile.avatarUrl} alt={t.common.profileName} />
        ) : (
          <div className={avatarClass} role="img" aria-label={t.common.profileName} />
        )}
        <p className="text-center text-h2 font-bold text-text">{t.common.profileName}</p>
        <PillLink
          to={ROUTES.contact}
          leadingIcon={<IconMail size={16} aria-hidden="true" />}
          trailingIcon={<IconChevronRight size={16} aria-hidden="true" />}
        >
          {t.about.contactCta}
        </PillLink>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 font-bold text-text">{t.about.title}</h1>
          <p className="text-title font-bold text-text-secondary">{t.about.subtitle}</p>
        </div>

        <div className="flex flex-col gap-[30px] text-body text-text-secondary max-pc:gap-4 max-pc:text-[16px] max-pc:leading-[1.6] max-pc:tracking-[0.02em]">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-h3 font-bold text-text">{t.about.techStack}</h2>
          <ul className="flex flex-wrap gap-2">
            {profile.techStack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
