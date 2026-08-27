import { IconPhoto } from '@tabler/icons-react';
import { resolveStrapiMediaUrl } from '../../services/strapi';
import type { StrapiImage } from '../../types/blog';
import { cx } from '../../utils/cx';

interface BlogImageProps {
  image: StrapiImage | null;
  /** 画像が無いときに代わりに表示するアイコンの大きさ */
  iconSize?: number;
  /** 一覧用の小さい画像（Strapi の small フォーマット）を優先して使う */
  preferSmall?: boolean;
  /** サイズ・角丸は使う側で指定する（一覧: rounded-sm / 詳細: rounded-md） */
  className?: string;
}

/**
 * ブログ記事の画像。Strapi に画像が登録されていなければ
 * Figma と同じプレースホルダー（グレー背景 + 写真アイコン）を表示する。
 */
export function BlogImage({ image, iconSize = 24, preferSmall = false, className }: BlogImageProps) {
  if (!image) {
    return (
      <div
        className={cx('flex items-center justify-center bg-border text-text-secondary', className)}
        aria-hidden="true"
      >
        <IconPhoto size={iconSize} />
      </div>
    );
  }

  const source = (preferSmall && image.formats?.small?.url) || image.url;

  return (
    <img
      className={cx('bg-border object-cover', className)}
      src={resolveStrapiMediaUrl(source)}
      alt={image.alternativeText ?? ''}
      loading="lazy"
    />
  );
}
