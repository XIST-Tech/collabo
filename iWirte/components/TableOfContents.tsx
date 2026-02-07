'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse the HTML content to extract headings
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(content, 'text/html');
    const headingElements = Array.from(
      htmlDoc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );

    const extractedHeadings: Heading[] = headingElements.map((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent || `Heading ${index + 1}`;
      const id = heading.id || `heading-${index}`;
      
      // Add id to the heading if it doesn't have one
      heading.id = id;
      
      return { id, text, level };
    });

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [content]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return (
      <div className={styles.tableOfContents}>
        <h3 className={styles.title}>Table of Contents</h3>
        <p className={styles.noContent}>No headings found</p>
      </div>
    );
  }

  return (
    <nav className={styles.tableOfContents}>
      <h3 className={styles.title}>Table of Contents</h3>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${styles.item} ${styles[`level-${heading.level}`]}`}
            style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
          >
            <button
              className={`${styles.link} ${activeId === heading.id ? styles.active : ''}`}
              onClick={() => handleClick(heading.id)}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
