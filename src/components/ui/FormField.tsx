import type { ChangeEvent } from 'react';
import { cx } from '../../utils/cx';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  /** "必須" バッジの文言（渡すとバッジを表示） */
  requiredLabel?: string;
  /** input の type（textarea のときは無視） */
  type?: 'text' | 'email';
  /** true なら textarea にする */
  multiline?: boolean;
  error?: string;
  disabled?: boolean;
}

/** ラベル + 必須バッジ + 入力欄 + エラーメッセージ（Figma: Form / Form Feedback） */
export function FormField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  requiredLabel,
  type = 'text',
  multiline = false,
  error,
  disabled = false,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const controlClass = cx(
    'w-full rounded-sm border bg-bg text-caption text-text transition-colors placeholder:text-text-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
    multiline ? 'h-40 resize-y p-4' : 'h-12 px-4',
    error ? 'border-error' : 'border-border focus:border-accent',
  );
  const commonProps = {
    id,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    className: controlClass,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    autoComplete: name === 'email' ? 'email' : name === 'name' ? 'name' : undefined,
  } as const;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="text-title font-bold text-text">
          {label}
        </label>
        {requiredLabel && (
          <span className="inline-flex items-center rounded-pill bg-accent px-4 py-2 text-caption text-on-accent">
            {requiredLabel}
          </span>
        )}
      </div>

      {multiline ? <textarea rows={6} {...commonProps} /> : <input type={type} {...commonProps} />}

      {error && (
        <p id={errorId} className="text-caption text-error">
          {error}
        </p>
      )}
    </div>
  );
}
