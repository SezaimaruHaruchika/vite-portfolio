export interface LanguageColor {
  background: string;
  color: string;
}

/**
 * GitHub のプログラミング言語ごとのバッジ色。
 * （GitHub の linguist が使う色に準拠。Figma の TypeScript = #2B7489 に合わせている）
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Python: '#3572a5',
  'Jupyter Notebook': '#da5b0b',
  Java: '#b07219',
  Kotlin: '#a97bff',
  Go: '#00add8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4f5d95',
  Ruby: '#701516',
  Swift: '#f05138',
  Dart: '#00b4ab',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

const DEFAULT_COLOR = '#6b6b6b';

/** 背景が明るい色のときは文字を黒にする（黄色のバッジなど） */
const LIGHT_BACKGROUNDS = new Set(['#f1e05a', '#89e051', '#dea584']);

export const getLanguageColor = (language: string | null): LanguageColor => {
  const background = (language && LANGUAGE_COLORS[language]) || DEFAULT_COLOR;
  return {
    background,
    color: LIGHT_BACKGROUNDS.has(background) ? '#1a1a1a' : '#ffffff',
  };
};
