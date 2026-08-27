/** お問い合わせフォームの入力値 */
export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactFormValues;

/** フィールドごとのエラーメッセージ（エラーがないフィールドはキー自体が無い） */
export type ContactFormErrors = Partial<Record<ContactField, string>>;

/** 送信処理の状態 */
export type ContactStatus = 'idle' | 'sending' | 'success' | 'error';
