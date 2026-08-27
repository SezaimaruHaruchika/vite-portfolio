import type { Translations } from './types';

/** English translations */
export const en: Translations = {
  common: {
    siteName: 'Sezaimaru Portfolio',
    profileName: 'Haruchika Sezaimaru',
    loading: 'Loading…',
    retry: 'Retry',
    fetchError: 'Failed to load data.',
    backToHome: 'Back to home',
  },
  header: {
    nav: {
      about: 'About',
      skills: 'Skills',
      blog: 'Blogs',
      projects: 'Projects',
      contact: 'Contact',
    },
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
    switchLanguage: '日本語',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  footer: {
    copyright: '© 2026 Haruchika Sezaimaru — All Rights Reserved',
    github: 'GitHub',
    x: 'X (formerly Twitter)',
    mail: 'Contact',
  },
  home: {
    catchcopy: 'Turning ideas into reality.',
    lead: 'Building high-quality apps that last.',
    cards: {
      about: { title: 'About', description: 'Who I am' },
      blog: { title: 'Blog', description: 'Tech blog' },
      projects: { title: 'Projects', description: 'GitHub repositories' },
    },
  },
  about: {
    title: 'About Me',
    subtitle: '私について',
    paragraphs: [
      'Thank you for visiting my portfolio. I care about turning ideas into reality and focus on building high-quality applications that people keep using for a long time.',
      'My work centers on web systems: from understanding requirements to front-end and back-end development. I aim to deliver experiences that feel comfortable and natural for users.',
      'Beyond simply implementing features, I value maintainable code and long-term operation when designing and building systems.',
    ],
    techStack: 'Tech Stack',
    contactCta: 'Contact',
  },
  skills: {
    title: 'Skills',
    subtitle: 'スキル',
    lead: 'The technologies I use in development, with proficiency and years of experience.',
    legend: 'The bar shows proficiency (5 levels); the number on the right is years of experience.',
    categories: {
      frontend: {
        title: 'Frontend',
        description: 'Type-safe, maintainable UIs built mainly with TypeScript and React.',
      },
      backend: {
        title: 'Backend',
        description: 'Designing and building APIs with Node.js and Java, integrating with CMSs such as Strapi.',
      },
      infra: {
        title: 'Infra / Tools',
        description:
          'Technologies that support development: version control with Git, environments with Docker, and design collaboration with Figma.',
      },
    },
    years: (years) => (years === 1 ? '1 yr' : `${years} yrs`),
  },
  projects: {
    title: 'Projects',
    subtitle: 'プロジェクト',
    lead: 'A list of development projects, fetched automatically from my GitHub repositories.',
    repoCount: (count) => `${count} public ${count === 1 ? 'repository' : 'repositories'}`,
    moreOnGithub: 'See more on GitHub',
    empty: 'No public repositories yet.',
    error: 'Could not fetch repositories from GitHub.',
  },
  blog: {
    title: 'Blog',
    subtitle: 'ブログ',
    lead: 'Notes on development and things I have learned along the way.',
    categoryLabel: 'Category',
    allCategories: 'All',
    categories: {
      tech: 'Tech',
      devlog: 'Dev log',
      study: 'Study notes',
      misc: 'Misc',
    },
    articleCount: (count) => `${count} ${count === 1 ? 'article' : 'articles'}`,
    empty: 'No articles yet.',
    error: 'Could not fetch blog posts. Please check that Strapi is running.',
    backToList: 'Back to blog',
    notFound: 'Article not found.',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    pageLabel: (page) => `Page ${page}`,
  },
  contact: {
    title: 'Contact',
    subtitle: 'お問い合わせ',
    lead: ['For work inquiries or questions,', 'feel free to reach out using the form below.'],
    responseNote: 'I usually reply within 2–3 business days.',
    directContact: 'Direct contact',
    required: 'Required',
    fields: {
      name: { label: 'Name', placeholder: 'John Smith' },
      email: { label: 'Email', placeholder: 'example@mail.com' },
      subject: { label: 'Subject', placeholder: 'Subject of your inquiry' },
      message: { label: 'Message', placeholder: 'Tell me about your project or question' },
    },
    privacyNote: 'Your information will only be used to reply to your inquiry.',
    notConfigured:
      'Email sending (EmailJS) is not configured yet, so this form cannot send messages. Admin: set up .env following docs/setup-emailjs.md.',
    submit: 'Send',
    sending: 'Sending…',
    success: 'Your message has been sent. I will get back to you soon.',
    error: 'Failed to send. Please try again later.',
    validation: {
      required: (field) => `${field} is required`,
      email: 'Please enter a valid email address',
      maxLength: (field, max) => `${field} must be ${max} characters or fewer`,
    },
  },
  notFound: {
    title: 'Page not found',
    description: 'The page you are looking for may have been moved or deleted.',
  },
};
