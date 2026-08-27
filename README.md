# strapi-blog（api ブランチ）

Sezaimaru Portfolio のブログ機能を提供するヘッドレス CMS（**Strapi 5** / TypeScript / SQLite）です。
フロントエンドは同リポジトリの **`web` ブランチ**にあります。

## コンテンツタイプ

| フィールド | 種類 |
| --- | --- |
| `title` | Text（Short text, Required） |
| `content` | Rich text（Markdown, Required） |
| `image` | Media（Single media, images のみ） |
| `category` | Enumeration（`tech` / `devlog` / `study` / `misc`, Required） |
| `publishedAt` | Draft & Publish により自動付与 |

公開 API（Public ロールに `find` / `findOne` を許可）:

- `GET /api/blogs?populate=image` — 記事一覧
- `GET /api/blogs/:documentId?populate=image` — 記事詳細

## セットアップ

```bash
npm install
npm run develop        # http://localhost:1337/admin
```

初回は管理者アカウントを作成し、Content Manager から記事を登録して **Publish** してください。
詳しい手順は `web` ブランチの `docs/setup-strapi.md` にまとめています。
