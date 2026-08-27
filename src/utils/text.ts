/**
 * Markdown 本文から記号を取り除き、一覧カード用の抜粋（プレーンテキスト）を作る。
 */
export function createExcerpt(markdown: string, maxLength = 80): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, '') // コードブロック
    .replace(/`([^`]*)`/g, '$1') // インラインコード
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 画像
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // リンク → テキストだけ残す
    .replace(/^#{1,6}\s+/gm, '') // 見出し記号
    .replace(/^\s*[-*+]\s+/gm, '') // 箇条書き記号
    .replace(/^\s*>\s?/gm, '') // 引用
    .replace(/[*_~]{1,3}/g, '') // 強調
    .replace(/\s+/g, ' ')
    .trim();

  return plain.length > maxLength ? `${plain.slice(0, maxLength)}…` : plain;
}
