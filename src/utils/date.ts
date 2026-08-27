/**
 * ISO 8601 の日時文字列を "2026/8/20" 形式にする（Figma のカードと同じ表記）。
 * 不正な日付の場合は空文字を返す。
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
