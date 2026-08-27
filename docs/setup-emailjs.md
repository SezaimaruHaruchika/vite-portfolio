# EmailJS（お問い合わせフォーム）のセットアップ手順

フロントエンド側（`src/services/emailjs.ts`, `src/hooks/useContactForm.ts`）は実装済みです。
EmailJS の管理画面で 3 つの値を取得し、`.env` に設定すると送信できるようになります。

## 1. アカウント作成

https://www.emailjs.com/ で無料アカウントを作成します（無料プランは月 200 通まで）。

## 2. Email Service を追加する（Service ID）

管理画面 **Email Services** → **Add New Service** → **Gmail**（自分の Gmail でログインして連携）

- 作成後に表示される **Service ID**（例: `service_xxxxxxx`）を控える

## 3. Email Template を作成する（Template ID）

**Email Templates** → **Create New Template**

フロントエンドは次の 4 つの変数を送信します。テンプレートに以下のように入れてください。

| 変数 | 内容 |
| --- | --- |
| `{{from_name}}` | お名前 |
| `{{reply_to}}` | メールアドレス |
| `{{subject}}` | 件名 |
| `{{message}}` | メッセージ |

設定例:

- **Subject**: `[Portfolio] {{subject}}`
- **Content**:

  ```text
  {{from_name}} さんからお問い合わせがありました。

  メールアドレス: {{reply_to}}
  件名: {{subject}}

  {{message}}
  ```

- **To Email**: 自分の受信用メールアドレス
- **Reply To**: `{{reply_to}}`（メールソフトで「返信」すると相手に返信できるようになります）

保存後に表示される **Template ID**（例: `template_xxxxxxx`）を控える。

## 4. Public Key を確認する

**Account** → **General** → **API Keys** の **Public Key** を控える。

## 5. `.env` に設定する

```dotenv
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

`.env` を変更したら `npm run dev` を再起動してください（環境変数は起動時に読み込まれます）。

## 6. 動作確認

1. `/contact` を開き、何も入力せずに「送信する」→ 各項目に赤いエラーが出る
2. メールアドレスに `example@mail` と入力 → 「メールアドレスの形式が正しくありません」が出る
3. 正しく入力して送信 → ボタンが「送信中…」になり、成功するとフォーム上部にオレンジ枠の成功メッセージが出て入力欄が空になる
4. 自分のメールに届いていることを確認する
5. 送信に失敗した場合は赤枠のエラーメッセージが出る。ブラウザの開発者ツールの Console に EmailJS のエラー内容が出るので確認する（キーの間違い・テンプレート変数名の不一致が多いです）

## 補足: セキュリティ

- Public Key はブラウザに公開される前提の値なので `.env` に入れて問題ありません（Private Key は使いません）
- 管理画面 **Account → Security** の「Allow EmailJS API for non-browser applications」は OFF のまま、公開後は **Domain / Origin** に公開サイトのドメインを登録しておくと、他サイトからの悪用を防げます
