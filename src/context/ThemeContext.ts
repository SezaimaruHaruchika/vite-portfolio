import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

/** ThemeProvider の外で使われた場合は null（useTheme 側でエラーにする） */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
