import { IconChevronRight, IconWorld } from '@tabler/icons-react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { PageHeading } from '../components/ui/PageHeading';
import { PillLink } from '../components/ui/PillLink';
import { Skeleton } from '../components/ui/Skeleton';
import { StatusMessage } from '../components/ui/StatusMessage';
import { profile } from '../data/profile';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useLanguage } from '../hooks/useLanguage';
import { page } from '../styles/layout';

/** 一覧に表示するリポジトリの最大件数 */
const MAX_REPOS = 8;

/** Projects ページ（Figma: Projects）。GitHub API から公開リポジトリを取得して表示する */
export function Projects() {
  const { t } = useLanguage();
  const result = useGitHubRepos(profile.githubUsername);

  return (
    <section className={page.section}>
      <title>{`${t.projects.title} | ${t.common.siteName}`}</title>

      <div className={page.container}>
        <PageHeading title={t.projects.title} subtitle={t.projects.subtitle} lead={t.projects.lead} />

        <div className={page.column}>
          {result.status === 'loading' && (
            <>
              <Skeleton width={120} height={17} />
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} height={134} rounded />
              ))}
            </>
          )}

          {result.status === 'error' && (
            <StatusMessage variant="error" message={t.projects.error} onRetry={result.reload} />
          )}

          {result.status === 'success' && (
            <>
              <p className={page.caption}>{t.projects.repoCount(result.data.length)}</p>

              {result.data.length === 0 ? (
                <StatusMessage message={t.projects.empty} />
              ) : (
                <ul className={page.list}>
                  {result.data.slice(0, MAX_REPOS).map((repo) => (
                    <li key={repo.id}>
                      <ProjectCard repo={repo} />
                    </li>
                  ))}
                </ul>
              )}

              <div className={page.centered}>
                <PillLink
                  href={profile.githubUrl}
                  leadingIcon={<IconWorld size={16} aria-hidden="true" />}
                  trailingIcon={<IconChevronRight size={16} aria-hidden="true" />}
                >
                  {t.projects.moreOnGithub}
                </PillLink>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
