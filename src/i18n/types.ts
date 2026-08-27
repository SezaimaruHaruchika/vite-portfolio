/** 対応言語 */
export type Lang = 'ja' | 'en';

/**
 * サイト内の文言をまとめた辞書の型。
 * ja.ts / en.ts の両方がこの型を満たす必要があるため、
 * 片方の言語だけ文言が抜ける、といったミスをコンパイル時に防げる。
 */
export interface Translations {
  common: {
    siteName: string;
    profileName: string;
    loading: string;
    retry: string;
    fetchError: string;
    backToHome: string;
  };
  header: {
    nav: {
      about: string;
      skills: string;
      blog: string;
      projects: string;
      contact: string;
    };
    switchToDark: string;
    switchToLight: string;
    /** 言語切替ボタンのラベル（切替先の言語名を表示する） */
    switchLanguage: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    copyright: string;
    github: string;
    x: string;
    mail: string;
  };
  home: {
    catchcopy: string;
    lead: string;
    cards: {
      about: { title: string; description: string };
      blog: { title: string; description: string };
      projects: { title: string; description: string };
    };
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    techStack: string;
    contactCta: string;
  };
  skills: {
    title: string;
    subtitle: string;
    lead: string;
    legend: string;
    categories: {
      frontend: { title: string; description: string };
      backend: { title: string; description: string };
      infra: { title: string; description: string };
    };
    years: (years: number) => string;
  };
  projects: {
    title: string;
    subtitle: string;
    lead: string;
    repoCount: (count: number) => string;
    moreOnGithub: string;
    empty: string;
    error: string;
  };
  blog: {
    title: string;
    subtitle: string;
    lead: string;
    categoryLabel: string;
    allCategories: string;
    categories: {
      tech: string;
      devlog: string;
      study: string;
      misc: string;
    };
    articleCount: (count: number) => string;
    empty: string;
    error: string;
    backToList: string;
    notFound: string;
    prevPage: string;
    nextPage: string;
    pageLabel: (page: number) => string;
  };
  contact: {
    title: string;
    subtitle: string;
    lead: string[];
    responseNote: string;
    directContact: string;
    required: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      subject: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    privacyNote: string;
    /** EmailJS が未設定（.env 未記入）のときにフォーム上へ出す案内 */
    notConfigured: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    validation: {
      required: (field: string) => string;
      email: string;
      maxLength: (field: string, max: number) => string;
    };
  };
  notFound: {
    title: string;
    description: string;
  };
}
