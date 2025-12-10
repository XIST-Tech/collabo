import Link from 'next/link';
import styles from './PhotoExperienceSection.module.css';

export default function PhotoExperienceSection() {
  return (
    <section className={styles.photoExperienceSection}>
      <div className={styles.container}>
        <div className={styles.imageGallery}>
          <div className={styles.leftImages}>
            <div className={styles.smallImageTop}>
              <img 
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop" 
                alt="Photography moment 1"
              />
            </div>
            <div className={styles.smallImageBottom}>
              <img 
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&auto=format&fit=crop" 
                alt="Photography moment 2"
              />
            </div>
          </div>
          <div className={styles.largeImage}>
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop" 
              alt="Main photography showcase"
            />
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.label}>Not your regular blog</span>
          <h2 className={styles.title}>You never know how far a shared perspective will take minds.</h2>
          <p className={styles.description}>
            Find some reflections from everyday stories and book takes, a few trending tech tools to help boost productivity, and thoughts on discoveries and innovations happening in the engineering and aviation space. And hey, whoever said memes can’t teach a thing or two?
          </p>
          <Link href="/blog" className={styles.subscribeButton}>
            Subscribe
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9L13.5 10.5L18 15L12 21" stroke="#FCF3F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
