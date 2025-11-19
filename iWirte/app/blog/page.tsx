'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import BlogNavbar from "@/components/BlogNavbar";
import BlogFooter from "@/components/BlogFooter";
import BlogFooterMobile from "@/components/BlogFooterMobile";
import styles from './blog.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  created_at: string;
}

type ViewMode = 'grid' | 'list';
type TimeFilter = 'all' | 'week' | 'month' | 'year';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setItemsPerPage(6);
        setViewMode('grid');
      } else {
        setItemsPerPage(9);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, featured_image, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
        setFilteredPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filterPosts = useCallback(() => {
    let filtered = [...posts];

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (timeFilter) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(post => new Date(post.created_at) >= cutoffDate);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, searchQuery, timeFilter]);

  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 1) return [1];
    
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage, currentPage + 1, currentPage + 2 <= totalPages ? currentPage + 2 : totalPages);
      }
    }
    
    return pages;
  };

  const handleReaction = async (postId: string, reaction: 'like' | 'love') => {
    try {
      const response = await fetch('/api/blog/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: postId, reactionType: reaction }),
      });
      
      if (response.ok) {
        console.log(`${reaction} registered`);
      }
    } catch (error) {
      console.error('Reaction error:', error);
    }
  };

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/blog/${slug}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this blog post',
        url: url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <BlogNavbar />
      
      <main className={styles.blogPage}>
        <section className={styles.hero}>
          <div className={styles.heroGifContainer}>
            {heroGifs.map((gif, index) => (
              <img
                key={gif}
                src={gif}
                alt="Blog Hero Animation"
                className={`${styles.heroImage} ${index === currentGifIndex ? styles.activeGif : ''}`}
              />
            ))}
          </div>
          <div className={styles.heroContent}>
            <h1>Blogs</h1>
            <div className={styles.breadcrumb}>
              <Link href="/blog-home">Home</Link>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black"/>
              </svg>
              <span>iWrite</span>
            </div>
          </div>
        </section>

        <section className={styles.controlsBar}>
          <div className={styles.viewToggles}>
            <button 
              className={viewMode === 'grid' ? styles.active : ''}
              onClick={() => !isMobile && setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.625 3.375H11.375C11.8391 3.375 12.2842 3.53304 12.6124 3.81434C12.9406 4.09564 13.125 4.47718 13.125 4.875V7.125C13.125 7.52282 12.9406 7.90436 12.6124 8.18566C12.2842 8.46696 11.8391 8.625 11.375 8.625H2.625C2.16087 8.625 1.71575 8.46696 1.38756 8.18566C1.05937 7.90436 0.875 7.52282 0.875 7.125V4.875C0.875 4.47718 1.05937 4.09564 1.38756 3.81434C1.71575 3.53304 2.16087 3.375 2.625 3.375ZM2.625 4.125C2.39294 4.125 2.17038 4.20402 2.00628 4.34467C1.84219 4.48532 1.75 4.67609 1.75 4.875V7.125C1.75 7.32391 1.84219 7.51468 2.00628 7.65533C2.17038 7.79598 2.39294 7.875 2.625 7.875H11.375C11.6071 7.875 11.8296 7.79598 11.9937 7.65533C12.1578 7.51468 12.25 7.32391 12.25 7.125V4.875C12.25 4.67609 12.1578 4.48532 11.9937 4.34467C11.8296 4.20402 11.6071 4.125 11.375 4.125H2.625ZM0.875 1.5C0.875 1.40054 0.921094 1.30516 1.00314 1.23483C1.08519 1.16451 1.19647 1.125 1.3125 1.125H12.6875C12.8035 1.125 12.9148 1.16451 12.9969 1.23483C13.0789 1.30516 13.125 1.40054 13.125 1.5C13.125 1.59946 13.0789 1.69484 12.9969 1.76516C12.9148 1.83549 12.8035 1.875 12.6875 1.875H1.3125C1.19647 1.875 1.08519 1.83549 1.00314 1.76516C0.921094 1.69484 0.875 1.59946 0.875 1.5ZM0.875 10.5C0.875 10.4005 0.921094 10.3052 1.00314 10.2348C1.08519 10.1645 1.19647 10.125 1.3125 10.125H12.6875C12.8035 10.125 12.9148 10.1645 12.9969 10.2348C13.0789 10.3052 13.125 10.4005 13.125 10.5C13.125 10.5995 13.0789 10.6948 12.9969 10.7652C12.9148 10.8355 12.8035 10.875 12.6875 10.875H1.3125C1.19647 10.875 1.08519 10.8355 1.00314 10.7652C0.921094 10.6948 0.875 10.5995 0.875 10.5Z" fill="black"/>
              </svg>
            </button>
            {!isMobile && (
              <button 
                className={viewMode === 'list' ? styles.active : ''}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 6.75H19.5C20.2956 6.75 21.0587 7.06607 21.6213 7.62868C22.1839 8.19129 22.5 8.95435 22.5 9.75V14.25C22.5 15.0456 22.1839 15.8087 21.6213 16.3713C21.0587 16.9339 20.2956 17.25 19.5 17.25H4.5C3.70435 17.25 2.94129 16.9339 2.37868 16.3713C1.81607 15.8087 1.5 15.0456 1.5 14.25V9.75C1.5 8.95435 1.81607 8.19129 2.37868 7.62868C2.94129 7.06607 3.70435 6.75 4.5 6.75V6.75ZM4.5 8.25C4.10218 8.25 3.72064 8.40804 3.43934 8.68934C3.15804 8.97064 3 9.35218 3 9.75V14.25C3 14.6478 3.15804 15.0294 3.43934 15.3107C3.72064 15.592 4.10218 15.75 4.5 15.75H19.5C19.8978 15.75 20.2794 15.592 20.5607 15.3107C20.842 15.0294 21 14.6478 21 14.25V9.75C21 9.35218 20.842 8.97064 20.5607 8.68934C20.2794 8.40804 19.8978 8.25 19.5 8.25H4.5ZM1.5 3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H21.75C21.9489 2.25 22.1397 2.32902 22.2803 2.46967C22.421 2.61032 22.5 2.80109 22.5 3C22.5 3.19891 22.421 3.38968 22.2803 3.53033C22.1397 3.67098 21.9489 3.75 21.75 3.75H2.25C2.05109 3.75 1.86032 3.67098 1.71967 3.53033C1.57902 3.38968 1.5 3.19891 1.5 3V3ZM1.5 21C1.5 20.8011 1.57902 20.6103 1.71967 20.4697C1.86032 20.329 2.05109 20.25 2.25 20.25H21.75C21.9489 20.25 22.1397 20.329 22.2803 20.4697C22.421 20.6103 22.5 20.8011 22.5 21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H2.25C2.05109 21.75 1.86032 21.671 1.71967 21.5303C1.57902 21.3897 1.5 21.1989 1.5 21V21Z" fill="black"/>
                </svg>
              </button>
            )}
          </div>

          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {!isMobile && (
            <div className={styles.showControl}>
              <span>Show</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Math.min(9, Number(e.target.value)))}
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
              </select>
            </div>
          )}

          <div className={styles.sortControl}>
            <span>Sort by</span>
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}>
              <option value="all">All time</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
              <option value="year">Past year</option>
            </select>
          </div>
        </section>

        <section className={styles.postsSection}>
          {loading ? (
            <div className={styles.loading}>Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>No blog posts found</div>
          ) : (
            <div className={`${styles.postsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
              {currentPosts.map((post, index) => {
                const postNumber = filteredPosts.length - (startIndex + index);
                const isHovered = hoveredPostId === post.id;
                
                return (
                  <article 
                    key={post.id} 
                    className={styles.postCard}
                    onMouseEnter={() => setHoveredPostId(post.id)}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    <div className={styles.postImage}>
                      <img 
                        src={post.featured_image || 'https://api.builder.io/api/v1/image/assets/TEMP/242d08d68f1c43f0f6a534efb9335fa0199c7e3f?width=760'} 
                        alt={post.title}
                      />
                      <div className={styles.postNumber}>{postNumber}</div>
                      
                      {isHovered && (
                        <div className={styles.hoverOverlay}>
                          <Link href={`/blog/${post.slug}`} className={styles.readBlogBtn}>
                            Read Blog
                          </Link>
                          <div className={styles.actions}>
                            <button onClick={() => handleShare(post.slug)}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 10.6666C11.4747 10.6666 11 10.8733 10.644 11.2046L5.94 8.46658C5.97333 8.31325 6 8.15992 6 7.99992C6 7.83992 5.97333 7.68658 5.94 7.53325L10.64 4.79325C11 5.12659 11.4733 5.33325 12 5.33325C13.1067 5.33325 14 4.43992 14 3.33325C14 2.22659 13.1067 1.33325 12 1.33325C10.8933 1.33325 10 2.22659 10 3.33325C10 3.49325 10.0267 3.64658 10.06 3.79992L5.36 6.53992C5 6.20659 4.52667 5.99992 4 5.99992C2.89333 5.99992 2 6.89325 2 7.99992C2 9.10659 2.89333 9.99992 4 9.99992C4.52667 9.99992 5 9.79325 5.36 9.45992L10.0587 12.2053C10.0211 12.3562 10.0014 12.511 10 12.6666C10 13.0621 10.1173 13.4488 10.3371 13.7777C10.5568 14.1066 10.8692 14.363 11.2346 14.5143C11.6001 14.6657 12.0022 14.7053 12.3902 14.6282C12.7781 14.551 13.1345 14.3605 13.4142 14.0808C13.6939 13.8011 13.8844 13.4447 13.9616 13.0568C14.0387 12.6688 13.9991 12.2667 13.8478 11.9012C13.6964 11.5358 13.44 11.2234 13.1111 11.0036C12.7822 10.7839 12.3956 10.6666 12 10.6666Z" fill="white"/>
                              </svg>
                              <span>Share</span>
                            </button>
                            <button onClick={() => handleReaction(post.id, 'like')}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.0799 7L11.0799 8L14.5199 4.55L10.9999 1L9.99992 2L11.7999 3.8H1.99992V5.2H11.8199L10.0799 7ZM5.85992 9L4.85992 8L1.41992 11.5L4.90992 15L5.90992 14L4.09992 12.2H13.9999V10.8H4.09992L5.85992 9Z" fill="white"/>
                              </svg>
                              <span>Like</span>
                            </button>
                            <button onClick={() => handleReaction(post.id, 'love')}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99949 14.0361C-5.33358 6.66669 3.99975 -1.33331 7.99949 3.72539C11.9998 -1.33331 21.3331 6.66669 7.99949 14.0361Z" stroke="white" strokeWidth="1.8"/>
                              </svg>
                              <span>Love</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.postInfo}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      <p className={styles.postDate}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {totalPages > 0 && (
          <section className={styles.pagination}>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                className={`${styles.pageBtn} ${currentPage === pageNum ? styles.active : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                className={styles.nextBtn}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next page"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </section>
        )}

        <section className={styles.featuresSection}>
          <div className={styles.feature}>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2096 1.58203C21.6335 1.58203 21.0934 1.73754 20.6276 2.0077V0.791016C20.6276 0.354164 20.2734 0 19.8366 0H7.18034C6.74344 0 6.38928 0.354164 6.38928 0.791016V2.01735C5.91978 1.74118 5.37351 1.58203 4.79053 1.58203C3.04586 1.58203 1.62646 3.00143 1.62646 4.74609C1.62646 6.07685 2.02081 7.36267 2.76685 8.46461C4.0369 10.3405 5.60306 10.8273 6.89901 11.3457C7.64625 13.2066 9.15736 14.6814 11.0423 15.3796L10.4591 19.0898H10.3444C9.03591 19.0898 7.97136 20.1544 7.97136 21.4629V25.418H7.18034C6.74349 25.418 6.38933 25.7721 6.38933 26.209C6.38933 26.6458 6.74349 27 7.18034 27H19.8366C20.2734 27 20.6276 26.6458 20.6276 26.209C20.6276 25.7721 20.2734 25.418 19.8366 25.418H19.0456V21.4629C19.0456 20.1544 17.981 19.0898 16.6725 19.0898H16.5579L15.9746 15.3797C17.8624 14.6804 19.3752 13.2024 20.1213 11.3377C21.3455 10.848 22.9503 10.3598 24.2334 8.46461C24.9794 7.36267 25.3738 6.07679 25.3738 4.74609C25.3737 3.00143 23.9543 1.58203 22.2096 1.58203ZM6.38342 9.4356C4.45472 8.6641 3.2085 6.82341 3.2085 4.74609C3.2085 3.87376 3.9182 3.16406 4.79053 3.16406C5.66286 3.16406 6.37256 3.87376 6.37256 4.74609C6.37256 4.80173 6.37841 4.85594 6.38933 4.9083V8.70117C6.38933 8.9554 6.40299 9.20647 6.42914 9.4539L6.38342 9.4356ZM17.4635 25.418H9.55339V23.8359H17.4635V25.418ZM16.6725 20.6719C17.1087 20.6719 17.4635 21.0267 17.4635 21.4629V22.2539H9.55339V21.4629C9.55339 21.0267 9.90824 20.6719 10.3444 20.6719C10.7736 20.6719 15.6661 20.6719 16.6725 20.6719ZM12.0605 19.0898L12.5839 15.7604C12.8866 15.7998 13.1952 15.8203 13.5085 15.8203C13.8218 15.8203 14.1303 15.7997 14.433 15.7604L14.9565 19.0898H12.0605ZM19.0456 8.70117C19.0456 11.7543 16.5616 14.2383 13.5085 14.2383C10.4553 14.2383 7.97136 11.7543 7.97136 8.70117V4.74609H19.0456V8.70117ZM19.0456 3.16406H7.97136V1.58203H19.0456V3.16406ZM20.6167 9.4356L20.5886 9.44684C20.6142 9.20173 20.6276 8.95298 20.6276 8.70117V4.74609C20.6276 3.87376 21.3373 3.16406 22.2096 3.16406C23.082 3.16406 23.7917 3.87376 23.7917 4.74609C23.7917 6.82341 22.5455 8.66415 20.6167 9.4356Z" fill="#242424"/>
            </svg>
            <div>
              <h3>Top Memes</h3>
              <p>Internet's finest</p>
            </div>
          </div>

          <div className={styles.feature}>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5537 9.56756C25.1974 8.46436 25.3493 6.80834 24.4233 5.52969C23.49 4.24097 21.8668 3.87468 20.9502 3.20432C20.0433 2.54102 19.1995 1.09763 17.674 0.599818C16.1915 0.116033 14.6754 0.772523 13.5 0.772523C12.3247 0.772523 10.8088 0.115875 9.32602 0.599766C7.80073 1.09747 6.9563 2.54118 6.04995 3.20416C5.13438 3.87373 3.50995 4.24102 2.57681 5.52953C1.65159 6.80713 1.80193 8.46694 1.44629 9.56751C1.10784 10.615 0 11.8721 0 13.5001C0 15.1291 1.10658 16.3814 1.44629 17.4327C1.80257 18.5359 1.65069 20.1919 2.57671 21.4706C3.50995 22.7593 5.13311 23.1256 6.04979 23.796C6.95656 24.4592 7.80047 25.9027 9.32602 26.4004C10.8075 26.8839 12.3259 26.2277 13.5 26.2277C14.6724 26.2277 16.1944 26.8832 17.674 26.4005C19.1993 25.9028 20.0432 24.4594 20.95 23.7961C21.8656 23.1265 23.4901 22.7592 24.4232 21.4707C25.3485 20.1931 25.198 18.5334 25.5537 17.4327C25.8922 16.3852 27 15.1281 27 13.5001C27 11.8712 25.8937 10.6193 25.5537 9.56756ZM23.5466 16.7841C23.1313 18.0695 23.2401 19.508 22.7149 20.2334C22.1826 20.9683 20.7841 21.304 19.705 22.0933C18.6377 22.8739 17.8897 24.1112 17.0197 24.395C16.1966 24.6637 14.8552 24.1182 13.5001 24.1182C12.135 24.1182 10.8074 24.6648 9.9804 24.395C9.1105 24.1112 8.36351 22.8747 7.29506 22.0933C6.22234 21.3088 4.81591 20.9662 4.28514 20.2332C3.7616 19.5104 3.86627 18.0619 3.45352 16.7842C3.04894 15.5323 2.10938 14.4483 2.10938 13.5001C2.10938 12.551 3.0481 11.4707 3.45342 10.2161C3.8687 8.93079 3.75991 7.49215 4.28514 6.76689C4.81713 6.03241 6.21664 5.69559 7.29506 4.9069C8.36573 4.12385 9.10907 2.88949 9.9803 2.6052C10.8027 2.33689 12.1484 2.882 13.4999 2.882C14.8675 2.882 16.1917 2.33504 17.0196 2.6052C17.8894 2.88902 18.637 4.12596 19.705 4.90695C20.7776 5.69148 22.1841 6.0341 22.7149 6.76695C23.2385 7.48999 23.1333 8.93702 23.5465 10.216V10.2161C23.9511 11.468 24.8906 12.5519 24.8906 13.5001C24.8906 14.4493 23.9519 15.5295 23.5466 16.7841ZM18.3591 10.1148C18.771 10.5267 18.771 11.1945 18.3591 11.6064L13.0801 16.8854C12.6682 17.2973 12.0003 17.2973 11.5885 16.8854L8.64095 13.9379C8.22904 13.526 8.22899 12.8582 8.6409 12.4463C9.0528 12.0345 9.72069 12.0344 10.1324 12.4463L12.3343 14.6481L16.8675 10.1149C17.2794 9.70298 17.9472 9.70298 18.3591 10.1148Z" fill="#242424"/>
            </svg>
            <div>
              <h3>100% Originality</h3>
              <p>pure drafts</p>
            </div>
          </div>

          <div className={styles.feature}>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.9066 13.996V1.70098C24.9066 1.26235 24.551 0.906738 24.1123 0.906738H2.8328C2.39416 0.906738 2.03855 1.26235 2.03855 1.70098V14.9762C1.65541 15.032 1.28084 15.1807 0.949485 15.4267C-0.0951068 16.1674 -0.34217 17.8251 0.532824 18.8474L4.11026 23.1843C6.32473 25.776 8.67712 26.0936 12.1742 26.0936C15.1753 26.0936 16.517 26.1068 19.1324 25.5109L21.6792 24.9017C22.0921 25.4784 22.7477 25.852 23.4847 25.852H24.7393C25.9858 25.852 27 24.7836 27 23.4704V16.3704C27 15.1165 26.0752 14.0866 24.9066 13.996ZM21.3366 15.6298L20.2783 15.0923C18.5384 14.2141 16.5266 14.1815 14.7592 15.0033C14.277 15.1929 13.2252 15.8293 12.6797 15.808H9.00753C7.78947 15.808 6.79847 16.799 6.79847 18.0171V18.5963C6.79164 18.5891 6.78449 18.5822 6.77776 18.5749L4.15543 15.7285C3.99674 15.5563 3.81846 15.4121 3.6271 15.2965V7.41658H10.1268V10.3281C10.1268 10.7667 10.4824 11.1223 10.9211 11.1223H15.9328C16.3715 11.1223 16.7271 10.7667 16.7271 10.3281V7.41658H23.3181V13.996C22.3901 14.0676 21.6163 14.7315 21.3366 15.6298ZM11.7153 7.41658H15.1385V9.53383H11.7153V7.41658ZM23.3181 5.82809H16.7271V2.49523H23.3181V5.82809H23.3181ZM15.1386 2.49523V5.82815H11.7153V2.49523H15.1386ZM10.1268 2.49523V5.82815H3.62704V2.49523H10.1268ZM18.7638 23.9657C16.3477 24.5191 14.8926 24.4967 12.2027 24.4967C8.91984 24.4967 7.33363 24.4436 5.33573 22.1735L1.75829 17.8365C1.13603 17.0262 2.26311 16.0697 2.98715 16.8047L5.60948 19.6512C6.30254 20.3825 7.17467 20.785 8.24961 20.8086H15.52C15.9587 20.8086 16.3143 20.453 16.3143 20.0144C16.3143 19.5757 15.9587 19.2201 15.52 19.2201H8.3869V18.017C8.3869 17.6748 8.66526 17.3964 9.00747 17.3964H12.6796C13.5069 17.4556 14.701 16.7649 15.4288 16.4436C16.7526 15.8281 18.2593 15.8525 19.5608 16.5094L21.2241 17.3542V23.3772L18.7638 23.9657ZM25.4116 23.4704C25.4116 23.9077 25.11 24.2634 24.7394 24.2634H23.4848C23.1141 24.2634 22.8126 23.9077 22.8126 23.4704V16.3704C22.8126 15.9331 23.1142 15.5773 23.4848 15.5773H24.7394C25.11 15.5773 25.4116 15.9331 25.4116 16.3704V23.4704Z" fill="#242424"/>
            </svg>
            <div>
              <h3>Shared Insights</h3>
              <p>real experiences</p>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
      <BlogFooterMobile />
    </>
  );
}
