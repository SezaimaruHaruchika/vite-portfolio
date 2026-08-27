import { createContext } from 'react';
import type { Lang, Translations } from '../i18n';

export interface LanguageContextValue {
  lang: Lang;
  /** 現在の言語の文言辞書 */
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

/** LanguageProvider の外で使われた場合は null（useLanguage 側でエラーにする） */
export const LanguageContext = createContext<LanguageContextValue | null>(null);
