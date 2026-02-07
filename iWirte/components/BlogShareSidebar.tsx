'use client';

import { useState } from 'react';
import styles from './BlogShareSidebar.module.css';

interface BlogShareSidebarProps {
  title: string;
  url: string;
  description?: string;
}

export default function BlogShareSidebar({ title, url, description }: BlogShareSidebarProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* Share Section */}
      <div className={styles.shareSection}>
        <h3 className={styles.sectionTitle}>Share This Article</h3>
        
        <div className={styles.shareButtons}>
          <a
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareButton}
            title="Share on X"
            aria-label="Share on X"
          >
            <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
              <path d="M5.50322 11.4794C6.28308 11.4843 7.05615 11.3348 7.77759 11.0395C8.49903 10.7442 9.15448 10.3091 9.70593 9.75932C10.2574 9.20956 10.6939 8.55611 10.99 7.83688C11.2862 7.11765 11.4362 6.34695 11.4313 5.56948V5.29792C11.8355 5.00265 12.1854 4.63981 12.4655 4.22548C12.0848 4.39146 11.682 4.50153 11.2697 4.55228C11.7069 4.29258 12.0349 3.88381 12.1931 3.40159C11.7856 3.64528 11.3389 3.81659 10.8726 3.90789C10.5587 3.57436 10.1432 3.35329 9.69048 3.27888C9.23778 3.20446 8.7731 3.28086 8.36833 3.49625C7.96357 3.71164 7.64129 4.05401 7.45136 4.47038C7.26143 4.88676 7.21444 5.35393 7.31765 5.79962C6.4894 5.75909 5.67899 5.5451 4.93921 5.17158C4.19942 4.79806 3.54684 4.27339 3.02396 3.63173C2.76031 4.08794 2.68039 4.62699 2.8004 5.13973C2.9204 5.65248 3.23137 6.1006 3.67033 6.39337C3.3465 6.38092 3.03018 6.29262 2.74695 6.13562V6.15863C2.74407 6.6354 2.90518 7.09875 3.20342 7.47146C3.50167 7.84416 3.91902 8.10371 4.38594 8.20685C4.08475 8.28761 3.76926 8.30019 3.46257 8.24367C3.59774 8.65027 3.85578 9.00523 4.20129 9.25986C4.5468 9.51449 4.96286 9.65633 5.39242 9.66592C4.65797 10.2553 3.74516 10.5797 2.80235 10.5865C2.63705 10.5817 2.47213 10.5679 2.30835 10.545C3.26264 11.1512 4.37172 11.4707 5.50322 11.4656" />
            </svg>
            <span className={styles.label}>X</span>
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareButton}
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className={styles.label}>Facebook</span>
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareButton}
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 13 13" fill="currentColor">
              <path d="M10.0362 1.7366H2.4032C2.03817 1.7366 1.74194 2.02498 1.74194 2.38008V10.0225C1.74194 10.3781 2.03817 10.6669 2.4032 10.6669H10.0362C10.4014 10.6669 10.6996 10.3781 10.6996 10.0225V2.38008C10.6996 2.02498 10.4014 1.7366 10.0362 1.7366ZM4.39865 9.34644H3.06942V5.08484H4.39865V9.34644ZM3.73404 4.50214C3.63286 4.50214 3.53268 4.48226 3.43921 4.44365C3.34574 4.40503 3.26083 4.34844 3.18931 4.27709C3.11779 4.20575 3.06107 4.12105 3.0224 4.02784C2.98373 3.93464 2.96386 3.83475 2.96392 3.73388C2.96392 3.53028 3.04505 3.33501 3.18947 3.19104C3.33388 3.04707 3.52974 2.96619 3.73397 2.96619C3.9382 2.96619 4.13407 3.04707 4.27848 3.19104C4.4229 3.33501 4.50403 3.53028 4.50403 3.73388C4.50403 3.93753 4.42292 4.13284 4.27854 4.2769C4.13416 4.42096 3.93831 4.50197 3.73404 4.50214ZM9.37465 9.34644H8.04754V7.27412C8.04754 6.77973 8.03784 6.14407 7.35693 6.14407C6.66544 6.14407 6.56007 6.68249 6.56007 7.23828V9.34657H5.23196V5.08484H6.50657V5.66679H6.52473C6.70215 5.33191 7.1356 4.97854 7.78205 4.97854C9.12645 4.97854 9.37477 5.8609 9.37477 7.00882V9.34644H9.37465Z" />
            </svg>
            <span className={styles.label}>LinkedIn</span>
          </a>

          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareButton}
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.01 1 4.31L2.39 21.89c-.26 1.04.86 2.06 1.9 1.79l5.58-1.61c1.3.64 2.77 1 4.33 1 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.89.84.84-2.89-.15-.28c-.63-1.15-.99-2.47-.99-3.88 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M16.65 12.75c-.35-.2-2.06-1.02-2.38-1.13-.32-.12-.56-.18-.8.18-.24.36-.92 1.12-1.12 1.35-.2.24-.4.27-.75.08-1.02-.6-1.69-1.35-2.34-2.47-.63-1.03-.67-1.82.04-2.56.72-.73.81-.77 1.04-1.27.24-.51.12-.94-.06-1.32-.18-.38-.8-1.93-1.1-2.64-.29-.71-.58-.61-.8-.62-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.92.44-.31.36-1.2 1.17-1.2 2.85 0 1.68 1.23 3.3 1.4 3.53.17.23 2.38 3.64 5.75 5.11.81.35 1.44.56 1.93.72.81.26 1.55.23 2.13.14.65-.1 2.06-.84 2.35-1.66.29-.82.29-1.53.21-1.67-.08-.14-.31-.22-.66-.39z"/>
            </svg>
            <span className={styles.label}>WhatsApp</span>
          </a>
        </div>

        {/* Copy Link */}
        <div className={styles.copySection}>
          <button
            onClick={handleCopyLink}
            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            title="Copy link to clipboard"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h3 className={styles.sectionTitle}>Subscribe</h3>
        <p className={styles.ctaText}>
          Get fresh content delivered to your inbox
        </p>
        <button className={styles.ctaButton}>
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}
