import emailjs from '@emailjs/browser';
import type { ContactFormValues } from '../types/contact';

/**
 * EmailJS の設定（.env から読み込む）。
 * EmailJS 管理画面の Email Services / Email Templates / Account > API Keys で確認できる。
 */
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};

/** 3 つのキーがすべて設定されているか */
export const isEmailJsConfigured = (): boolean =>
  Boolean(config.serviceId && config.templateId && config.publicKey);

/**
 * お問い合わせ内容を EmailJS 経由でメール送信する。
 *
 * テンプレート側では以下の変数を使う（docs/emailjs-template.html に対応）:
 *   {{name}} {{email}} {{title}} {{message}} {{time}}
 */
export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  if (!isEmailJsConfigured()) {
    throw new Error(
      'EmailJS が設定されていません。.env に VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY を設定してください。',
    );
  }

  await emailjs.send(
    config.serviceId,
    config.templateId,
    {
      name: values.name,
      email: values.email,
      title: values.subject,
      message: values.message,
      // メールテンプレートの「受信日時」欄に表示する（例: 2026/08/27 18:45）
      time: new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(),
      ),
    },
    { publicKey: config.publicKey },
  );
}
