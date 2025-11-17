'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/image.png" alt="iWrite" width={32} height={32} priority />
          <span>iWrite</span>
        </div>

        {isMobileMenuOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
          <button
            className={styles.closeButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <Link href="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/services" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/careers" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Join Us
          </Link>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
