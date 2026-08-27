import { useSearchParams } from 'react-router-dom';
import { BlogCard } from '../components/blog/BlogCard';
import { CategoryFilter } from '../components/blog/CategoryFilter';
import { PageHeading } from '../components/ui/PageHeading';
import { Pagination } from '../components/ui/Pagination';
import { Skeleton } from '../components/ui/Skeleton';
import { StatusMessage } from '../components/ui/StatusMessage';
import { BLOG_PAGE_SIZE, useBlogPosts } from '../hooks/useBlogPosts';
import { useLanguage } from '../hooks/useLanguage';
import { page } from '../styles/layout';
import { isBlogCategory, type BlogCategory } from '../types/blog';

/** "?page=2" のような文字列を 1 以上の整数にする（不正な値は 1） */
const parsePage = (value: string | null): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;
};

/**
 * Blog 一覧ページ（Figma: Blog）。
 * 選択中のカテゴリとページ番号は URL のクエリ（?category=tech&page=2）で管理する。
 * こうすると、ブラウザの戻る／進むや URL の共有でも同じ表示が再現できる。
 */
export function Blog() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const category: BlogCategory | undefined = isBlogCategory(categoryParam) ? categoryParam : undefined;
  const currentPage = parsePage(searchParams.get('page'));

  const result = useBlogPosts(currentPage, category);

  const handleCategoryChange = (next: BlogCategory | undefined) => {
    // カテゴリを変えたら 1 ページ目に戻す
    setSearchParams(next ? { category: next } : {});
  };

  const handlePageChange = (next: number) => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (next > 1) params.page = String(next);
    setSearchParams(params);
  };

  return (
    <section className={page.section}>
      <title>{`${t.blog.subtitle} | ${t.common.siteName}`}</title>

      <div className={page.container}>
        <PageHeading title={t.blog.title} subtitle={t.blog.subtitle} lead={t.blog.lead}>
          <CategoryFilter selected={category} onChange={handleCategoryChange} />
        </PageHeading>

        <div className={page.column}>
          {result.status === 'loading' && (
            <>
              <Skeleton width={96} height={17} />
              {Array.from({ length: BLOG_PAGE_SIZE }, (_, index) => (
                <Skeleton key={index} height={160} rounded />
              ))}
            </>
          )}

          {result.status === 'error' && (
            <StatusMessage variant="error" message={t.blog.error} onRetry={result.reload} />
          )}

          {result.status === 'success' && (
            <>
              <p className={page.caption}>{t.blog.articleCount(result.data.pagination.total)}</p>

              {result.data.posts.length === 0 ? (
                <StatusMessage message={t.blog.empty} />
              ) : (
                <ul className={page.list}>
                  {result.data.posts.map((post) => (
                    <li key={post.documentId}>
                      <BlogCard post={post} />
                    </li>
                  ))}
                </ul>
              )}

              <Pagination
                page={result.data.pagination.page}
                pageCount={result.data.pagination.pageCount}
                onChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
