/**
 * localStorage の薄いラッパー。
 * プライベートモードなどで localStorage が使えない環境でもアプリが落ちないよう、
 * 例外はすべて握りつぶして null / 何もしない、にする。
 */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // 保存できなくても動作に支障はないので無視する
    }
  },
};
