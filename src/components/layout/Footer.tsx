import { IconBrandGithub, IconBrandX, IconMail } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { NAV_ITEMS, ROUTES } from '../../data/routes';
import { useLanguage } from '../../hooks/useLanguage';

const navLinkClass = 'text-caption text-text-secondary transition-colors hover:text-text';
const snsLinkClass = 'inline-flex text-text-secondary transition-colors hover:text-text';

/** サイト共通フッター（Figma: footer-light / footer-mobile-light） */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t-2 border-border transition-colors">
      <div className="flex items-start justify-between gap-8 px-16 py-12 max-pc:flex-col-reverse max-pc:items-center max-pc:gap-4 max-pc:px-4 max-pc:py-8">
        <div className="flex flex-col gap-2 max-pc:items-center max-pc:text-center">
          {/* スマホでは Figma に合わせてサイト名は出さず、コピーライトのみ */}
          <p className="text-[24px] text-text max-pc:hidden">{t.common.siteName}</p>
          <p className="text-caption text-text-secondary">{t.footer.copyright}</p>
        </div>

        <div className="flex flex-col items-end gap-4 max-pc:items-center">
          <nav aria-label="footer">
            <ul className="flex flex-wrap gap-6 max-pc:justify-center max-pc:gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link to={item.path} className={navLinkClass}>
                    {t.header.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-4">
            <li>
              <a
                href={profile.githubUrl}
                className={snsLinkClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.github}
                title={t.footer.github}
              >
                <IconBrandGithub size={24} aria-hidden="true" />
              </a>
            </li>
            {profile.xUrl && (
              <li>
                <a
                  href={profile.xUrl}
                  className={snsLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.footer.x}
                  title={t.footer.x}
                >
                  <IconBrandX size={24} aria-hidden="true" />
                </a>
              </li>
            )}
            <li>
              <Link to={ROUTES.contact} className={snsLinkClass} aria-label={t.footer.mail} title={t.footer.mail}>
                <IconMail size={24} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
