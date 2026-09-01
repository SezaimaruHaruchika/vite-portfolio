# Sezaimaru Portfolio

React + TypeScript + Vite で制作したポートフォリオサイトです。
Figma でデザインを作成し、そのデザインをもとに実装しています。

## 概要

自己紹介・スキル・制作物（GitHub リポジトリの自動取得）・ブログ（Strapi）・お問い合わせ（EmailJS）で構成されたポートフォリオサイトです。
ダークモードと日本語 / 英語の切り替えに対応しています。

## 公開 URL

- **サイト**: https://vite-portfolio-one-phi.vercel.app
- ブログ API（Strapi）: https://vite-portfolio-abtp.onrender.com

フロントは Vercel、Strapi は Render（DB: PostgreSQL / 画像: Cloudinary）で公開しています。構築手順は [docs/setup-deploy.md](docs/setup-deploy.md) を参照してください。
※無料プランのためサーバーがスリープすることがあり、ブログの初回表示に最大 1 分ほどかかる場合があります（エラー時は「再読み込み」で復帰します）。

## ブランチ構成

| ブランチ | 内容 |
| --- | --- |
| `web`（default） | フロントエンド（React + TypeScript + Vite + Tailwind CSS） |
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

- https://shin-dc.jp/ — 余白の取り方、タイポグラフィ（フォントサイズ・行間）、ページ全体で共通化されたレイアウト・コンポーネントの組み方を参考にしました。既存の完成度が高いサイトの雰囲気に近づけつつ、装飾を誇張しすぎないシンプルなデザインを意識しました。

## 制作期間

デザイン1日
コーディング約1週間

## 実装した機能

- **ローディング画面**: サイトを開いた直後に中央にロゴマーク・サイト名・アクセントカラーのプログレスバーを表示し、Web フォントの読み込みが完了すると自動でフェードアウトして Top ページを表示する
- **ページ構成（React Router）**: Top / About / Skills / Projects / Blog 一覧 / Blog 詳細 / Contact / 404 の 8 ページ。ページ遷移のたびにスクロール位置を先頭に戻す
- **ブログ（Strapi）**: カテゴリ（tech / devlog / study / misc）で絞り込める一覧（1 ページ 5 件・ページネーションあり）と、Markdown 本文を表示する詳細ページ。取得中はスケルトン表示、失敗時はエラーメッセージ + 再読み込みボタンを表示する
- **Projects（GitHub API）**: GitHub の公開リポジトリを取得し、使用言語のバッジと最終更新日つきのカードで一覧表示。クリックすると新しいタブで GitHub 上のリポジトリを開く
- **お問い合わせ（EmailJS）**: 名前・メールアドレス（形式チェックあり）・件名・メッセージの 4 項目を必須入力とし、未入力や不正な形式ならエラーを表示。送信中はボタンを「送信中…」にして二重送信を防ぎ、送信完了後は送信完了ページを表示。送信者には自動返信メールも届く
- **ダークモード**: ヘッダーの月 / 太陽アイコンで切り替え。選択状態は localStorage に保存して次回訪問時も保持し、初回アクセス時は OS のダーク / ライト設定に従う
- **日本語 / 英語切り替え**: ヘッダーの言語ピルで切り替え。Context API で全ページの文言を管理しているので、切り替えると即座に全ページの表示が変わる
- **レスポンシブ対応**: PC（1512px）とスマートフォン（375px）の Figma デザインに対応。960px 未満はスマホ表示になり、ハンバーガーメニューでナビゲーションを開閉する
- **アニメーション**: ページ遷移時のフェードイン、カードのホバー時の浮き上がり、Skills ページのスキルバーが表示時に伸びるアニメーションなど

## 工夫したところ

- Figma のデザインガイドをそのまま Tailwind の `@theme`（`src/styles/global.css`）のデザイントークンに落とし込み、`data-theme="dark"` を切り替えるだけでダークモードになるようにした
- Strapi / GitHub の API レスポンスに TypeScript の型（`src/types/`）を定義し、`status` で分岐すると `data` の型が絞り込まれる `useFetch` カスタムフックを作った
- 文言辞書に `Translations` 型を付け、日本語と英語で文言の抜けがあるとコンパイルエラーになるようにした
- ブログのカテゴリとページ番号を URL のクエリ（`?category=tech&page=2`）で管理し、ブラウザの戻る / 進むや URL 共有でも同じ表示になるようにした
- API キーや URL は `.env` にまとめ、Git には含めないようにした

