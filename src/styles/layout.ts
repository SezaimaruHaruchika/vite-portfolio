/*
 * ページ共通のレイアウト用クラス（旧 page.module.css の置き換え）。
 * Figma の各画面は「見出し + 説明（幅 1192, 左右 160px）」の下に
 * 「カード一覧（幅 720, 中央揃え）」が並ぶ構成なので、それを再現する。
 */
export const page = {
  /** ページ全体のセクション（上下余白つき） */
  section: 'mx-auto w-full max-w-[1512px] pt-16 pb-20 max-pc:pt-12 max-pc:pb-16',
  /** 見出しブロックを 1192px に収めるコンテナ */
  container: 'mx-auto w-full max-w-content px-4',
  /** カード一覧のカラム（幅 720, 中央揃え） */
  column: 'mx-auto mt-12 flex w-full max-w-column flex-col gap-6 max-pc:mt-8 max-pc:gap-4',
  /** カードを縦に並べるリスト */
  list: 'flex w-full flex-col gap-6 max-pc:gap-4',
  /** 補足のキャプション（件数表示など） */
  caption: 'text-caption text-text-secondary',
  /** 子要素を中央寄せする行 */
  centered: 'flex justify-center',
} as const;
