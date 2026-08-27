import { useState, type ChangeEvent, type FormEvent } from 'react';
import { sendContactEmail } from '../services/emailjs';
import type {
  ContactField,
  ContactFormErrors,
  ContactFormValues,
  ContactStatus,
} from '../types/contact';
import { validateContactForm } from '../utils/validation';
import { useLanguage } from './useLanguage';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

/**
 * お問い合わせフォームの状態管理をまとめたカスタムフック。
 *   入力値（values）→ 入力チェック（errors）→ EmailJS で送信（status）
 */
export function useContactForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactStatus>('idle');

  /** input / textarea の変更を values に反映し、その項目のエラーを消す */
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField;
    const value = event.target.value;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. 入力チェック
    const validationErrors = validateContactForm(values, t.contact);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    // 2. EmailJS で送信
    setStatus('sending');
    try {
      await sendContactEmail(values);
      setStatus('success');
      setValues(INITIAL_VALUES);
    } catch (error) {
      console.error('[contact] failed to send email', error);
      setStatus('error');
    }
  };

  return { values, errors, status, handleChange, handleSubmit };
}
