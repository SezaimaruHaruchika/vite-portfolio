import { IconBook2, IconBrandGithub, IconCode, IconTools } from '@tabler/icons-react';
import { NavCard } from '../components/home/NavCard';
import { ROUTES } from '../data/routes';
import { useLanguage } from '../hooks/useLanguage';

/** トップページ（Figma: Top） */
export function Home() {
  const { t } = useLanguage();
  const cards = t.home.cards;

  return (
    // flex-1 でヘッダーとフッターの間の残り空間いっぱいに広がり、ヒーローが中央・フッターは 1 画面内に収まる。pl-33/pr-36 = 132px/144px
    <section className="mx-auto grid w-full max-w-[1512px] flex-1 grid-cols-[1fr_1fr] items-center gap-12 py-16 pr-36 pl-33 max-wide:px-12 max-pc:grid-cols-1 max-pc:items-start max-pc:px-4 max-pc:pt-12">
      <title>{t.common.siteName}</title>

      <div className="flex flex-col gap-2">
        <h1 className="text-h1 font-bold text-text max-pc:text-h2">{t.home.catchcopy}</h1>
        <p className="text-body text-text-secondary">{t.home.lead}</p>
      </div>

      <nav
        className="ml-auto flex w-full max-w-[371px] flex-col gap-10 max-pc:ml-0 max-pc:max-w-none max-pc:gap-4"
        aria-label="quick links"
      >
        <NavCard
          to={ROUTES.about}
          icon={<IconCode size={24} />}
          title={cards.about.title}
          description={cards.about.description}
        />
        <NavCard
          to={ROUTES.skills}
          icon={<IconTools size={24} />}
          title={cards.skills.title}
          description={cards.skills.description}
        />
        <NavCard
          to={ROUTES.blog}
          icon={<IconBook2 size={24} />}
          title={cards.blog.title}
          description={cards.blog.description}
        />
        <NavCard
          to={ROUTES.projects}
          icon={<IconBrandGithub size={24} />}
          title={cards.projects.title}
          description={cards.projects.description}
        />
      </nav>
    </section>
  );
}
