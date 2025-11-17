'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  const heroGifs = [
    'https://hgtwbiyrrmkauzsicqug.supabase.co/storage/v1/object/public/pictures/gif2.gif',
    'https://hgtwbiyrrmkauzsicqug.supabase.co/storage/v1/object/public/pictures/gif1.gif'
  ];

  useEffect(() => {
    const gifInterval = setInterval(() => {
      setCurrentGifIndex(prev => (prev + 1) % heroGifs.length);
    }, 3000);

    return () => clearInterval(gifInterval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed') === 'true') {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }
  }, []);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmail('');
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '0' }}>
        {/* Hero Section with Video Embed */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Getting information doesn't have to be boring
            </h1>
            <p className={styles.heroSubtitle}>
              At iWrite, we believe learning should be engaging, fun, and professionally crafted.
              From academic thesis to creative fiction, copywriting to compelling synopsis—we make
              every word count. Professional writing with a human touch.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/services" className={`${styles.button} ${styles.buttonPrimary}`}>
                Explore Services
              </Link>
              <Link href="/contact" className={`${styles.button} ${styles.buttonSecondary}`}>
                Get Started
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              {heroGifs.map((gif, index) => (
                <img
                  key={gif}
                  src={gif}
                  alt="Hero Animation"
                  className={`${styles.heroGif} ${index === currentGifIndex ? styles.activeGif : ''}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose iWrite Section */}
        <section className={styles.whySection}>
          <div className="chr-grid-default-parent">
            <h2 className={styles.sectionTitle}>Why Choose iWrite?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>✦</div>
                <h3>Professional Quality</h3>
                <p>Every piece is crafted by experienced writers who understand your needs</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>✓</div>
                <h3>Engaging Content</h3>
                <p>We make learning fun while maintaining professional and formal standards</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>◆</div>
                <h3>Timely Delivery</h3>
                <p>Your deadline is our priority. We deliver on time, every time</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>★</div>
                <h3>100% Original</h3>
                <p>Unique, plagiarism-free content tailored specifically to your requirements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className={styles.servicesSection}>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesVisual}>
              <div className={styles.visualBackground}>
                <svg className={styles.decorativeShape1} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="#F07922" opacity="0.6"/>
                </svg>
                <svg className={styles.decorativeShape2} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,100 L100,0 L200,100 L100,200 Z" fill="#FF698D" opacity="0.4"/>
                </svg>
                <div className={styles.serviceImageWrapper}>
                  <img
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop"
                    alt="Writing Services"
                    className={styles.serviceImage}
                  />
                  <div className={styles.imageOverlay}>
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.4" d="M20.045 4.57661C21.3317 3.47446 23.4387 3.47446 24.744 4.57661L27.6901 7.11714C28.2495 7.60283 29.2937 7.99512 30.0396 7.99512H33.2095C35.186 7.99512 36.8083 9.62031 36.8083 11.6004V14.7761C36.8083 15.5046 37.1999 16.5694 37.6847 17.1298L40.2206 20.0813C41.3207 21.3703 41.3207 23.4812 40.2206 24.7888L37.6847 27.7403C37.1999 28.3007 36.8083 29.3468 36.8083 30.094V33.2697C36.8083 35.2498 35.186 36.875 33.2095 36.875H30.0396C29.3124 36.875 28.2495 37.2673 27.6901 37.753L24.744 40.2935C23.4574 41.3956 21.3503 41.3956 20.045 40.2935L17.0989 37.753C16.5395 37.2673 15.4953 36.875 14.7494 36.875H11.5236C9.54704 36.875 7.9248 35.2498 7.9248 33.2697V30.0753C7.9248 29.3468 7.53322 28.3007 7.06705 27.7403L4.54977 24.7701C3.46827 23.4812 3.46827 21.3889 4.54977 20.1L7.06705 17.1298C7.53322 16.5694 7.9248 15.5233 7.9248 14.7948V11.5817C7.9248 9.60163 9.54704 7.97644 11.5236 7.97644H14.7494C15.4766 7.97644 16.5395 7.58415 17.0989 7.09846L20.045 4.57661Z" fill="#F07922"/>
                      <path d="M20.1196 28.3382C19.7467 28.3382 19.3924 28.1888 19.1313 27.9272L14.6189 23.4066C14.0781 22.8648 14.0781 21.9682 14.6189 21.4265C15.1596 20.8847 16.0547 20.8847 16.5954 21.4265L20.1196 24.9571L28.1376 16.9245C28.6784 16.3828 29.5734 16.3828 30.1142 16.9245C30.6549 17.4662 30.6549 18.3629 30.1142 18.9046L21.1079 27.9272C20.8468 28.1888 20.4925 28.3382 20.1196 28.3382Z" fill="#F07922"/>
                    </svg>
                    <span className={styles.badgeText}>PROFESSIONAL<br/>WRITING</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.servicesContent}>
              <span className={styles.servicesLabel}>WHAT WE OFFER</span>
              <h2 className={styles.servicesTitle}>Excellence in Every Word We Write</h2>

              <div className={styles.servicesList}>
                <div className={styles.serviceItem}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 2.5C12.5277 2.5 10.111 3.23311 8.05537 4.60663C5.99976 5.98015 4.3976 7.93238 3.4515 10.2165C2.50541 12.5005 2.25787 15.0139 2.74018 17.4386C3.2225 19.8634 4.41301 22.0907 6.16116 23.8388C7.90932 25.587 10.1366 26.7775 12.5614 27.2598C14.9861 27.7421 17.4995 27.4946 19.7835 26.5485C22.0676 25.6024 24.0198 24.0002 25.3934 21.9446C26.7669 19.889 27.5 17.4723 27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5ZM20.8875 12.1375L13.3875 19.6375C13.2713 19.7547 13.133 19.8477 12.9807 19.9111C12.8284 19.9746 12.665 20.0072 12.5 20.0072C12.335 20.0072 12.1716 19.9746 12.0193 19.9111C11.867 19.8477 11.7287 19.7547 11.6125 19.6375L9.1125 17.1375C8.99595 17.021 8.9035 16.8826 8.84042 16.7303C8.77735 16.578 8.74488 16.4148 8.74488 16.25C8.74488 16.0852 8.77735 15.922 8.84042 15.7697C8.9035 15.6174 8.99595 15.479 9.1125 15.3625C9.22905 15.246 9.36741 15.1535 9.51969 15.0904C9.67196 15.0273 9.83517 14.9949 10 14.9949C10.1648 14.9949 10.328 15.0273 10.4803 15.0904C10.6326 15.1535 10.7709 15.246 10.8875 15.3625L12.5 16.9875L19.1125 10.3625C19.3479 10.1271 19.6671 9.99489 20 9.99489C20.3329 9.99489 20.6521 10.1271 20.8875 10.3625C21.1229 10.5979 21.2551 10.9171 21.2551 11.25C21.2551 11.5829 21.1229 11.9021 20.8875 12.1375Z" fill="#D4AF37"/>
                  </svg>
                  <span>Academic Thesis & Dissertations</span>
                </div>

                <div className={styles.serviceItem}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 2.5C12.5277 2.5 10.111 3.23311 8.05537 4.60663C5.99976 5.98015 4.3976 7.93238 3.4515 10.2165C2.50541 12.5005 2.25787 15.0139 2.74018 17.4386C3.2225 19.8634 4.41301 22.0907 6.16116 23.8388C7.90932 25.587 10.1366 26.7775 12.5614 27.2598C14.9861 27.7421 17.4995 27.4946 19.7835 26.5485C22.0676 25.6024 24.0198 24.0002 25.3934 21.9446C26.7669 19.889 27.5 17.4723 27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5ZM20.8875 12.1375L13.3875 19.6375C13.2713 19.7547 13.133 19.8477 12.9807 19.9111C12.8284 19.9746 12.665 20.0072 12.5 20.0072C12.335 20.0072 12.1716 19.9746 12.0193 19.9111C11.867 19.8477 11.7287 19.7547 11.6125 19.6375L9.1125 17.1375C8.99595 17.021 8.9035 16.8826 8.84042 16.7303C8.77735 16.578 8.74488 16.4148 8.74488 16.25C8.74488 16.0852 8.77735 15.922 8.84042 15.7697C8.9035 15.6174 8.99595 15.479 9.1125 15.3625C9.22905 15.246 9.36741 15.1535 9.51969 15.0904C9.67196 15.0273 9.83517 14.9949 10 14.9949C10.1648 14.9949 10.328 15.0273 10.4803 15.0904C10.6326 15.1535 10.7709 15.246 10.8875 15.3625L12.5 16.9875L19.1125 10.3625C19.3479 10.1271 19.6671 9.99489 20 9.99489C20.3329 9.99489 20.6521 10.1271 20.8875 10.3625C21.1229 10.5979 21.2551 10.9171 21.2551 11.25C21.2551 11.5829 21.1229 11.9021 20.8875 12.1375Z" fill="#D4AF37"/>
                  </svg>
                  <span>Professional Copywriting & Marketing Content</span>
                </div>

                <div className={styles.serviceItem}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 2.5C12.5277 2.5 10.111 3.23311 8.05537 4.60663C5.99976 5.98015 4.3976 7.93238 3.4515 10.2165C2.50541 12.5005 2.25787 15.0139 2.74018 17.4386C3.2225 19.8634 4.41301 22.0907 6.16116 23.8388C7.90932 25.587 10.1366 26.7775 12.5614 27.2598C14.9861 27.7421 17.4995 27.4946 19.7835 26.5485C22.0676 25.6024 24.0198 24.0002 25.3934 21.9446C26.7669 19.889 27.5 17.4723 27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5ZM20.8875 12.1375L13.3875 19.6375C13.2713 19.7547 13.133 19.8477 12.9807 19.9111C12.8284 19.9746 12.665 20.0072 12.5 20.0072C12.335 20.0072 12.1716 19.9746 12.0193 19.9111C11.867 19.8477 11.7287 19.7547 11.6125 19.6375L9.1125 17.1375C8.99595 17.021 8.9035 16.8826 8.84042 16.7303C8.77735 16.578 8.74488 16.4148 8.74488 16.25C8.74488 16.0852 8.77735 15.922 8.84042 15.7697C8.9035 15.6174 8.99595 15.479 9.1125 15.3625C9.22905 15.246 9.36741 15.1535 9.51969 15.0904C9.67196 15.0273 9.83517 14.9949 10 14.9949C10.1648 14.9949 10.328 15.0273 10.4803 15.0904C10.6326 15.1535 10.7709 15.246 10.8875 15.3625L12.5 16.9875L19.1125 10.3625C19.3479 10.1271 19.6671 9.99489 20 9.99489C20.3329 9.99489 20.6521 10.1271 20.8875 10.3625C21.1229 10.5979 21.2551 10.9171 21.2551 11.25C21.2551 11.5829 21.1229 11.9021 20.8875 12.1375Z" fill="#D4AF37"/>
                  </svg>
                  <span>Creative Fiction & Synopsis Writing</span>
                </div>
              </div>

              <Link href="/services" className={styles.servicesCtaButton}>
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Google Banner Pattern */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h2>Stay in the Loop</h2>
            <p>Get insights, writing tips, and updates from the iWrite blog</p>
            {subscribed && (
              <div className={styles.successMessage}>
                ✓ Successfully subscribed! Check your email for confirmation.
              </div>
            )}
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSignup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribed}
              />
              <button type="submit" className={styles.subscribeBtn} disabled={subscribed}>
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
