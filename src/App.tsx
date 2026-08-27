import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { ROUTES } from './data/routes';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';

/**
 * アプリのルート。
 * - ThemeProvider / LanguageProvider: ダークモードと表示言語を全ページで共有
 * - LoadingScreen: サイトを開いた直後に表示するローディング画面（準備できたらフェードアウト）
 * - BrowserRouter + Routes: URL ごとに表示するページを切り替える（React Router）
 * - Layout: Header / Footer を共通化し、中身（Outlet）だけを差し替える
 */
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LoadingScreen />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={ROUTES.home} element={<Home />} />
              <Route path={ROUTES.about} element={<About />} />
              <Route path={ROUTES.skills} element={<Skills />} />
              <Route path={ROUTES.projects} element={<Projects />} />
              <Route path={ROUTES.blog} element={<Blog />} />
              <Route path={ROUTES.blogDetail(':id')} element={<BlogDetail />} />
              <Route path={ROUTES.contact} element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
