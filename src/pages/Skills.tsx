import { SkillCard } from '../components/skills/SkillCard';
import { SkillLevel } from '../components/skills/SkillLevel';
import { PageHeading } from '../components/ui/PageHeading';
import { skillCategories } from '../data/skills';
import { useLanguage } from '../hooks/useLanguage';
import { page } from '../styles/layout';

/** Skills ページ（Figma: Skills） */
export function Skills() {
  const { t } = useLanguage();

  return (
    <section className={page.section}>
      <title>{`${t.skills.subtitle} | ${t.common.siteName}`}</title>

      <div className={page.container}>
        <PageHeading title={t.skills.title} subtitle={t.skills.subtitle} lead={t.skills.lead}>
          <div className="flex flex-col gap-2">
            <SkillLevel level={4} />
            <p className={page.caption}>{t.skills.legend}</p>
          </div>
        </PageHeading>

        <div className="mx-auto mt-16 flex w-full max-w-column flex-col gap-8 max-pc:mt-8">
          {skillCategories.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
