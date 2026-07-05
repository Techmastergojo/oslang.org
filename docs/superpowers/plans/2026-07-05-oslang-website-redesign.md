# OS-Lang Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the OS-Lang documentation website into a high-performance, premium developer site that combines the color palette and layout of python.org with a modern Flat-UI aesthetic.

**Architecture:** We will refine Docusaurus global configuration and inject custom CSS variables for fonts (Inter, JetBrains Mono) and Python-themed colors. We will update the homepage component to use a responsive two-column grid with a custom tabbed code/terminal widget and interactive feature cards.

**Tech Stack:** React 19, TypeScript, Docusaurus 3.10.1, Vanilla CSS

---

### Task 1: CSS Theme Variables and Font Imports

**Files:**
- Modify: `website/src/css/custom.css`

- [ ] **Step 1: Write implementation**
Update `website/src/css/custom.css` to import Google Fonts and define the new design system tokens and styling overrides:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --ifm-color-primary: #3776ab;
  --ifm-color-primary-dark: #2f6592;
  --ifm-color-primary-darker: #2c5f89;
  --ifm-color-primary-darkest: #244e71;
  --ifm-color-primary-light: #448cc9;
  --ifm-color-primary-lighter: #5496ce;
  --ifm-color-primary-lightest: #85b4df;
  
  --ifm-background-color: #ffffff;
  --ifm-background-surface-color: #f8fafc;
  
  --docusaurus-highlighted-code-line-bg: rgba(55, 118, 171, 0.1);
  --ifm-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --ifm-heading-color: #1e293b;
  --ifm-font-color-base: #334155;

  /* Python specific colors */
  --py-yellow: #ffd43b;
  --py-yellow-hover: #ffe066;
  --py-blue: #3776ab;
  --py-blue-hover: #2f6592;
  --py-dark-blue: #1e2530;
  --py-console-bg: #111827;
  --py-grey: #64748b;
  --py-border: #e2e8f0;
}

