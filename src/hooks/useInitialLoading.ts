import { useEffect, useState } from 'react';

/** ローディング画面の状態: 表示中 → フェードアウト中 → 終了（非表示） */
export type LoadingPhase = 'loading' | 'leaving' | 'done';

interface InitialLoadingOptions {
  /** 最低でもこの時間（ms）はローディング画面を表示する */
  minDuration?: number;
  /** フォントの読み込みをこの時間（ms）以上は待たない */
  maxWait?: number;
  /** フェードアウトにかける時間（ms）。CSS の transition と合わせる */
  exitDuration?: number;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * サイトを最初に開いたときのローディング画面を制御するカスタムフック。
 *
 * 「最低表示時間」と「Web フォント（Noto Sans JP）の読み込み完了」の両方を待ってから
 * フェードアウトを始め、フェードアウトが終わったら done にする。
 * フォントの読み込みが遅い場合でも maxWait を過ぎたら先に進む。
 */
export function useInitialLoading({
  minDuration = 1200,
  maxWait = 3000,
  exitDuration = 400,
}: InitialLoadingOptions = {}): LoadingPhase {
  const [phase, setPhase] = useState<LoadingPhase>('loading');

  useEffect(() => {
    let cancelled = false;

    const fontsReady = Promise.race([document.fonts.ready, wait(maxWait)]);

    Promise.all([wait(minDuration), fontsReady]).then(() => {
      if (!cancelled) setPhase('leaving');
    });

    return () => {
      cancelled = true;
    };
  }, [minDuration, maxWait]);

  useEffect(() => {
    if (phase !== 'leaving') return;

    const timer = setTimeout(() => setPhase('done'), exitDuration);
    return () => clearTimeout(timer);
  }, [phase, exitDuration]);

  // 表示中はページをスクロールできないようにする（global.css の html[data-loading]）
  useEffect(() => {
    if (phase === 'done') {
      delete document.documentElement.dataset.loading;
    } else {
      document.documentElement.dataset.loading = 'true';
    }
  }, [phase]);

  return phase;
}
