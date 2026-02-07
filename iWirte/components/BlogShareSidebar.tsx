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
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
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
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareButton}
            title="Share on Twitter"
            aria-label="Share on Twitter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
            </svg>
            <span className={styles.label}>Twitter</span>
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
              <path d="M18 2h-3a6 6 0 00-6 6v9h-2v4h2v2h4v-2h3v-4h-3V8a2 2 0 012-2h3z" />
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
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
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-4.82 5.591-4.82 9.328 0 3.908 1.618 7.6 4.557 10.378 2.939 2.778 6.923 4.3 11.08 4.3h.004c8.057 0 14.288-6.783 14.288-15.064 0-4.018-1.589-7.773-4.48-10.619C20.955 2.134 17.292.5 13.51.5 5.453.5.755 6.783.755 15.064c0 3.859 1.568 7.512 4.413 10.258" />
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
