import { IconMenu2, IconMoon, IconSunHigh, IconWorld, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../data/routes';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { cx } from '../../utils/cx';

const navLinkClass = (isActive: boolean, extra: string) =>
  cx(
    'inline-flex items-center rounded-sm text-[18px] font-[350] transition-colors',
    isActive ? 'text-text' : 'text-text-secondary hover:text-text',
    extra,
  );

/** サイト共通ヘッダー（Figma: header-light / header-mobile-light） */
export function Header() {
  const { t, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Esc キーでスマホ用メニューを閉じる
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const themeLabel = theme === 'light' ? t.header.switchToDark : t.header.switchToLight;
  const ThemeIcon = theme === 'light' ? IconMoon : IconSunHigh;

  /** ナビリンク一覧（PC とスマホメニューで余白だけ変える） */
  const renderNavLinks = (extra: string) =>
    NAV_ITEMS.map((item) => (
      <li key={item.key}>
        <NavLink
          to={item.path}
          className={({ isActive }) => navLinkClass(isActive, extra)}
          onClick={closeMenu}
        >
          {t.header.nav[item.key]}
        </NavLink>
      </li>
    ));

  const languageButton = (extra?: string) => (
    <button
      type="button"
      className={cx(
        'inline-flex h-10 items-center gap-2.5 rounded-pill border border-border px-4 text-caption whitespace-nowrap text-text-secondary transition-colors hover:border-border-strong hover:text-text',
        extra,
      )}
      onClick={toggleLang}
    >
      <span>{t.header.switchLanguage}</span>
      <IconWorld size={24} className="text-accent" aria-hidden="true" />
    </button>
  );

  return (
    <header className="sticky top-0 z-100 border-b-2 border-border bg-bg transition-colors">
      {/* 高さは global.css の --header-h（border 込み）から算出 */}
      <div className="flex h-[calc(var(--header-h)-2px)] items-center justify-between gap-6 px-16 max-pc:px-4">
        <Link
          to={ROUTES.home}
          className="text-[36px] font-normal whitespace-nowrap text-text max-pc:text-[24px]"
          onClick={closeMenu}
        >
          {t.common.siteName}
        </Link>

        {/* PC 用ナビゲーション */}
        <nav className="flex items-center gap-4 max-pc:hidden" aria-label="main">
          <ul className="flex items-center gap-4">{renderNavLinks('px-4 py-[9px]')}</ul>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-border hover:text-text"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <ThemeIcon size={32} aria-hidden="true" />
          </button>
          {languageButton()}
        </nav>

        {/* スマホ用の操作ボタン */}
        <div className="hidden items-center gap-4 max-pc:flex">
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-sm text-text-secondary"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <ThemeIcon size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-sm text-text"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <IconX size={24} aria-hidden="true" /> : <IconMenu2 size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* スマホ用メニュー（ハンバーガーで開閉。hidden 属性が付くと Preflight の display:none が勝つ） */}
      <nav
        id="mobile-menu"
        className="hidden flex-col gap-4 border-b-2 border-border bg-surface px-4 pt-4 pb-6 animate-[fade-in_0.2s_var(--ease-brand)] max-pc:flex"
        aria-label="mobile"
        hidden={!isMenuOpen}
      >
        <ul className="flex flex-col">{renderNavLinks('w-full px-2 py-3')}</ul>
        {languageButton('self-start')}
      </nav>
    </header>
  );
}
