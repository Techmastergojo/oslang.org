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
