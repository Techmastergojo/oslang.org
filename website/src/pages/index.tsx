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
