# Sezaimaru Portfolio

React + TypeScript + Vite で制作したポートフォリオサイトです。
Figma でデザインを作成し、そのデザインをもとに実装しています。

## 概要

「想ったモノ」を形に。長く、高品質なアプリを創ります。

自己紹介・スキル・制作物（GitHub リポジトリの自動取得）・ブログ（Strapi）・お問い合わせ（EmailJS）で構成されたポートフォリオサイトです。
ダークモードと日本語 / 英語の切り替えに対応しています。

## ブランチ構成

| ブランチ | 内容 |
| --- | --- |
| `web`（このブランチ） | フロントエンド（React + TypeScript + Vite + Tailwind CSS） |
| `api` | ブログ機能のヘッドレス CMS（Strapi 5） |

ローカルでは `portfolio/` 直下に `portfolio-web/`（= web ブランチ）と `strapi-blog/`（= api ブランチ）を並べて、両方を同時に起動して開発しています。

## 使用技術

- React 19
- TypeScript 6
- Vite 8
- React Router 7（react-router-dom）
- Strapi 5（ブログ用ヘッドレス CMS・`api` ブランチ）
- EmailJS（お問い合わせフォームのメール送信）
- Tailwind CSS 4（`@theme` にデザイントークンを定義）

### 使用ライブラリ一覧

| ライブラリ | 用途 |
| --- | --- |
| `react-router-dom` | ページ遷移（`/`, `/about`, `/skills`, `/projects`, `/blog`, `/blog/:id`, `/contact`） |
| `@emailjs/browser` | お問い合わせフォームからのメール送信 |
| `@tabler/icons-react` | Figma で使用した Tabler Icons と同じアイコン |
| `react-markdown` | Strapi の Rich text (Markdown) 本文をブログ詳細ページに表示 |
| `remark-gfm` | 取り消し線・表など、Strapi エディタが出力する GFM 記法への対応 |
| `remark-breaks` | エディタでの Enter 1 回の改行をそのまま `<br>` として表示 |
| `tailwindcss` | スタイリング（ユーティリティクラス + `@theme` デザイントークン） |
| `@tailwindcss/vite` | Tailwind CSS 4 公式の Vite プラグイン（ビルド時に CSS を生成） |

## 使用 API

| API | 用途 |
| --- | --- |
| Strapi REST API（`/api/blogs`） | ブログ記事の一覧・詳細を取得 |
| GitHub REST API（`/users/:username/repos`） | 公開リポジトリを取得して Projects ページに自動表示 |
| EmailJS | お問い合わせフォームの内容をメールで送信 |

## Figma

https://www.figma.com/design/YlJs8hCWUObTchPDHVlGZI/TypeScript---portfolio%E8%AA%B2%E9%A1%8C?node-id=0-1

デザインガイド（Light / Dark のカラーパレット・タイポグラフィ）、コンポーネント集、PC・スマートフォンそれぞれの全ページを作成しています。

## 参考デザイン

<!-- TODO: 参考にしたサイト・デザインの URL と、どこを参考にしたかを書く -->

- （例）https://example.com — ミニマルな余白の取り方とカード UI を参考にした

## 制作期間

<!-- TODO: 例: 2026年7月20日 〜 2026年8月31日（約6週間） -->

## 実装した機能

- **ローディング画面**: サイトを開いた直後にブランド名とプログレスバーを表示し、フォント読み込み完了後にフェードアウト
- **ページ構成（React Router）**: Top / About / Skills / Projects / Blog 一覧 / Blog 詳細 / Contact / 404
- **ブログ（Strapi）**: 記事一覧（カテゴリフィルター・ページネーション）と記事詳細（Markdown 表示）。取得中はスケルトン表示、失敗時は再読み込みボタンを表示
- **Projects（GitHub API）**: 公開リポジトリを自動取得し、言語バッジ・最終更新日つきのカードで表示
- **お問い合わせ（EmailJS）**: 名前 / メールアドレス / 件名 / メッセージの入力チェック、送信中表示、送信成功 / エラー表示
- **ダークモード**: ヘッダーのボタンで切り替え。設定は localStorage に保存し、初回は OS の設定に従う
- **日本語 / 英語切り替え**: Context API で全ページの文言を切り替え
- **レスポンシブ対応**: PC（1512px）とスマートフォン（375px）の Figma デザインに対応。スマホはハンバーガーメニュー
- **アニメーション**: ページ遷移のフェードイン、カードのホバー、スキルバーの伸びるアニメーション

## 工夫したところ

- Figma のデザインガイドをそのまま Tailwind の `@theme`（`src/styles/global.css`）のデザイントークンに落とし込み、`data-theme="dark"` を切り替えるだけでダークモードになるようにした
- Strapi / GitHub の API レスポンスに TypeScript の型（`src/types/`）を定義し、`status` で分岐すると `data` の型が絞り込まれる `useFetch` カスタムフックを作った
- 文言辞書に `Translations` 型を付け、日本語と英語で文言の抜けがあるとコンパイルエラーになるようにした
- ブログのカテゴリとページ番号を URL のクエリ（`?category=tech&page=2`）で管理し、ブラウザの戻る / 進むや URL 共有でも同じ表示になるようにした
- API キーや URL は `.env` にまとめ、Git には含めないようにした

## 難しかったところ

<!-- TODO: 自分の言葉で書く（例: Strapi v5 のレスポンス形式、EmailJS のテンプレート設定、レスポンシブ対応 など） -->

---

## セットアップ

### フロントエンド（このブランチ）

```bash
npm install
cp .env.example .env   # .env を編集して各サービスの設定を入れる
npm run dev            # http://localhost:5173
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 型チェック + 本番ビルド（`dist/`） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run lint` | ESLint |

### 環境変数（`.env`）

| 変数 | 内容 |
| --- | --- |
| `VITE_STRAPI_URL` | Strapi の URL（ローカルは `http://localhost:1337`） |
| `VITE_GITHUB_USERNAME` | GitHub のユーザー名（Projects ページに表示するリポジトリの持ち主） |
| `VITE_EMAILJS_SERVICE_ID` / `VITE_EMAILJS_TEMPLATE_ID` / `VITE_EMAILJS_PUBLIC_KEY` | EmailJS の設定 |
| `VITE_X_URL` / `VITE_CONTACT_EMAIL` | （任意）フッター・Contact に表示するリンク |

### ブログ CMS（`api` ブランチ）

```bash
# api ブランチの内容（strapi-blog）で
npm install
npm run develop        # http://localhost:1337/admin
```

外部サービスの設定手順は [docs/setup-strapi.md](docs/setup-strapi.md) と [docs/setup-emailjs.md](docs/setup-emailjs.md) を参照してください。

## フォルダ構成

```text
src/
├── components/   # UI コンポーネント（layout / ui / home / blog / projects / skills / contact）
├── pages/        # 各ページ（React Router の Route に対応）
├── hooks/        # カスタムフック（useFetch, useBlogPosts, useGitHubRepos, useContactForm など）
├── services/     # API との通信（strapi.ts, github.ts, emailjs.ts）
├── types/        # TypeScript の型定義（blog.ts, github.ts, contact.ts, skill.ts）
├── context/      # Context API（テーマ・言語）
├── i18n/         # 日本語 / 英語の文言辞書
├── data/         # 静的データ（スキル一覧・プロフィール・ルート定義）
├── styles/       # Tailwind エントリ CSS（@theme トークン）と共通レイアウトクラス
├── utils/        # 小さなユーティリティ（日付整形・バリデーションなど）
├── App.tsx       # ルーティング
└── main.tsx      # エントリーポイント
```
