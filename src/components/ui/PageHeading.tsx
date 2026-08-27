import type { ReactNode } from 'react';

interface PageHeadingProps {
  /** 大見出し（例: ブログ） */
  title: string;
  /** 小さな副題（例: Blog） */
  subtitle: string;
  /** リード文。配列を渡すと行ごとに改行する */
  lead?: string | string[];
  /** リード文の下に置く補足（キャプションなど） */
  children?: ReactNode;
}

/** 各ページ共通の見出しブロック（Figma: Heading + 説明文） */
export function PageHeading({ title, subtitle, lead, children }: PageHeadingProps) {
  const leadLines = Array.isArray(lead) ? lead : lead ? [lead] : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-h1 font-bold text-text">{title}</h1>
        <p className="text-title font-bold text-text-secondary">{subtitle}</p>
      </div>

      {(leadLines.length > 0 || children) && (
        <div className="flex flex-col gap-4 text-text-secondary">
          {leadLines.length > 0 && (
            <p className="text-body">
              {leadLines.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
