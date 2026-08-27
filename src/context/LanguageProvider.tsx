import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LANG, isLang, translations, type Lang } from '../i18n';
import { storage } from '../utils/storage';
import { LanguageContext } from './LanguageContext';

const STORAGE_KEY = 'portfolio-lang';

/** 初期言語: 保存済みの設定 > 日本語 */
const getInitialLang = (): Lang => {
  const saved = storage.get(STORAGE_KEY);
  return isLang(saved) ? saved : DEFAULT_LANG;
};

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * 表示言語（ja / en）をアプリ全体に配る Provider。
 * 各コンポーネントは useLanguage() の t から文言を取り出す。
 */
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    storage.set(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'ja' ? 'en' : 'ja'));
  }, []);

  const value = useMemo(
    () => ({ lang, t: translations[lang], setLang, toggleLang }),
    [lang, toggleLang],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
