import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '../context/ThemeContext';

/** 現在のテーマと切替関数を取得するカスタムフック */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme は ThemeProvider の中で使用してください');
  }
  return context;
}
