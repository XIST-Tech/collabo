'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
  const whatsappNumber = '08113301521';
  const gmailAddress = 'iwrite79@gmail.com';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
  const gmailUrl = `mailto:${gmailAddress}`;

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.headerTitle}>Get In Touch</h1>
            <p className={styles.headerSubtitle}>
              Ready to start your project or join our team? We'd love to hear from you. Reach out and let's create something amazing together.
            </p>
          </div>
        </section>

        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroImage}>
                <Image
                  src="https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2Fc309cef5cffd4488aa76005017891376?format=webp&width=800"
                  alt="Creative Writing and Learning"
                  width={600}
                  height={500}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.heroText}>
                <h2>Connect With iWrite</h2>
                <p>Whether you're looking for professional writing services or interested in joining our talented team of writers, we're here to help. Reach out through any of our channels below.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.socialSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Contact Us</h2>
            <p className={styles.sectionSubtitle}>Get in touch with us through WhatsApp or Email</p>
            
            <div className={styles.socialGrid}>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialCard}
              >
                <div className={styles.socialCardContent}>
                  <div className={styles.socialImageWrapper}>
                    <Image
                      src="https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2Fee27f4120d614265bed8b04677b873c9?format=webp&width=400"
                      alt="WhatsApp"
                      width={150}
                      height={150}
                      className={styles.socialImage}
                    />
                  </div>
                  <div className={styles.socialInfo}>
                    <h3>WhatsApp</h3>
                    <p>{whatsappNumber}</p>
                    <span className={styles.contactText}>Message us on WhatsApp</span>
                  </div>
                </div>
              </a>

              <a 
                href={gmailUrl}
                className={styles.socialCard}
              >
                <div className={styles.socialCardContent}>
                  <div className={styles.socialImageWrapper}>
                    <Image
                      src="https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2F60ffa65659f64452ba58165cd8c44dac?format=webp&width=400"
                      alt="Email"
                      width={150}
                      height={150}
                      className={styles.socialImage}
                    />
                  </div>
                  <div className={styles.socialInfo}>
                    <h3>Email</h3>
                    <p>{gmailAddress}</p>
                    <span className={styles.contactText}>Send us an email</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>


        <section className={styles.lookingForSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What We're Looking For</h2>
            <div className={styles.lookingForGrid}>
              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4C5.44772 4 5 4.44772 5 5V27C5 27.5523 5.44772 28 6 28H26C26.5523 28 27 27.5523 27 27V5C27 4.44772 26.5523 4 26 4H6ZM7 6H25V26H7V6Z" fill="currentColor"/>
                    <path d="M10 10H16V12H10V10Z" fill="currentColor"/>
                    <path d="M10 14H22V16H10V14Z" fill="currentColor"/>
                    <path d="M10 18H22V20H10V18Z" fill="currentColor"/>
                    <path d="M10 22H16V24H10V22Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.lookingForContent}>
                  <h3>Academic Writers</h3>
                  <p>Experience with thesis, dissertations, and research papers</p>
                </div>
              </div>

              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3C7.44772 3 7 3.44772 7 4V28C7 28.5523 7.44772 29 8 29H24C24.5523 29 25 28.5523 25 28V4C25 3.44772 24.5523 3 24 3H8ZM9 5H23V27H9V5Z" fill="currentColor"/>
                    <path d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10H20C20.5523 10 21 9.55228 21 9C21 8.44772 20.5523 8 20 8H12Z" fill="currentColor"/>
                    <path d="M11 13C11 12.4477 11.4477 12 12 12H20C20.5523 12 21 12.4477 21 13V22C21 22.5523 20.5523 23 20 23H12C11.4477 23 11 22.5523 11 22V13Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.lookingForContent}>
                  <h3>Copywriters</h3>
                  <p>Skilled in marketing copy, web content, and brand messaging</p>
                </div>
              </div>

              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2C5.44772 2 5 2.44772 5 3V29C5 29.5523 5.44772 30 6 30H26C26.5523 30 27 29.5523 27 29V3C27 2.44772 26.5523 2 26 2H6ZM7 4H25V28H7V4Z" fill="currentColor"/>
                    <path d="M11 8C10.4477 8 10 8.44772 10 9C10 9.55228 10.4477 10 11 10H21C21.5523 10 22 9.55228 22 9C22 8.44772 21.5523 8 21 8H11Z" fill="currentColor"/>
                    <path d="M10 14C10 13.4477 10.4477 13 11 13H21C21.5523 13 22 13.4477 22 14V24C22 24.5523 21.5523 25 21 25H11C10.4477 25 10 24.5523 10 24V14Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.lookingForContent}>
                  <h3>Fiction Writers</h3>
                  <p>Creative storytellers with published work or strong portfolios</p>
                </div>
              </div>

              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2ZM16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4Z" fill="currentColor"/>
                    <path d="M16 8C15.4477 8 15 8.44772 15 9V16C15 16.5523 15.4477 17 16 17H22C22.5523 17 23 16.5523 23 16C23 15.4477 22.5523 15 22 15H17V9C17 8.44772 16.5523 8 16 8Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.lookingForContent}>
                  <h3>Technical Writers</h3>
                  <p>Ability to simplify complex topics and create clear documentation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statusSection}>
          <div className={styles.container}>
            <h3 className={styles.statusTitle}>Current Status</h3>
            <div className={styles.statusContent}>
              <p>
                While we don't have open positions at the moment, we're always interested in connecting with talented writers.
                Submit your information through WhatsApp or Email above, and we'll reach out when opportunities arise.
              </p>
              <p>
                We're a growing startup of passionate writers, and we're building something special. Join us on this journey!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
