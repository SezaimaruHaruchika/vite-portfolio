/**
 * クラス名を結合する小さなヘルパー。
 * 例: cx(styles.card, isActive && styles.active) → "card active"
 */
export function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ');
}
