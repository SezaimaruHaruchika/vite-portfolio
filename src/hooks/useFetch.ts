import { useCallback, useEffect, useState } from 'react';

/** データ取得関数の型。AbortSignal を受け取り、中断できるようにする */
export type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

/**
 * 取得結果。status で分岐すると data / error の型が自動的に絞り込まれる。
 *   loading → data: null
 *   success → data: T
 *   error   → error: Error
 */
export type FetchResult<T> = { reload: () => void } & (
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error }
);

/** 最後に完了したリクエストの結果と、それがどの fetcher / version に対するものかの記録 */
interface Settled<T> {
  fetcher: Fetcher<T>;
  version: number;
  data: T | null;
  error: Error | null;
}

const toError = (value: unknown): Error => (value instanceof Error ? value : new Error(String(value)));

/**
 * API からデータを取得する汎用カスタムフック。
 *
 * 流れ: fetcher を実行 → 取得中は loading → 成功なら success（data）/ 失敗なら error
 * - fetcher が変わる（= 検索条件が変わる）と自動で再取得する
 *   （呼び出し側は useCallback で fetcher を作ること）
 * - コンポーネントが消えたり条件が変わったときは AbortController で古いリクエストを中断する
 * - reload() で同じ条件のまま再取得できる
 */
export function useFetch<T>(fetcher: Fetcher<T>): FetchResult<T> {
  const [settled, setSettled] = useState<Settled<T> | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) {
          setSettled({ fetcher, version, data, error: null });
        }
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setSettled({ fetcher, version, data: null, error: toError(error) });
        }
      },
    );

    return () => controller.abort();
  }, [fetcher, version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);

  // 結果が「今の fetcher / version」に対するものでなければ、まだ取得中
  const isCurrent = settled !== null && settled.fetcher === fetcher && settled.version === version;

  if (!isCurrent) {
    return { status: 'loading', data: null, error: null, reload };
  }
  if (settled.error) {
    return { status: 'error', data: null, error: settled.error, reload };
  }
  return { status: 'success', data: settled.data as T, error: null, reload };
}
