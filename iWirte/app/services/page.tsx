'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './services.module.css';

export default function ServicesPage() {
  const services = [
    {
      id: 'thesis',
      title: 'Thesis & Dissertation Writing',
      description: 'Comprehensive research and writing support for your academic journey. We help you craft well-structured, thoroughly researched theses that meet academic standards. Our writers have expertise in various fields and understand the intricacies of academic writing.',
      features: ['In-depth Research', 'Proper Citations', 'Multiple Revisions', 'Plagiarism-Free', 'Expert Writers', 'Timely Delivery'],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2Fa589cf02c3164dc18b7325df881ed0f6?format=webp&width=800',
    },
    {
      id: 'projects',
      title: 'Project Work & Reports',
      description: 'Professional project documentation and reports that showcase your work effectively. From technical reports to business proposals, we bring clarity and professionalism to your work. Each project is customized to meet your specific requirements and academic or professional standards.',
      features: ['Clear Structure', 'Data Analysis', 'Professional Formatting', 'Executive Summaries', 'Custom Solutions', 'Quality Assurance'],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2F15a2d0ed3b4a41ac807248f3a517a53a?format=webp&width=800',
    },
    {
      id: 'copywriting',
      title: 'Professional Copywriting',
      description: "Compelling copy that drives action. Whether it's web content, marketing materials, or brand messaging, we make your words work. We understand the power of persuasive writing and craft messages that resonate with your target audience while maintaining authenticity.",
      features: ['SEO Optimized', 'Brand Voice', 'Conversion Focused', 'Engaging Content', 'Marketing Expertise', 'Results-Driven'],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2Fd43245026ab3481bbe5317586ac15761?format=webp&width=800',
    },
    {
      id: 'synopsis',
      title: 'Synopsis Writing',
      description: 'Concise, engaging summaries that capture the essence of your content. Perfect for books, research papers, or business documents. We distill complex information into clear, compelling synopses that engage readers and highlight key points without overwhelming them.',
      features: ['Key Points Highlighted', 'Clear & Concise', 'Engaging Format', 'Quick Turnaround', 'Professional Polish', 'Flexible Length'],
      image: 'https://picsum.photos/800/600?random=13',
    },
    {
      id: 'fiction',
      title: 'Fiction & Creative Writing',
      description: 'Stories that transport readers to new worlds. Our creative writers craft compelling narratives with memorable characters, engaging plots, and vivid imagery. Whether you need a short story, novel, or serialized content, we bring your creative vision to life with professionalism and artistry.',
      features: ['Original Stories', 'Character Development', 'Plot Structure', 'Genre Expertise', 'Creative Direction', 'Editing Support'],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F934f466d54e44638814059cefea847fc%2Fedc088a14f2d4d139bc7d5c2b3701654?format=webp&width=800',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.headerTitle}>Our Services</h1>
            <p className={styles.headerSubtitle}>
              Comprehensive writing solutions tailored to your needs. Quality, creativity, and professionalism in every word.
            </p>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={index % 2 === 1 ? styles.serviceItemReverse : styles.serviceItem}
                >
                  <div className={styles.serviceContent}>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>

                    <div className={styles.featuresGrid}>
                      {service.features.map((feature) => (
                        <div key={feature} className={styles.featureItem}>
                          <div className={styles.featureIcon}>✓</div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact" className={styles.cta}>
                      Get Started
                    </Link>
                  </div>

                  <div className={styles.serviceImage}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={800}
                      height={600}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.customSection}>
          <div className={styles.container}>
            <h2>Custom Solutions</h2>
            <p>
              Don&apos;t see exactly what you&apos;re looking for? We offer bespoke writing solutions tailored to your unique needs.
              Every project is treated with the same dedication to quality and professionalism.
            </p>
            <Link href="/contact" className={styles.customCta}>
              Discuss Your Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
