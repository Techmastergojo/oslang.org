import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'link',
      label: '1. What is OS-Lang?',
      href: '/docs/intro#what-is-os-lang',
    },
    {
      type: 'link',
      label: '2. Comparison to C and Rust',
      href: '/docs/intro#comparison-to-c-and-rust',
    },
    {
      type: 'link',
      label: '3. Installation & Setup',
      href: '/docs/intro#installation-setup',
    },
    {
      type: 'link',
      label: '4. Environment Setup (QEMU)',
      href: '/docs/intro#environment-setup-qemu',
    },
    {
      type: 'link',
      label: '5. Memory Safety & @unsafe',
      href: '/docs/intro#memory-safety-unsafe',
    },
    {
      type: 'link',
      label: '6. Hardware Alignment (@packed)',
      href: '/docs/intro#hardware-alignment-packed',
    },
    {
      type: 'link',
      label: '7. Pattern Matching (match)',
      href: '/docs/intro#pattern-matching-match',
    },
    {
      type: 'link',
      label: '8. ASCII Keyboard Driver',
      href: '/docs/intro#creating-an-ascii-keyboard-driver',
    },
  ],
};

export default sidebars;
