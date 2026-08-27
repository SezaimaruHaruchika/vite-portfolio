/**
 * GitHub REST API（GET /users/:username/repos）のレスポンスのうち、
 * このサイトで使うフィールドだけを型にしたもの。
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  /** 主要言語（言語を判定できないリポジトリは null） */
  language: string | null;
  fork: boolean;
  stargazers_count: number;
  /** 最後に push された日時（ISO 8601） */
  pushed_at: string;
  updated_at: string;
  topics?: string[];
}
