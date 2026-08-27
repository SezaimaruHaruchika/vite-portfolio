# Figma と実装の対応メモ

仕様書「11. デザインと実装の一致」のため、実装側で Figma と変えた・追加した点をまとめています。
Figma 側にも反映しておくと、採点時の「Figma → 実装」の流れが揃います。

## Figma のコンポーネント → 実装コンポーネント

| Figma | 実装 |
| --- | --- |
| design guide（Light / Dark） | `src/styles/global.css`（Tailwind `@theme` のデザイントークン） |
| header-light / header-mobile-light | `src/components/layout/Header.tsx` |
| footer-light / footer-mobile-light | `src/components/layout/Footer.tsx` |
| nav-card-light（+ hover） | `src/components/home/NavCard.tsx` |
| project-card-light（+ hover） | `src/components/projects/ProjectCard.tsx` |
| blog-card-light / blog-card-mobile-light | `src/components/blog/BlogCard.tsx` |
| skill-card-light / skill-row-light / skill-level-light | `src/components/skills/SkillCard.tsx` / `SkillRow.tsx` / `SkillLevel.tsx` |
| Tag / filter-chip-light | `src/components/ui/Tag.tsx` / `FilterChip.tsx` |
| pagination-light | `src/components/ui/Pagination.tsx` |
| CTA-primary | `src/components/ui/Button.tsx` |
| contact cta-light / back cta-light | `src/components/ui/PillLink.tsx` |
| input-light / textarea-light / input-light-error | `src/components/ui/FormField.tsx` |
| alert-success-light / alert-error-light | `src/components/ui/Alert.tsx` |
| Heading + 説明文（各ページ共通） | `src/components/ui/PageHeading.tsx` |

## 実装側で追加・変更した点（Figma に反映してほしいもの）

1. **ヘッダーナビに「Skills」を追加**（About / Skills / Blogs / Projects / Contact）。フッターのナビにも同じく Skills を追加。
2. **スマホのハンバーガーメニューを開いた状態**のデザインが Figma に無いため、実装では「ヘッダー直下にナビ 5 項目 + 言語切替ピルを縦に並べたパネル」にしています。Mobile セクションにフレームを 1 枚追加してください。
3. **言語切替ピル**は、英語表示中は「日本語 🌐」と表示されます（英語版の画面を Figma に作る場合の参考）。
4. Top のナビカードの説明文は、PC 版の「提供サービス」ではなく、スマホ版の文言（私について / 技術ブログ / GitHubリポジトリ）に統一しました。
5. お問い合わせフォームの**送信中状態**（ボタンが「送信中…」になり押せなくなる）を追加。
6. **読み込み中（スケルトン）**、**取得エラー（再読み込みボタン付き）**、**404 ページ**は Figma に無い状態です。余裕があれば追加してください。
7. **ローディング画面**（サイトを開いた直後に表示。中央にマーク + サイト名 + アクセントカラーのプログレスバー + キャッチコピー）を追加しました。Figma に無い画面なので、PC / SP 各 1 枚フレームを追加してください。
8. Contact ページの「直接の連絡先」は Figma どおりスマホ表示のみに出しています（`.env` の `VITE_CONTACT_EMAIL` を設定するとメールアドレスも表示されます）。
9. **ヘッダーの高さを PC 100px → 80px に変更**しました（2026-08-27）。Figma の header / header-mobile はスマホ 64px のままで OK、PC 版フレームだけ 80px に修正してください。
10. **About の 2 段落目の文言を修正**（「要件理解からフロントエンドから〜」→「要件理解から、フロントエンド・バックエンドまで〜」）。Figma 側のテキストも合わせてください。
11. Top / About / 404 は「ヘッダーを除いた全画面」の高さになり、**フッターはスクロールで現れる**構成に変更しました。Figma のフレームでもフッターを画面外（下）に置く形が実装と一致します。
12. **Blog 詳細の記事本文を長文向けタイポグラフィに変更**しました（本文 16px / 行間 1.7 / 字間 2%、記事内見出し h2: 28px / h3: 20px、段落間 16px）。24px の Body スタイルはヒーロー・About のリード文専用です。Figma の Blog-detail 本文テキストも合わせて更新してください。

## 参考: ブレークポイント

- 960px 未満をスマートフォン表示として扱っています（Figma のスマホ版 375px のレイアウト）。
- PC 版は Figma の 1512px のフレームを基準に、`max-width: 1192px`（見出しブロック）/ `720px`（カード一覧）で中央揃えしています。
