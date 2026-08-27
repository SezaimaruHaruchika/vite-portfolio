/// <reference types="vite/client" />

/**
 * .env で定義する環境変数の型。
 * import.meta.env.VITE_XXX にアクセスしたときに補完と型チェックが効くようにする。
 */
interface ImportMetaEnv {
  readonly VITE_STRAPI_URL?: string;
  readonly VITE_GITHUB_USERNAME?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_X_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
