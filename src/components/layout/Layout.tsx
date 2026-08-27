import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';

/**
 * 全ページ共通のレイアウト。
 * Header と Footer の間に、React Router が現在のページ（Outlet）を描画する。
 * key に pathname を渡すことで、ページが切り替わるたびにフェードインし直す。
 */
export function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <main key={pathname} className="flex w-full flex-[1_0_auto] flex-col animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
