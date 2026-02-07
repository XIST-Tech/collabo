'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  blogTitle?: string;
}

export default function TableOfContents({ content, blogTitle }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the DOM (after the page is mounted)
    const headingElements = Array.from(
      document.querySelectorAll('.richTextContent h1, .richTextContent h2, .richTextContent h3, .richTextContent h4, .richTextContent h5, .richTextContent h6')
    ) as HTMLElement[];

    const extractedHeadings: Heading[] = headingElements.map((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent || `Heading ${index + 1}`;
      let id = heading.id;

      // Add id to the heading if it doesn't have one
      if (!id) {
        id = `heading-${index}`;
        heading.id = id;
      }

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