/* Navbar styling like Python.org */
.navbar {
  background-color: var(--py-dark-blue);
  color: white;
  border-bottom: 3px solid var(--py-yellow);
  padding: 0.75rem 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.navbar__title {
  color: white;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.025em;
}

.navbar__item {
  color: #cbd5e1;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s, border-bottom 0.2s;
  padding: 0.25rem 0.75rem;
}

.navbar__item:hover, .navbar__item--active {
  color: white;
  text-decoration: none;
}

.navbar__item--active {
  color: var(--py-yellow) !important;
}

/* Hero Section Styles */
.heroBanner {
  padding: 5rem 0;
  text-align: left;
  position: relative;
  overflow: hidden;
  background-color: var(--py-dark-blue);
  color: white;
}

.heroContainer {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 4rem;
}

@media (max-width: 996px) {
  .heroContainer {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
}

.heroText {
  flex: 1.2;
}

.heroTitle {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.heroSubtitle {
  font-size: 1.25rem;
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Tabbed Console Window Styles */
.heroCode {
  flex: 1;
  background: var(--py-console-bg);
  border-radius: 12px;
  border: 1px solid #374151;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3);
  overflow: hidden;
  width: 100%;
  max-width: 550px;
}

.consoleHeader {
  background: #1f2937;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #374151;
}

.consoleButtons {
  display: flex;
  gap: 0.5rem;
}

.consoleBtn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btnRed { background: #ef4444; }
.btnYellow { background: #eab308; }
.btnGreen { background: #22c55e; }

.consoleTabs {
  display: flex;
  gap: 0.25rem;
}

.consoleTab {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.consoleTab:hover {
  color: white;
  background: #374151;
}

.consoleTabActive {
  color: var(--py-yellow);
  background: #111827;
  font-weight: 600;
}

.consoleBody {
  padding: 1.5rem;
  min-height: 250px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: left;
  overflow-x: auto;
}

.consoleBody pre {
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  box-shadow: none;
  color: #e5e7eb;
}

.consoleBody .comment {
  color: #6b7280;
  font-style: italic;
}

.consoleBody .keyword {
  color: var(--py-yellow);
  font-weight: 600;
}

.consoleBody .builtin {
  color: #60a5fa;
}

.consoleBody .string {
  color: #34d399;
}

.consoleBody .decorator {
  color: #f472b6;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.25rem;
}

@media (max-width: 996px) {
  .buttons {
    justify-content: center;
  }
}

.button--py-yellow {
  background: var(--py-yellow);
  color: #0f172a;
  border: none;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.button--py-yellow:hover {
  background: var(--py-yellow-hover);
  color: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  text-decoration: none;
}

.button--py-blue {
  background: var(--py-blue);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.button--py-blue:hover {
  background: var(--py-blue-hover);
  color: white;
  transform: translateY(-2px);
  text-decoration: none;
}

/* Feature grid overrides */
.featuresGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.featureCard {
  background: white;
  padding: 2.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  border: 1px solid var(--py-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.featureCard::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--py-blue);
  transition: background 0.3s;
}

.featureCard:nth-child(even)::before {
  background: var(--py-yellow);
}

.featureCard:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  border-color: #cbd5e1;
}

.featureCard h3 {
  color: var(--ifm-heading-color);
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.featureCard p {
  color: var(--py-grey);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* Footer styling */
.footer {
  background-color: var(--py-dark-blue);
  color: #94a3b8;
  border-top: 1px solid #334155;
  padding: 4rem 2rem 2rem;
}

.footer__title {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
}

.footer__link-item {
  color: #cbd5e1;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.footer__link-item:hover {
  color: var(--py-yellow);
  text-decoration: none;
}
```

- [ ] **Step 2: Verify compilation**
Run a command to check if Docusaurus styling build passes:
Run: `npm --prefix website run build` inside workspace.
Expected: Build passes with no CSS compilation syntax errors.

---

### Task 2: Navbar & Footer Docusaurus Configuration

**Files:**
- Modify: `website/docusaurus.config.ts`

- [ ] **Step 1: Write config updates**
Replace the `themeConfig` section in `website/docusaurus.config.ts` to update the footer links and styling options:

```typescript
// Replace lines 33-60 in website/docusaurus.config.ts with:
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
```

- [ ] **Step 2: Verify config parses**
Run: `npm --prefix website run build`
Expected: Build finishes with no configuration schema errors.

---

### Task 3: Tabbed Terminal Component and Hero Section

**Files:**
- Modify: `website/src/pages/index.tsx`

- [ ] **Step 1: Refactor index.tsx**
Rewrite `website/src/pages/index.tsx` to add a `useState` tab manager for the mockup terminal and construct the new two-column layout:

```typescript
import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState<'code' | 'log'>('code');

  return (
    <header className="heroBanner">
      <div className="heroContainer">
        <div className="heroText">
          <h1 className="heroTitle">OS-Lang</h1>
          <p className="heroSubtitle">
            {siteConfig.tagline}.<br/>
            An intuitive, memory-safe, and highly optimized systems language designed for Ring 0 development.
          </p>
          <div className="buttons">
            <Link
              className="button button--py-yellow"
              to="/docs/getting-started/installation">
              Download OS-Lang 1.0.0
            </Link>
            <Link
              className="button button--py-blue"
              to="/docs/intro">
              Documentation
            </Link>
          </div>
        </div>
        
        <div className="heroCode">
          <div className="consoleHeader">
            <div className="consoleButtons">
              <span className="consoleBtn btnRed"></span>
              <span className="consoleBtn btnYellow"></span>
              <span className="consoleBtn btnGreen"></span>
            </div>
            <div className="consoleTabs">
              <button 
                className={clsx('consoleTab', activeTab === 'code' && 'consoleTabActive')}
                onClick={() => setActiveTab('code')}>
                kernel.os
              </button>
              <button 
                className={clsx('consoleTab', activeTab === 'log' && 'consoleTabActive')}
                onClick={() => setActiveTab('log')}>
                build.log
              </button>
            </div>
          </div>
          <div className="consoleBody">
            {activeTab === 'code' ? (
              <pre>
<code><span className="comment"># Safe Entry Point for Interrupt Handler</span>
<span className="decorator">@interrupt</span>
<span className="keyword">fn</span> <span className="builtin">keyboard_handler</span>(stack_frame: *InterruptFrame) &#123;
    <span className="keyword">let</span> scancode: u8 = <span className="keyword">@unsafe</span> &#123;
        port_inb(0x60)
    &#125;;
    
    <span className="keyword">if</span> scancode &lt; 0x80 &#123;
        print_char(scancode);
    &#125;
    
    <span className="keyword">@unsafe</span> &#123;
        pic_send_eoi(1);
    &#125;
&#125;
</code>
              </pre>
            ) : (
              <pre>
<code><span className="comment">$ oslang build --target=x86_64-elf kernel.os</span>
[INFO] Parsing compiler tree... Done.
[INFO] Verifying safety boundaries... Done.
[INFO] Emitting LLVM IR module... Done.
[INFO] Linking objects using linker.ld... Done.
<span className="string">SUCCESS: kernel.bin generated (24.3 KB)</span>

<span className="comment">$ oslang run --qemu kernel.bin</span>
[QEMU] Booting OS-Lang Kernel v1.0.0...
[QEMU] GDT &amp; IDT loaded successfully.
[QEMU] PS/2 keyboard interface initialized.
[QEMU] Hello World! Kernel loaded at 0x100000.
<span className="builtin">_</span></code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} | Systems Programming`}
      description="The next generation of systems programming languages">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
```

- [ ] **Step 2: Verify React build**
Run: `npm --prefix website run build`
Expected: Successfully generates the production HTML pages with no syntax or React errors.

---

### Task 4: Homepage Features Grid Refinement

**Files:**
- Modify: `website/src/components/HomepageFeatures/index.tsx`

- [ ] **Step 1: Update HomepageFeatures component**
Replace the static features array in `website/src/components/HomepageFeatures/index.tsx` to align with the new pillars and premium descriptions:

```typescript
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Hardware Native',
    description: (
      <>
        Define custom <code>@packed</code> structs that line up perfectly with hardware descriptor tables 
        (GDT, IDT) without compiler alignment padding or manual padding offsets.
      </>
    ),
  },
  {
    title: 'Memory Safety Boundaries',
    description: (
      <>
        Write memory-safe logic for your operating system logic while isolating raw memory maps, DMA, 
        and hardware pointer manipulation within explicit, audited <code>@unsafe</code> block boundaries.
      </>
    ),
  },
  {
    title: 'Built-in Intrinsics',
    description: (
      <>
        Access processor operations (like <code>cli()</code>, <code>sti()</code>, <code>inb()</code>, and <code>outb()</code>) 
        as type-safe, built-in intrinsics directly in your code without inline assembly.
      </>
    ),
  },
  {
    title: 'Interrupt Handlers',
    description: (
      <>
        Decorate functions with <code>@interrupt</code> to automatically compile them under the appropriate CPU 
        calling convention, managing registers and stack frames safely.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className="featureCard">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features} style={{padding: '5rem 0', backgroundColor: 'var(--bg-light)'}}>
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
        <div className="featuresGrid">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify component build**
Run: `npm --prefix website run build`
Expected: Build passes.

---

### Task 5: Final Production Build and Verification

- [ ] **Step 1: Production compile**
Compile the entire website project:
Run: `npm --prefix website run build`
Expected: Finished build folder `build/` is generated, logs output: `Success! Generated static files in "build"`.

- [ ] **Step 2: Commit all changes**
Commit all changes to git:
```bash
git add website/src/css/custom.css website/docusaurus.config.ts website/src/pages/index.tsx website/src/components/HomepageFeatures/index.tsx
git commit -m "feat: redesign website theme and components with modern python aesthetics"
```
Expected: Files successfully committed.
