import { en } from './en';
import { ja } from './ja';
import type { Lang, Translations } from './types';

export type { Lang, Translations } from './types';

/** 言語コード → 文言辞書 */
export const translations: Record<Lang, Translations> = { ja, en };

export const DEFAULT_LANG: Lang = 'ja';

export const isLang = (value: unknown): value is Lang => value === 'ja' || value === 'en';
