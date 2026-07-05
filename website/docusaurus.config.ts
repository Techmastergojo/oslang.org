import {themes as prismThemes} from 'prism-react-renderer';

import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OS-Lang',
  tagline: 'The Next Generation of Systems Programming',
  favicon: 'img/favicon.ico',
  url: 'https://os-lang.dev',
  baseUrl: '/',
  organizationName: 'Techmastergojo', 
  projectName: 'os-lang', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Techmastergojo/os-lang/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true, // Force Python.org light style base
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'OS-Lang',
      logo: {
        alt: 'OS-Lang Logo',
        src: 'img/logo.svg',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Documentation' },
        { to: '/docs/getting-started/installation', label: 'Downloads', position: 'left' },
        { to: '/docs/intro', label: 'Community', position: 'left' },
        { href: 'https://github.com/Techmastergojo/os-lang', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Installation', to: '/docs/getting-started/installation' },
            { label: 'Environment Setup', to: '/docs/getting-started/environment-setup' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Language Guide', to: '/docs/language-guide/memory-safety' },
            { label: 'Hardware Alignment', to: '/docs/language-guide/hardware-alignment' },
            { label: 'Pattern Matching', to: '/docs/language-guide/pattern-matching' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Compiler', href: 'https://github.com/Techmastergojo/os-lang' },
            { label: 'Examples', to: '/docs/examples/ascii-keyboard' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Techmastergojo. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