## 難しかったところ

- **Tailwind CSS v4 への全面移行**: 独自 CSS から Tailwind に移行する際、Preflight（リセット CSS）の影響でページ共通のレイアウト用クラスの余白が変わってしまい、想定と違う見た目になった。移行前後を見比べながら、共通クラスをひとつずつ調整して直した。
- **EmailJS の設定**: 最初はメールが空欄で届いたり自動返信が来なかったりして原因がわからず苦労した。調べてみると、コード側の変数名とテンプレート側の `{{変数}}` 名が一致していなかったことと、自動返信メールが Gmail のカテゴリタブに振り分けられていたことが原因だった。
- **参考にするデザインの選定**: 実装しているページと近い雰囲気で、かつ装飾を誇張しすぎないデザインにしたかったので、イメージに合う参考サイトがなかなか見つからず時間がかかった。見つけたあとも、そのレイアウトを Figma 上で再現するのに苦労した。
- **Strapi の Markdown の改行**: エディタでの Enter 1 回が画面に反映されず、`remark-breaks` の導入で解決した。
- **デプロイ時の環境差**: 本番の Strapi で Public ロールの権限を設定し忘れて API が全部 403 になり、原因の切り分けに手間取った。

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
## あとがき
### fetch → state → 表示 の場所を説明
#### fetchしてる場所
fetchする場所を``src/services/strapi.ts``で管理し、``fetchBlogPosts()``関数がStrapi に HTTP GET を投げます。

URL(参考程度に)→``GET http://localhost:1337/api/blogs?populate=image&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=5``

- ``populate=image`` 画像はリレーションなので、付けないと JSON に画像が入ってこない
- ``sort=publishedAt:desc`` 公開日時の新しい順
- ``pagination[page]`` ページネーション
- カテゴリ絞り込み時は``filters[category][$eq]=tech``を追加
返ってきたJSONから記事の配列と総件数などを取り出して返しています。

#### stateに入れる場所
``src/hooks/useFetch.ts``でstateに入れて結果をReactに渡しています。

#### 表示する場所
``src/pages/Blog.tsx``（+ ``BlogCard.tsx``）が state の状態に応じて描き分けます。``loading`` ならスケルトン、``error`` ならエラーメッセージ + 再読み込みボタン、``success`` なら記事カードの一覧を表示します。

まとめると: ``strapi.ts``が JSON を取ってくる → useFetch がそれを``state``に入れて``loading/success/error``を管理する → ``Blog.tsx``が状態に応じて描き分ける。通信・状態管理・表示を分けているので、どこかを変えても他に影響しない。

### Blog の 5 フィールド構成（Content-Type Builder）
| フィールド | 種類（Content-Type Builder） | 設定 | 役割・フロントでの使われ方 |
| --- | --- | --- | --- |
| title | Text（Short text） | 必須 | 記事タイトル。一覧カードと詳細ページの見出しに表示 |
| content | Rich text（Markdown） | 必須 | 本文。フロントで react-markdown が HTML に変換して表示（見出し・コードブロック・改行対応） |
| image | Media（単数・画像のみ） | 任意 | サムネイル 兼 詳細ページの画像。リレーションなので API に populate=image を付けて初めて JSON に含まれる |
| category | Enumeration | 必須・デフォルト tech。選択肢: tech / devlog / study / misc | カテゴリ表示とフィルター。一覧の絞り込みは filters[category][$eq]=tech で API 側が行う |
| publishedAt | （自作ではない）Draft & Publish 有効で Strapi が自動付与 | Publish した瞬間の日時が入る。下書き中は null | 公開日の表示と sort=publishedAt:desc（新しい順）に使用。null の Draft は API に出てこない = 下書きが表示されない仕組み |
