import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { storage } from '../utils/storage';
import { ThemeContext, type Theme } from './ThemeContext';

const STORAGE_KEY = 'portfolio-theme';

/** 初期テーマ: 保存済みの設定 > OS の設定 > light */
const getInitialTheme = (): Theme => {
  const saved = storage.get(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ダークモードの状態をアプリ全体に配る Provider。
 * <html data-theme="dark"> を切り替えるだけで、CSS 変数（global.css の @theme）が
 * ダーク用の色に入れ替わる仕組み。
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    storage.set(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
