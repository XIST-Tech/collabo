import { createClient } from '@/lib/supabase';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import BlogFooter from '@/components/BlogFooter';
import BlogFooterMobile from '@/components/BlogFooterMobile';
import BlogReactions from '@/components/BlogReactions';
import BlogComments from '@/components/BlogComments';
import WelcomeModal from '@/components/WelcomeModal';
import styles from './blog-post.module.css';

export const revalidate = 60;

async function getBlog(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogNavbar />
      <WelcomeModal blogId={blog.id} />
      
      {/* Hero Section with Cover Image */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <img 
            src={blog.featured_image || 'https://api.builder.io/api/v1/image/assets/TEMP/9e49dcaf5e4e4432d24340132ccef5037868fd5b?width=2880'} 
            alt={blog.title}
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{blog.title}</h1>
          <div className={styles.breadcrumb}>
            <Link href="/blog-home" className={styles.breadcrumbLink}>Home</Link>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black"/>
            </svg>
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {blog.excerpt && (
        <section className={styles.descriptionSection}>
          <div className={styles.descriptionContent}>
            <p>{blog.excerpt}</p>
          </div>
        </section>
      )}

      {/* Main Article Content */}
      <div className={styles.article}>
        <article className={styles.container}>
          <div
            className={styles.richTextContent}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className={styles.reactionsSection}>
            <BlogReactions 
              blogId={blog.id} 
              initialLikes={blog.likes || 0} 
              initialLoves={blog.loves || 0} 
              initialDislikes={blog.dislikes || 0} 
            />
          </div>
        </article>

        <section className={styles.container}>
          <div className={styles.commentsSection}>
            <BlogComments blogId={blog.id} />
          </div>
        </section>
      </div>

      <BlogFooter />
      <BlogFooterMobile />
    </>
  );
}
