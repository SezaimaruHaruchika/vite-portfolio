import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** ページ遷移のたびにスクロール位置を先頭に戻す */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
