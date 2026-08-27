/** API 呼び出しが失敗したときに投げるエラー（HTTP ステータスを保持） */
export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

/**
 * fetch して JSON を返す共通関数。
 * - レスポンスが 2xx 以外なら HttpError を投げる
 * - signal（AbortController）を渡すとリクエストを中断できる
 */
export async function fetchJson<T>(url: string, signal?: AbortSignal, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, signal });

  if (!response.ok) {
    throw new HttpError(response.status, `Request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
