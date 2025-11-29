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
                <div className={styles.lookingForIcon}>📚</div>
                <div className={styles.lookingForContent}>
                  <h3>Academic Writers</h3>
                  <p>Experience with thesis, dissertations, and research papers</p>
                </div>
              </div>

              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>✍</div>
                <div className={styles.lookingForContent}>
                  <h3>Copywriters</h3>
                  <p>Skilled in marketing copy, web content, and brand messaging</p>
                </div>
              </div>

              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>📖</div>
                <div className={styles.lookingForContent}>
                  <h3>Fiction Writers</h3>
                  <p>Creative storytellers with published work or strong portfolios</p>
                </div>
              </div>

              <div className={styles.lookingForCard}>
                <div className={styles.lookingForIcon}>⚡</div>
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
