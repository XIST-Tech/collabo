# Blog Improvements Guide

## Overview
This document outlines the improvements made to the blog system for better social media sharing and desktop user experience.

## 1. Social Media Meta Tags

### What's New
When someone shares a blog link on WhatsApp, Twitter, Facebook, LinkedIn, or any platform that uses Open Graph and Twitter Card meta tags, they will now see:
- **Featured Image**: The blog's hero image
- **Title**: The blog title
- **Description**: The blog excerpt/description

### How It Works
The blog post page now uses `generateMetadata()` to dynamically create meta tags for each blog post:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  // Returns Open Graph and Twitter Card meta tags
}
```

### Setup Required
You need to set the `NEXT_PUBLIC_SITE_URL` environment variable:

1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_SITE_URL` to your domain:
   - **Local**: `http://localhost:3000`
   - **Production**: `https://yourdomain.com`

Example `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
```

## 2. Enhanced Blog Post Layout

### Desktop Layout (1536px and above)
Three-column layout with:
- **Left Sidebar (240px)**: Table of Contents
  - Auto-generated from blog post headings
  - Sticky positioning
  - Active heading indicator
  - Smooth scroll navigation

- **Main Content (800px max-width)**: Your blog content centered
  - Same width as before (60% of content area)
  - All reactions and comments

- **Right Sidebar (240px)**: Share & Call-to-Action
  - Social media share buttons (Twitter, Facebook, LinkedIn, WhatsApp)
  - Copy link button
  - Newsletter subscription CTA
  - Community engagement section

### Mobile Layout (Below 1536px)
- Full-width single column layout (unchanged)
- Sidebars hidden automatically
- All content remains accessible

## 3. New Components Added

### TableOfContents Component
**File**: `iWirte/components/TableOfContents.tsx`

Features:
- Automatically extracts H1-H6 headings from blog content
- Generates clickable navigation
- Active heading highlighting
- Smooth scroll navigation
- Sticky positioning with scroll support
- Responsive hidden on mobile

**Usage**:
```tsx
<TableOfContents content={blog.content} />
```

### BlogShareSidebar Component
**File**: `iWirte/components/BlogShareSidebar.tsx`

Features:
- Social media share buttons (Twitter, Facebook, LinkedIn, WhatsApp)
- Copy link to clipboard functionality
- Newsletter subscription CTA (customize the text)
- Community engagement section
- Fully responsive design

**Usage**:
```tsx
<BlogShareSidebar 
  title={blog.title}
  url={blogUrl}
  description={blog.excerpt}
/>
```

## 4. File Changes

### Modified Files
1. **`app/blog/[slug]/page.tsx`**
   - Added `generateMetadata()` function
   - Integrated new sidebar components
   - Updated layout structure

2. **`app/blog/[slug]/blog-post.module.css`**
   - Added three-column layout styles
   - Added media queries for desktop breakpoint (1536px)
   - Maintained mobile responsiveness

### New Files Created
1. `components/TableOfContents.tsx` - Table of contents component
2. `components/TableOfContents.module.css` - Table of contents styles
3. `components/BlogShareSidebar.tsx` - Share sidebar component
4. `components/BlogShareSidebar.module.css` - Share sidebar styles
5. `.env.example` - Environment variables template

## 5. Customization Guide

### Customize Share CTA Text
Edit `BlogShareSidebar.tsx`, find the CTA section and modify:
```tsx
<p className={styles.ctaText}>
  Your custom text here about why people should subscribe
</p>
```

### Customize Share Button Links
Modify the `shareLinks` object in `BlogShareSidebar.tsx`:
```typescript
const shareLinks = {
  twitter: `https://twitter.com/intent/tweet?...`,
  facebook: `https://www.facebook.com/sharer/...`,
  // Add or modify more platforms here
};
```

### Adjust Sidebar Width
In `blog-post.module.css`, modify:
```css
.leftSidebar {
  width: 240px; /* Change this value */
}

.rightSidebar {
  width: 240px; /* Change this value */
}
```

### Change Active Heading Style
In `TableOfContents.module.css`:
```css
.link.active {
  color: #B88E2F;
  font-weight: 700;
  background-color: rgba(184, 142, 47, 0.1);
  border-left: 3px solid #B88E2F;
}
```

## 6. Testing the Implementation

### Test Social Sharing
1. Share a blog link on WhatsApp, Twitter, or Facebook
2. Verify the preview shows:
   - Blog featured image
   - Blog title
   - Blog excerpt

### Test Desktop Layout
1. Open blog on desktop (1536px+ width)
2. Verify three columns appear:
   - Left sidebar with table of contents
   - Main content in center
   - Right sidebar with share buttons
3. Click headings in TOC - page should scroll smoothly

### Test Mobile Layout
1. Open blog on mobile or tablet
2. Verify layout is single column
3. Sidebars should be hidden
4. All content should be accessible

## 7. Performance Considerations

- **Table of Contents**: Lightweight, generated client-side from DOM
- **Meta Tags**: Generated once per page render, cached by Next.js
- **Intersection Observer**: Efficient heading tracking without performance impact
- **Sticky Sidebars**: Uses CSS sticky positioning (efficient)

## 8. Browser Compatibility

- Desktop layout: All modern browsers (Chrome, Firefox, Safari, Edge)
- Social sharing: Works with any platform using Open Graph meta tags
- Table of Contents: All modern browsers with ES6 support

## 9. Troubleshooting

### Meta tags not showing on social platforms
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- The domain must be publicly accessible
- Some platforms cache previews - use their preview tools to refresh

### Sidebars not appearing on desktop
- Check viewport width is 1536px or larger
- Verify browser DevTools shows correct viewport size
- Clear browser cache and rebuild Next.js

### Table of contents not showing headings
- Ensure blog content has H1-H6 headings
- Check that rich text editor is generating proper heading HTML
- Open browser console to verify no JavaScript errors

## 10. Future Enhancements

Consider adding:
- Reading time estimate in left sidebar
- Author bio in right sidebar
- Related posts section
- Save/bookmark functionality
- Share statistics tracking
