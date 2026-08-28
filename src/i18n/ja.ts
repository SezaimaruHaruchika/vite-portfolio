import type { Translations } from './types';

/** 日本語の文言（Figma デザインの文言をそのまま使用） */
export const ja: Translations = {
  common: {
    siteName: 'Sezaimaru Portfolio',
    profileName: '瀬在丸 東慶',
    loading: '読み込み中…',
    retry: '再読み込み',
    fetchError: 'データの取得に失敗しました。',
    backToHome: 'トップへ戻る',
  },
  header: {
    nav: {
      about: 'About',
      skills: 'Skills',
      blog: 'Blogs',
      projects: 'Projects',
      contact: 'Contact',
    },
    switchToDark: 'ダークモードに切り替え',
    switchToLight: 'ライトモードに切り替え',
    switchLanguage: 'English',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
  },
  footer: {
    copyright: '© 2026 瀬在丸 東慶 — All Rights Reserved',
    github: 'GitHub',
    x: 'X（旧 Twitter）',
    mail: 'お問い合わせ',
  },
  home: {
    catchcopy: '「想ったモノ」を形に。',
    lead: '長く、高品質なアプリを創ります。',
    cards: {
      about: { title: 'About', description: '私について' },
      skills: { title: 'Skills', description: '使用技術' },
      blog: { title: 'Blog', description: '技術ブログ' },
      projects: { title: 'Projects', description: 'GitHubリポジトリ' },
    },
  },
  about: {
    title: '私について',
    subtitle: 'About Me',
    paragraphs: [
      '本ポートフォリオをご覧いただきありがとうございます。「想ったモノ」を形にすることを大切に、長く使われる高品質なアプリケーションの開発に取り組んでいます。',
      'Webシステム開発を中心に、要件理解から、フロントエンド・バックエンドまで幅広く担当しており、ユーザーにとってより心地の良い体験を提供できることを目指しております。',
      '単なる実装だけでなく、「保守しやすいコード」、「長期的な運用」を重視したシステムの開発を行っています。',
    ],
    techStack: '使用技術',
    contactCta: 'お問い合わせ',
  },
  skills: {
    title: 'スキル',
    subtitle: 'Skills',
    lead: '開発で使っている技術を、習熟度と経験年数つきでまとめています。',
    legend: 'バーは習熟度(5 段階)、右の数字は経験年数です。',
    categories: {
      frontend: {
        title: 'フロントエンド',
        description: 'TypeScript と React を中心に、型安全で保守しやすい UI を実装します。',
      },
      backend: {
        title: 'バックエンド',
        description: 'Node.js や Java で API を設計・実装し、Strapi などの CMS とも連携します。',
      },
      infra: {
        title: 'インフラ・ツール',
        description:
          'Git でのバージョン管理、Docker での環境構築、Figma でのデザイン連携など、開発を支える技術です。',
      },
    },
    years: (years) => `${years} 年`,
  },
  projects: {
    title: 'プロジェクト',
    subtitle: 'Projects',
    lead: 'GitHub のリポジトリから自動で取得した、開発プロジェクトの一覧です。',
    repoCount: (count) => `公開リポジトリ ${count} 件`,
    moreOnGithub: 'GitHub でもっと見る',
    empty: '公開リポジトリがまだありません。',
    error: 'GitHub からリポジトリを取得できませんでした。',
  },
  blog: {
    title: 'ブログ',
    subtitle: 'Blog',
    lead: '開発の記録や学んだことを、気ままに書き残しています。',
    categoryLabel: 'カテゴリ',
    allCategories: 'すべて',
    categories: {
      tech: '技術記事',
      devlog: '開発記録',
      study: '学習メモ',
      misc: '雑記',
    },
    articleCount: (count) => `${count} 件の記事`,
    empty: '記事がまだありません。',
    error: 'ブログ記事を取得できませんでした。Strapi が起動しているか確認してください。',
    backToList: 'ブログ一覧へ戻る',
    notFound: '記事が見つかりませんでした。',
    prevPage: '前のページ',
    nextPage: '次のページ',
    pageLabel: (page) => `${page} ページ目`,
  },
  contact: {
    title: 'お問い合わせ',
    subtitle: 'Contact',
    lead: ['お仕事のご依頼・ご相談は、', '以下からお気軽にご連絡ください。'],
    responseNote: '通常 2〜3 営業日以内に返信します。',
    directContact: '直接の連絡先',
    required: '必須',
    fields: {
      name: { label: 'お名前', placeholder: '山田 太郎' },
      email: { label: 'メールアドレス', placeholder: 'example@mail.com' },
      subject: { label: '件名', placeholder: 'お問い合わせの件名' },
      message: { label: 'メッセージ', placeholder: 'ご相談内容をご記入ください' },
    },
    privacyNote: '送信いただいた内容は、お問い合わせへの返信以外には使用しません。',
    notConfigured:
      'メール送信（EmailJS）が未設定のため、現在このフォームからは送信できません。管理者は docs/setup-emailjs.md の手順で .env を設定してください。',
    submit: '送信する',
    sending: '送信中…',
    error: '送信に失敗しました。時間をおいて再度お試しください。',
    complete: {
      title: '送信が完了しました',
      subtitle: 'Thanks',
      lead: [
        'お問い合わせありがとうございます。内容を確認のうえ、通常 2〜3 営業日以内にご返信いたします。',
        'ご入力のメールアドレス宛てに、受付確認のメールをお送りしています。',
      ],
      spamNote: 'メールが届かない場合は、迷惑メールフォルダをご確認ください。',
    },
    validation: {
      required: (field) => `${field}を入力してください`,
      email: 'メールアドレスの形式が正しくありません',
      maxLength: (field, max) => `${field}は ${max} 文字以内で入力してください`,
    },
  },
  notFound: {
    title: 'ページが見つかりません',
    description: 'お探しのページは移動または削除された可能性があります。',
  },
};
