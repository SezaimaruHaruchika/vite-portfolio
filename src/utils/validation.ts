import type { Translations } from '../i18n';
import type { ContactField, ContactFormErrors, ContactFormValues } from '../types/contact';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 各項目の最大文字数 */
const MAX_LENGTH: Record<ContactField, number> = {
  name: 50,
  email: 254,
  subject: 100,
  message: 2000,
};

/**
 * お問い合わせフォームの入力チェック。
 * 戻り値が空オブジェクトならエラーなし。
 */
export function validateContactForm(
  values: ContactFormValues,
  t: Translations['contact'],
): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const fields: ContactField[] = ['name', 'email', 'subject', 'message'];

  for (const field of fields) {
    const value = values[field].trim();
    const label = t.fields[field].label;

    if (value === '') {
      errors[field] = t.validation.required(label);
    } else if (value.length > MAX_LENGTH[field]) {
      errors[field] = t.validation.maxLength(label, MAX_LENGTH[field]);
    } else if (field === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field] = t.validation.email;
    }
  }

  return errors;
}
