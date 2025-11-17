'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import BlogNavbar from '@/components/BlogNavbar';
import BlogFooter from '@/components/BlogFooter';
import styles from './blog-home.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  created_at: string;
}

const PLACEHOLDER_IMAGES = [
  'https://api.builder.io/api/v1/image/assets/TEMP/0d531b182086ae2884767e4c254239bf334be327?width=808',
  'https://api.builder.io/api/v1/image/assets/TEMP/eb372cc3522a0eaa7cf66b405615f661669ca5cc?width=744',
  'https://api.builder.io/api/v1/image/assets/TEMP/18982a8b83a3ac25f63a7e624af2d92ce7c750ff?width=744',
  'https://api.builder.io/api/v1/image/assets/TEMP/445c0e1093a71bc686ef2ea9b9c8db156272baad?width=754',
  'https://api.builder.io/api/v1/image/assets/TEMP/cbddb60b9f52f3a9129ab1861cf1cf10fdea37a9?width=754'
];

export default function BlogHomePage() {
  const [carouselPosts, setCarouselPosts] = useState<BlogPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, featured_image, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        
        const posts: BlogPost[] = [];
        
        for (let i = 0; i < 5; i++) {
          if (data && data[i]) {
            posts.push(data[i]);
          } else {
            posts.push({
              id: `placeholder-${i}`,
              title: 'Empty',
              slug: '#',
              excerpt: '',
              featured_image: PLACEHOLDER_IMAGES[i],
              created_at: 'No date'
            });
          }
        }
        
        setCarouselPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        const placeholderPosts = PLACEHOLDER_IMAGES.map((img, i) => ({
          id: `placeholder-${i}`,
          title: 'Empty',
          slug: '#',
          excerpt: '',
          featured_image: img,
          created_at: 'No date'
        }));
        setCarouselPosts(placeholderPosts);
      }
    };

    fetchLatestPosts();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || carouselPosts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselPosts.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % carouselPosts.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === 'No date') return 'No date';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return 'No date';
    }
  };

  const getVisiblePosts = () => {
    const posts = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % carouselPosts.length;
      posts.push({ ...carouselPosts[index], position: i });
    }
    return posts;
  };

  const truncateTitle = (title: string, maxLength: number = 12) => {
    if (title === 'Empty') return title;
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  return (
    <>
      <BlogNavbar />
      
      <main className={styles.blogHome}>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/c27fbc899849064013e341710b529e9ad4039ac3?width=2880" 
              alt="Blog Hero Background"
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroCard}>
              <span className={styles.heroLabel}>My Blog</span>
              <h1 className={styles.heroTitle}>
                Insights & Exper<span style={{ color: '#B88E2F' }}>iences</span> From My writing Journey
              </h1>
              <p className={styles.heroSubtitle}>
                Pieces from my keep notes—no rules, just genuine, informal takes on life, work, and everything in between.
              </p>
              <Link href="/blog" className={styles.heroButton}>
                READ NOW
              </Link>
              <div className={styles.heroButtons}>
                <Link href="/blog" className={styles.heroButtonPrimary}>
                  Read Now
                </Link>
                <Link href="/blog" className={styles.heroButtonSecondary}>
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.characteristicsSection}>
          <div className={styles.characteristicsHeader}>
            <h2>Not Your Regular Blog</h2>
            <p>What you'll find woven into the fabric of every post</p>
          </div>
          <div className={styles.characteristicsGrid}>
            <div className={styles.characteristicItem}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/445c0e1093a71bc686ef2ea9b9c8db156272baad?width=754" 
                alt="Insightful"
              />
              <h3>Insightful</h3>
            </div>
            <div className={styles.characteristicItem}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cbddb60b9f52f3a9129ab1861cf1cf10fdea37a9?width=754" 
                alt="Uncensored"
              />
              <h3>Uncensored</h3>
            </div>
            <div className={styles.characteristicItem}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/fe18b3f0174200483981dd01d4926900da13f9ce?width=754" 
                alt="Fun"
              />
              <h3>Fun</h3>
            </div>
          </div>
        </section>

        <section className={styles.latestPostsSection}>
          <div className={styles.latestPostsContent}>
            <div className={styles.latestPostsText}>
              <h2>New Reads: What's Been on My Mind Lately</h2>
              <p>Freshly written thoughts, musings, and lessons learned from the chaos of life. Find your next scroll-stopper here</p>
              <Link href="/blog" className={styles.viewMoreBtn}>
                View More
              </Link>
            </div>

            <div className={styles.carouselWrapper}>
              <div className={styles.carouselContainer}>
                {carouselPosts.length > 0 && getVisiblePosts().map((post, idx) => (
                  <div 
                    key={`${post.id}-${idx}`}
                    className={`${styles.carouselSlide} ${idx === 0 ? styles.activeSlide : ''}`}
                  >
                    <div className={styles.carouselImageWrapper}>
                      <img 
                        src={post.featured_image || PLACEHOLDER_IMAGES[0]} 
                        alt={post.title}
                        className={styles.carouselImage}
                      />
                      {idx === 0 && (
                        <div className={styles.carouselOverlay}>
                          <div className={styles.overlayContent}>
                            <div className={styles.postMeta}>
                              <span className={styles.postNumber}>
                                {String((currentSlide + 1)).padStart(2, '0')}
                              </span>
                              <div className={styles.metaDivider}></div>
                              <span className={styles.postDate}>{formatDate(post.created_at)}</span>
                            </div>
                            <h3 className={styles.postTitle}>
                              {truncateTitle(post.title, 15)}
                            </h3>
                          </div>
                          {post.slug !== '#' && (
                            <Link href={`/blog/${post.slug}`} className={styles.readMoreArrow}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20.3906 12H2.91284M20.3906 12L14.5647 6M20.3906 12L14.5647 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.carouselControls}>
                <button onClick={nextSlide} className={styles.nextButton} aria-label="Next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5L16 12L9 19" stroke="#B88E2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className={styles.carouselIndicators}>
                  {carouselPosts.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </>
  );
}
