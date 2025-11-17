'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './BlogNavbar.module.css';

export default function BlogNavbar() {
  const [activeLink, setActiveLink] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/blog-home" className={styles.logo}>
            <Image 
              src="/image.png" 
              alt="iWrite Blog Logo" 
              width={145} 
              height={40}
              className={styles.logoImage}
            />
          </Link>
          
          <nav className={styles.nav}>
            <Link 
              href="/blog-home" 
              className={`${styles.navLink} ${activeLink === 'home' ? styles.active : ''}`}
              onMouseEnter={() => setActiveLink('home')}
              onMouseLeave={() => setActiveLink('')}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={`${styles.navLink} ${activeLink === 'blog' ? styles.active : ''}`}
              onMouseEnter={() => setActiveLink('blog')}
              onMouseLeave={() => setActiveLink('')}
            >
              Blog
            </Link>
          </nav>

          <div className={styles.headerIcons}>
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15.5832V8.2915H23.3333V17.0415H21M21 22.8748H23.3333V19.9582H21M9.33333 17.0415C12.4483 17.0415 18.6667 18.9957 18.6667 22.8748V27.2498H0V22.8748C0 18.9957 6.21833 17.0415 9.33333 17.0415ZM9.33333 3.9165C10.571 3.9165 11.758 4.53109 12.6332 5.62505C13.5083 6.71901 14 8.20274 14 9.74984C14 11.2969 13.5083 12.7807 12.6332 13.8746C11.758 14.9686 10.571 15.5832 9.33333 15.5832C8.09566 15.5832 6.90867 14.9686 6.0335 13.8746C5.15833 12.7807 4.66667 11.2969 4.66667 9.74984C4.66667 8.20274 5.15833 6.71901 6.0335 5.62505C6.90867 4.53109 8.09566 3.9165 9.33333 3.9165ZM9.33333 19.8123C5.86833 19.8123 2.21667 21.9415 2.21667 22.8748V24.479H16.45V22.8748C16.45 21.9415 12.7983 19.8123 9.33333 19.8123ZM9.33333 6.68734C8.68355 6.68734 8.06039 7.00999 7.60092 7.58432C7.14146 8.15865 6.88333 8.93761 6.88333 9.74984C6.88333 10.5621 7.14146 11.341 7.60092 11.9154C8.06039 12.4897 8.68355 12.8123 9.33333 12.8123C9.98311 12.8123 10.6063 12.4897 11.0657 11.9154C11.5252 11.341 11.7833 10.5621 11.7833 9.74984C11.7833 8.93761 11.5252 8.15865 11.0657 7.58432C10.6063 7.00999 9.98311 6.68734 9.33333 6.68734Z" fill="black"/>
            </svg>
            
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.1667 28.7083L16.933 22.1546M19.8333 13.3958C19.8333 16.6834 18.7885 19.8363 16.9288 22.161C15.0691 24.4857 12.5467 25.7917 9.91667 25.7917C7.28664 25.7917 4.76428 24.4857 2.90453 22.161C1.04479 19.8363 0 16.6834 0 13.3958C0 10.1083 1.04479 6.95533 2.90453 4.63066C4.76428 2.30599 7.28664 1 9.91667 1C12.5467 1 15.0691 2.30599 16.9288 4.63066C18.7885 6.95533 19.8333 10.1083 19.8333 13.3958V13.3958Z" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.54167 2.45825C2.43583 2.45825 -0.0833333 5.68992 -0.0833333 9.677C-0.0833333 12.8955 0.900833 20.5343 10.5908 28.2562C10.765 28.3931 10.9642 28.4655 11.1667 28.4655C11.3692 28.4655 11.5683 28.3931 11.7425 28.2562C21.4325 20.5343 22.4167 12.8955 22.4167 9.677C22.4167 5.68992 19.8975 2.45825 16.7917 2.45825C13.6858 2.45825 11.1667 6.83325 11.1667 6.83325C11.1667 6.83325 8.6475 2.45825 5.54167 2.45825Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <button 
            className={styles.menuButton} 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.8335 6.04175H24.1668" stroke="#B88E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.8335 14.5H24.1668" stroke="#B88E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.8335 22.9583H24.1668" stroke="#B88E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div 
        className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <button 
          className={styles.closeButton} 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.mobileMenuContent}>
          <Link href="/blog-home" className={styles.mobileLogo}>
            <Image 
              src="/image.png" 
              alt="iWrite Blog Logo" 
              width={120} 
              height={50}
              className={styles.mobileLogoImage}
            />
          </Link>

          <nav className={styles.mobileNav}>
            <Link 
              href="/blog-home" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
