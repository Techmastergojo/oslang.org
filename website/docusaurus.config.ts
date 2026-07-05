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
        { to: '/docs/intro', label: 'Documentation', position: 'left' },
        { to: '/docs/intro#installation-setup', label: 'Downloads', position: 'left' },
        { to: '/docs/intro#what-is-os-lang', label: 'Community', position: 'left' },
        { href: 'https://github.com/Techmastergojo/os-lang', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro#what-is-os-lang' },
            { label: 'Installation', to: '/docs/intro#installation-setup' },
            { label: 'Environment Setup', to: '/docs/intro#environment-setup-qemu' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Memory Safety', to: '/docs/intro#memory-safety-unsafe' },
            { label: 'Hardware Alignment', to: '/docs/intro#hardware-alignment-packed' },
            { label: 'Pattern Matching', to: '/docs/intro#pattern-matching-match' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Compiler', href: 'https://github.com/Techmastergojo/os-lang' },
            { label: 'ASCII Keyboard Driver', to: '/docs/intro#creating-an-ascii-keyboard-driver' },
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
