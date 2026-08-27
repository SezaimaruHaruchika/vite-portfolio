# Strapi（ブログ機能）のセットアップ手順

フロントエンド側（`src/services/strapi.ts`, `src/types/blog.ts`）はすでに Strapi v5 の API 形式に合わせて実装済みです。
以下の手順で Strapi を用意すると、Blog 一覧 / 詳細ページにデータが表示されます。

> **Node.js のバージョン**: Strapi 5 は LTS 版（v22 / v24 / v26）のみ対応です。奇数バージョン（v23 / v25）は使えないので `node -v` で確認してください。

## 1. Strapi プロジェクトを作成する

ポートフォリオとは**別のフォルダ**に作成します（GitHub のリポジトリも別に作るのがおすすめです。Figma の Projects 画面にある `strapi-blog-api` という名前がそのまま使えます）。

> **補足（2026-08-27）**: 実際にはローカルで `portfolio/strapi-blog` に作成し、
> Git は 1 リポジトリの **`api` ブランチ**として管理しています（フロントエンドは `web` ブランチ）。
> Strapi 側の `.gitignore` が `node_modules` と `.env`（秘密鍵）を除外します。

```bash
cd ~/Desktop/3nd/Typescript/homeworks   # portfolio と同じ階層
npx create-strapi@latest strapi-blog-api
```

質問には次のように答えると最短で進められます。

| 質問 | 回答 |
| --- | --- |
| Login/Sign up (Strapi Cloud) | `Skip` |
| Install dependencies with npm? | `Yes` |
| Initialize a git repository? | `Yes` |
| Database | `SQLite`（ローカル開発用） |
| Start with an example structure & data? | `No` |
| Start with TypeScript? | `Yes` |

作成が終わったら起動します。

```bash
cd strapi-blog-api
npm run develop
```

ブラウザで http://localhost:1337/admin が開くので、管理者アカウントを作成してログインします。

## 2. Blog コンテンツタイプを作成する

左メニュー **Content-Type Builder** → **Create new collection type**

- Display name: `Blog`
  - API ID (Singular): `blog`、API ID (Plural): `blogs` になっていることを確認
  - Advanced settings の **Draft & publish** は ON のまま（これで `publishedAt` が自動で付きます）

フィールドを以下のとおり追加します（フロントエンドの型 `src/types/blog.ts` と対応しています）。

| フィールド名 | 種類 | 設定 |
| --- | --- | --- |
| `title` | Text（Short text） | Required |
| `content` | Rich text (**Markdown**) | Required ※ Blocks ではなく Markdown を選ぶ |
| `image` | Media（Single media） | Allowed types: images のみ |
| `category` | Enumeration | Values: `tech` / `devlog` / `study` / `misc`、Required、Default: `tech` |

> Strapi の Enumeration には日本語が使えないため、値は英語にしてあります。
> サイト上では `tech → 技術記事`, `devlog → 開発記録`, `study → 学習メモ`, `misc → 雑記` として表示されます（`src/i18n/ja.ts` の `blog.categories`）。

**Save** を押すと Strapi が再起動します。

## 3. 公開 API の権限を許可する

左メニュー **Settings** → **Users & Permissions plugin** → **Roles** → **Public**

- **Blog** を開き、`find` と `findOne` にチェック → **Save**

これで認証なしで `GET /api/blogs` と `GET /api/blogs/:documentId` が呼べるようになります。

## 4. 記事を登録する

左メニュー **Content Manager** → **Blog** → **Create new entry**

- title / content（Markdown。`## 見出し` や ```` ```json ```` のコードブロックも表示できます）/ image / category を入力
- 右上の **Publish** を押す（Draft のままだと API に出てきません）

最低 3 件、できれば 6 件以上（ページネーションの動作確認のため）登録しておくと見栄えがよくなります。

## 5. API を確認する

ブラウザで次の URL を開き、JSON が返ることを確認します。

```text
http://localhost:1337/api/blogs?populate=image
```

`data[0].documentId` の値を使って 1 件取得も確認できます。

```text
http://localhost:1337/api/blogs/<documentId>?populate=image
```

## 6. フロントエンドの設定

`portfolio/.env` に Strapi の URL を設定します（ローカルは初期値のままで OK）。

```dotenv
VITE_STRAPI_URL=http://localhost:1337
```

`npm run dev` でポートフォリオを起動し、`/blog` に記事が表示されれば完了です。

## 7. 公開するとき

- Strapi を Strapi Cloud / Render / Railway などにデプロイし、`VITE_STRAPI_URL` に本番 URL を設定する
- `config/middlewares.ts` の `strapi::cors` で、公開したポートフォリオのドメインを `origin` に追加する
- 本番では画像を Cloudinary などのアップロードプロバイダーに保存する（サーバー再起動でローカルの画像が消えるのを防ぐため）

## 授業内の Strapi 実装テストについて

テストの流れ（Content Type 作成 → `/api/blogs` 確認 → React で fetch → 表示）は、このリポジトリでは次のファイルに対応しています。

| テストのステップ | 対応するコード |
| --- | --- |
| API からデータを取得する | `src/services/strapi.ts` の `fetchBlogPosts()`（`fetch` → `response.json()`） |
| 取得したデータを state に入れる | `src/hooks/useFetch.ts`（`useState` + `useEffect`） |
| コンポーネントに表示する | `src/pages/Blog.tsx` → `src/components/blog/BlogCard.tsx` |
| レスポンスの型 | `src/types/blog.ts` |
