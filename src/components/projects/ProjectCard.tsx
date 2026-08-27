import { getLanguageColor } from '../../data/languageColors';
import type { GitHubRepo } from '../../types/github';
import { formatDate } from '../../utils/date';
import { Tag } from '../ui/Tag';

interface ProjectCardProps {
  repo: GitHubRepo;
}

/** GitHub リポジトリ 1 件分のカード（Figma: project-card-light） */
export function ProjectCard({ repo }: ProjectCardProps) {
  const languageColor = getLanguageColor(repo.language);

  return (
    <a
      className="flex w-full flex-col gap-2 rounded-md border border-border bg-surface px-6 py-4 transition-[border-color,box-shadow,transform] hover:-translate-y-px hover:border-border-strong hover:shadow-hover max-pc:px-4"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-title font-bold wrap-anywhere text-text">{repo.name}</h2>
        {repo.description && (
          <p className="line-clamp-2 text-caption leading-[1.4] text-text-secondary">{repo.description}</p>
        )}
      </div>
      <div className="flex min-h-[33px] items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {repo.language && (
            <Tag background={languageColor.background} color={languageColor.color}>
              {repo.language}
            </Tag>
          )}
        </div>
        <time className="font-mono text-[12px] whitespace-nowrap text-text-secondary" dateTime={repo.pushed_at}>
          {formatDate(repo.pushed_at)}
        </time>
      </div>
    </a>
  );
}
