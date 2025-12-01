'use client';

import { useEffect } from 'react';
import styles from './SubscriptionModal.module.css';

export interface SubscriptionModalProps {
  isOpen: boolean;
  type: 'success' | 'already-subscribed' | 'error' | null;
  message: string;
  onClose: () => void;
}

export default function SubscriptionModal({
  isOpen,
  type,
  message,
  onClose,
}: SubscriptionModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${styles.modal} ${styles[type || 'success']}`}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            {type === 'success' && (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="#10B981" strokeWidth="2" />
                <path d="M17 24L21 28L31 18" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {type === 'already-subscribed' && (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="#F59E0B" strokeWidth="2" />
                <circle cx="24" cy="20" r="2" fill="#F59E0B" />
                <path d="M24 26V36" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
            {type === 'error' && (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="#EF4444" strokeWidth="2" />
                <path d="M24 16V28M24 36C24.5523 36 25 35.5523 25 35C25 34.4477 24.5523 34 24 34C23.4477 34 23 34.4477 23 35C23 35.5523 23.4477 36 24 36Z" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <h3 className={styles.title}>
            {type === 'success' && 'Subscribed!'}
            {type === 'already-subscribed' && 'Already Subscribed'}
            {type === 'error' && 'Subscription Failed'}
          </h3>
          <p className={styles.message}>{message}</p>
          <button className={styles.closeButton} onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </>
  );
}
