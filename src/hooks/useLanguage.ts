import { useContext } from 'react';
import { LanguageContext, type LanguageContextValue } from '../context/LanguageContext';

/** 現在の言語・文言辞書（t）・切替関数を取得するカスタムフック */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage は LanguageProvider の中で使用してください');
  }
  return context;
}
