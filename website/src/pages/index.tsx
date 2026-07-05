import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

const snippets = [
  {
    name: 'VGA Greeting',
    code: `# Bootloader entry - VGA Text Greeting
@entry
@unsafe
fn main() -> void:
    let mut vga: ptr[u16] = 0xB8000 as ptr[u16]
    let msg: str = "Hello, World!"
    
    # Write directly to VGA screen memory
    vga[0] = 0x0F48 # 'H'
    vga[1] = 0x0F65 # 'e'
    vga[2] = 0x0F6C # 'l'
    vga[3] = 0x0F6C # 'l'
    vga[4] = 0x0F6F # 'o'`
  },
  {
    name: 'Keyboard Driver',
    code: `# PS/2 Keyboard Interrupt Handler
@interrupt(33)
@unsafe
fn keyboard_handler() -> void:
    # Read scancode from PS/2 Port 0x60
    let scancode: u8 = inb(0x60)
    
    # Process key-down events (top bit is 0)
    if scancode < 0x80:
        let ascii: char = map_scancode(scancode)
        print_char(ascii)
        
    # Send End of Interrupt to PIC
    outb(0x20, 0x20)`
  },
  {
    name: 'Spinlock Scheduler',
    code: `# Atomic Spinlock for Scheduler
let mut task_lock: u64 = 0

@unsafe
fn lock_scheduler() -> void:
    # Spin until lock is acquired atomically
    let mut prev: u64 = 1
    prev = atomic_cmpxchg(&task_lock as ptr[u64], 0, 1)

@unsafe
fn unlock_scheduler() -> void:
    atomic_xchg(&task_lock as ptr[u64], 0)`
  }
];

function highlightOSLang(text: string) {
  // Escape HTML entities to prevent rendering issues
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Placeholders for comments so they are not parsed as keywords
  const commentSegments: string[] = [];
  html = html.replace(/(#[^\n]*)/g, (match) => {
    commentSegments.push(match);
    return `___COMMENT_PLACEHOLDER_${commentSegments.length - 1}___`;
  });

  // Placeholders for string literals
  const stringSegments: string[] = [];
  html = html.replace(/(".*?")/g, (match) => {
    stringSegments.push(match);
    return `___STRING_PLACEHOLDER_${stringSegments.length - 1}___`;
  });

  // Decorators (@unsafe, @entry, @interrupt, @packed, @naked)
  html = html.replace(/(@[a-zA-Z0-9_]+(\([0-9a-zA-Z_]+\))?)/g, '<span class="decorator">$1</span>');

  // Keywords
  const keywords = ['fn', 'let', 'mut', 'match', 'enum', 'if', 'return', 'struct', 'hwmap', 'as', 'ptr', 'sizeof', 'void', 'int'];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(regex, '<span class="keyword">$1</span>');
  });

  // Numbers
  html = html.replace(/\b(0x[0-9a-fA-F]+|\d+)\b/g, '<span class="number">$1</span>');

  // Restore comments and strings with formatting classes
  commentSegments.forEach((val, idx) => {
    html = html.replace(`___COMMENT_PLACEHOLDER_${idx}___`, `<span class="comment">${val}</span>`);
  });
  stringSegments.forEach((val, idx) => {
    html = html.replace(`___STRING_PLACEHOLDER_${idx}___`, `<span class="string">${val}</span>`);
  });

  return html;
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState<'code' | 'log'>('code');
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(30);

  useEffect(() => {
    if (activeTab !== 'code') return;

    let timer: NodeJS.Timeout;
    const fullText = snippets[snippetIndex].code;

    if (!isDeleting && currentText === fullText) {
      // Pause when full text is typed
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && currentText === '') {
      // Switch snippet when fully deleted
      setIsDeleting(false);
      setSnippetIndex((prev) => (prev + 1) % snippets.length);
    } else {
      timer = setTimeout(() => {
        const nextLength = isDeleting ? currentText.length - 1 : currentText.length + 1;
        setCurrentText(fullText.substring(0, nextLength));
        setTypingSpeed(isDeleting ? 15 : 30);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, snippetIndex, typingSpeed, activeTab]);

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
              to="/docs/intro#installation-setup">
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
              <pre style={{ margin: 0, position: 'relative' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightOSLang(currentText) }} />
                <span className="consoleCursor" />
              </pre>
            ) : (
              <pre style={{ margin: 0 }}>
                <code>
                  <span className="comment">$ oslang build --target=x86_64-elf kernel.os</span>
                  {'\n'}
                  [INFO] Parsing compiler tree... Done.
                  {'\n'}
                  [INFO] Verifying safety boundaries... Done.
                  {'\n'}
                  [INFO] Emitting LLVM IR module... Done.
                  {'\n'}
                  [INFO] Linking objects using linker.ld... Done.
                  {'\n'}
                  <span className="string">SUCCESS: kernel.bin generated (24.3 KB)</span>
                  {'\n\n'}
                  <span className="comment">$ oslang run --qemu kernel.bin</span>
                  {'\n'}
                  [QEMU] Booting OS-Lang Kernel v1.0.0...
                  {'\n'}
                  [QEMU] GDT &amp; IDT loaded successfully.
                  {'\n'}
                  [QEMU] PS/2 keyboard interface initialized.
                  {'\n'}
                  [QEMU] Hello World! Kernel loaded at 0x100000.
                  {'\n'}
                  <span className="consoleCursor" />
                </code>
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
