import { IconBrandGithub, IconMail } from '@tabler/icons-react';
import { ContactForm } from '../components/contact/ContactForm';
import { PageHeading } from '../components/ui/PageHeading';
import { profile } from '../data/profile';
import { useLanguage } from '../hooks/useLanguage';
import { page } from '../styles/layout';

const directLinkClass =
  'inline-flex items-center gap-2 text-caption text-text-secondary transition-colors hover:text-text';

/** Contact ページ（Figma: Contact）。EmailJS でメールを送信する */
export function Contact() {
  const { t } = useLanguage();

  return (
    <section className={page.section}>
      <title>{`${t.contact.subtitle} | ${t.common.siteName}`}</title>

      <div className={page.container}>
        <PageHeading title={t.contact.title} subtitle={t.contact.subtitle} lead={t.contact.lead}>
          <p className={page.caption}>{t.contact.responseNote}</p>
        </PageHeading>

        {/* Figma のスマホ版にある「直接の連絡先」（PC では非表示） */}
        <div className="mt-8 hidden flex-col gap-4 max-pc:flex">
          <h2 className="text-h3 font-bold text-text">{t.contact.directContact}</h2>
          <ul className="flex flex-col gap-4">
            {profile.contactEmail && (
              <li>
                <a href={`mailto:${profile.contactEmail}`} className={directLinkClass}>
                  <IconMail size={24} aria-hidden="true" />
                  <span>{profile.contactEmail}</span>
                </a>
              </li>
            )}
            <li>
              <a href={profile.githubUrl} className={directLinkClass} target="_blank" rel="noopener noreferrer">
                <IconBrandGithub size={24} aria-hidden="true" />
                <span>{profile.githubUrl.replace('https://', '')}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-16 w-full max-w-column max-pc:mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
