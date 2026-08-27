import { IconChevronLeft } from '@tabler/icons-react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { BlogImage } from '../components/blog/BlogImage';
import { PillLink } from '../components/ui/PillLink';
import { Skeleton } from '../components/ui/Skeleton';
import { StatusMessage } from '../components/ui/StatusMessage';
import { Tag } from '../components/ui/Tag';
import { ROUTES } from '../data/routes';
import { useBlogPost } from '../hooks/useBlogPost';
import { useLanguage } from '../hooks/useLanguage';
import { HttpError } from '../services/http';
import { formatDate } from '../utils/date';

/** ページ全体（上下余白つき・中央揃え） */
const pageClass = 'mx-auto flex w-full max-w-[1512px] flex-col items-center pt-16 pb-20 max-pc:pt-12 max-pc:pb-16';
/** 戻るリンク + 見出しを 1192px に収めるブロック */
const topClass = 'flex w-full max-w-content flex-col gap-8 px-4';
/** 本文カラム（幅 800, 中央揃え） */
const articleClass = 'mt-16 flex w-full max-w-[800px] flex-col gap-10 px-4 max-pc:mt-8 max-pc:gap-8';
/** アイキャッチ画像（Figma: 800x448。スマホは 343x192 の比率） */
const imageClass = 'aspect-[800/448] w-full rounded-md max-pc:aspect-[343/192]';

/**
 * Strapi の Markdown 本文（react-markdown の出力に子孫セレクタでスタイルを当てる）。
 * 24px の Body トークンはヒーロー用の見せ文字なので、記事本文は
 * 長文向けのタイポグラフィ（16px / 行間 1.7 / 段落間隔 16px）にする。
 */
const markdownClass = [
  'flex flex-col gap-4 text-[16px] leading-[1.7] tracking-[0.02em] wrap-anywhere text-text-secondary',
  // 見出しは記事内の階層（ページタイトル 48px より下）に合わせて 28 / 20px
  '[&_h1]:mt-4 [&_h1]:text-[28px] [&_h1]:leading-[1.4] [&_h1]:font-bold [&_h1]:tracking-normal [&_h1]:text-text',
  '[&_h2]:mt-4 [&_h2]:text-[28px] [&_h2]:leading-[1.4] [&_h2]:font-bold [&_h2]:tracking-normal [&_h2]:text-text',
  '[&_h3]:mt-2 [&_h3]:text-[20px] [&_h3]:leading-[1.5] [&_h3]:font-bold [&_h3]:tracking-normal [&_h3]:text-text',
  '[&_h4]:mt-2 [&_h4]:text-[20px] [&_h4]:leading-[1.5] [&_h4]:font-bold [&_h4]:tracking-normal [&_h4]:text-text',
  '[&_a]:text-accent [&_a]:underline',
  '[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-[1.5em]',
  '[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-[1.5em]',
  // blockquote / pre の margin はブラウザ標準の値（Preflight が消すので明示的に戻す）
  '[&_blockquote]:mx-10 [&_blockquote]:my-[1em] [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4',
  '[&_pre]:my-[1em] [&_pre]:w-full [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-6',
  '[&_pre_code]:font-mono [&_pre_code]:text-[14px] [&_pre_code]:leading-[1.6] [&_pre_code]:tracking-normal [&_pre_code]:text-text',
  '[&_:not(pre)>code]:rounded-[4px] [&_:not(pre)>code]:bg-border [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.8em] [&_:not(pre)>code]:tracking-normal [&_:not(pre)>code]:text-text',
  '[&_img]:w-full [&_img]:rounded-md',
  '[&_hr]:h-px [&_hr]:w-full [&_hr]:border-0 [&_hr]:bg-border',
  '[&_table]:w-full [&_table]:border-collapse [&_table]:text-[16px] [&_table]:tracking-normal',
  '[&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left',
  '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-left',
].join(' ');

/** Blog 詳細ページ（Figma: Blog-detail）。URL の :id（documentId）で記事を 1 件取得する */
export function BlogDetail() {
  const { t } = useLanguage();
  const { id = '' } = useParams<{ id: string }>();
  const result = useBlogPost(id);

  const backLink = (
    <Link
      to={ROUTES.blog}
      className="inline-flex items-center gap-2 self-start text-caption text-text-secondary transition-colors hover:text-text"
    >
      <IconChevronLeft size={24} aria-hidden="true" />
      <span>{t.blog.backToList}</span>
    </Link>
  );

  if (result.status === 'loading') {
    return (
      <div className={pageClass}>
        <div className={topClass}>
          {backLink}
          <div className="flex flex-col gap-4">
            <Skeleton width={80} height={33} />
            <Skeleton height={58} />
          </div>
        </div>
        <div className={articleClass}>
          <Skeleton height={448} rounded />
          <Skeleton height={120} />
        </div>
      </div>
    );
  }

  if (result.status === 'error') {
    const isNotFound = result.error instanceof HttpError && result.error.status === 404;
    return (
      <div className={pageClass}>
        <div className={topClass}>
          {backLink}
          <StatusMessage
            variant={isNotFound ? 'info' : 'error'}
            message={isNotFound ? t.blog.notFound : t.blog.error}
            onRetry={isNotFound ? undefined : result.reload}
          />
        </div>
      </div>
    );
  }

  const post = result.data;

  return (
    <article className={pageClass}>
      <title>{`${post.title} | ${t.common.siteName}`}</title>

      <div className={topClass}>
        {backLink}
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Tag>{t.blog.categories[post.category]}</Tag>
            <time className="font-mono text-[12px] text-text-secondary" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h1 className="text-h1 font-bold wrap-anywhere text-text max-pc:text-h2">{post.title}</h1>
        </header>
      </div>

      <div className={articleClass}>
        <BlogImage image={post.image} iconSize={40} className={imageClass} />

        <div className={markdownClass}>
          {/*
           * remark-gfm: 取り消し線・表・チェックリストなど（Strapi エディタのツールバーが出す記法）
           * remark-breaks: エディタで Enter 1 回の改行を、そのまま <br> として表示する
           */}
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{post.content}</Markdown>
        </div>

        <hr className="h-px w-full border-0 bg-border" />

        <div className="flex justify-center">
          <PillLink to={ROUTES.blog} leadingIcon={<IconChevronLeft size={24} aria-hidden="true" />}>
            {t.blog.backToList}
          </PillLink>
        </div>
      </div>
    </article>
  );
}
