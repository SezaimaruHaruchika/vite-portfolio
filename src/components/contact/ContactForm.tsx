import { IconChevronRight, IconMail } from '@tabler/icons-react';
import type { useContactForm } from '../../hooks/useContactForm';
import { useLanguage } from '../../hooks/useLanguage';
import { isEmailJsConfigured } from '../../services/emailjs';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';

interface ContactFormProps {
  /** Contact ページ側で作った useContactForm の状態（成功時のページ切り替えに使うため親が持つ） */
  form: ReturnType<typeof useContactForm>;
}

/** お問い合わせフォーム（Figma: Form card + Contact states） */
export function ContactForm({ form }: ContactFormProps) {
  const { t } = useLanguage();
  const { values, errors, status, handleChange, handleSubmit } = form;
  const isSending = status === 'sending';
  const fields = t.contact.fields;

  return (
    <form
      className="flex w-full flex-col gap-6 rounded-md border border-border bg-surface p-8 max-pc:gap-4 max-pc:p-4"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* EmailJS のキーが .env に無い間だけ表示される案内（設定すると自動で消える） */}
      {!isEmailJsConfigured() && (
        <p className="text-caption leading-[1.4] text-error" role="note">
          {t.contact.notConfigured}
        </p>
      )}

      {status === 'error' && <Alert variant="error" message={t.contact.error} />}

      <FormField
        id="contact-name"
        name="name"
        label={fields.name.label}
        placeholder={fields.name.placeholder}
        requiredLabel={t.contact.required}
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        disabled={isSending}
      />
      <FormField
        id="contact-email"
        name="email"
        type="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        requiredLabel={t.contact.required}
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isSending}
      />
      <FormField
        id="contact-subject"
        name="subject"
        label={fields.subject.label}
        placeholder={fields.subject.placeholder}
        requiredLabel={t.contact.required}
        value={values.subject}
        onChange={handleChange}
        error={errors.subject}
        disabled={isSending}
      />
      <FormField
        id="contact-message"
        name="message"
        multiline
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        requiredLabel={t.contact.required}
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        disabled={isSending}
      />

      <p className="text-caption leading-[1.4] text-text-secondary">{t.contact.privacyNote}</p>

      <div className="flex justify-end max-pc:justify-center">
        <Button
          type="submit"
          disabled={isSending}
          leadingIcon={<IconMail size={24} aria-hidden="true" />}
          trailingIcon={<IconChevronRight size={24} aria-hidden="true" />}
        >
          {isSending ? t.contact.sending : t.contact.submit}
        </Button>
      </div>
    </form>
  );
}
