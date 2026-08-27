import { Link } from 'react-router-dom';
import { ROUTES } from '../../data/routes';
import { useLanguage } from '../../hooks/useLanguage';
import type { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/date';
import { createExcerpt } from '../../utils/text';
import { Tag } from '../ui/Tag';
import { BlogImage } from './BlogImage';

interface BlogCardProps {
  post: BlogPost;
}

/** ブログ一覧のカード（Figma: blog-card-light / blog-card-mobile-light） */
export function BlogCard({ post }: BlogCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      to={ROUTES.blogDetail(post.documentId)}
      className="flex w-full items-center gap-6 rounded-md border border-border bg-surface p-4 transition-[border-color,box-shadow,transform] hover:-translate-y-px hover:border-border-strong hover:shadow-hover max-pc:flex-col max-pc:items-stretch max-pc:gap-2"
    >
      {/* w-50 / h-32 = 200 x 128px（スマホでは幅いっぱい x 160px） */}
      <BlogImage image={post.image} preferSmall className="h-32 w-50 shrink-0 rounded-sm max-pc:h-40 max-pc:w-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 className="text-h3 font-bold text-text">{post.title}</h2>
        <p className="line-clamp-2 text-caption leading-[1.4] text-text-secondary">{createExcerpt(post.content)}</p>
        <div className="flex items-center justify-between gap-4">
          <Tag>{t.blog.categories[post.category]}</Tag>
          <time
            className="font-mono text-[12px] whitespace-nowrap text-text-secondary"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
