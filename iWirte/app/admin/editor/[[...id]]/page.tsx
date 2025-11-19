'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import EmojiPicker from 'emoji-picker-react';
import ImageEditorModal from '@/components/ImageEditorModal';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditorPage({ params }: { params: { id?: string[] } }) {
  const router = useRouter();
  const blogId = params.id?.[0];
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });
  const [imageEditorOpen, setImageEditorOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const quillRef = useRef<any>(null);

  // Type assertion helper for ReactQuill ref to avoid TypeScript errors
  const getQuillEditor = () => {
    try {
      return (quillRef.current as any)?.getEditor?.();
    } catch {
      return null;
    }
  };
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const lastTapTime = useRef(0);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setFeaturedImage(data.featured_image || '');
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setFeaturedImage(url);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!blogId) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!title || !content || !excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const publishDate = publish ? new Date().toISOString() : null;

      const response = await fetch('/api/admin/blogs', {
        method: blogId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blogId,
          title,
          slug,
          excerpt,
          content,
          featured_image: featuredImage || null,
          published_at: publishDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Only notify subscribers if publishing for the first time
        if (publish && publishDate) {
          await fetch('/api/admin/notify-subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              blogTitle: title,
              blogSlug: slug,
            }),
          });
        }

        alert(publish ? 'Blog post published successfully!' : 'Draft saved successfully!');
        router.push('/admin');
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    const editor = getQuillEditor();
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        // Remove the '::' that triggered the emoji picker
        const text = editor.getText();
        if (selection.index >= 2 && text.substring(selection.index - 2, selection.index) === '::') {
          editor.deleteText(selection.index - 2, 2);
          editor.insertText(selection.index - 2, emojiObject.emoji);
        }
      }
    }
    setShowEmojiPicker(false);
  };

  // Setup editor with emoji detection and double-tap image handling
  useEffect(() => {
    const editor = getQuillEditor();
    if (!editor) return;

    // Detect '::' for emoji picker
    const handleTextChange = (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user') return;

      const text = editor.getText();
      const selection = editor.getSelection();

      if (selection && selection.index >= 2) {
        const lastChars = text.substring(selection.index - 2, selection.index);
        if (lastChars === '::') {
          const bounds = editor.getBounds(selection.index);
          setEmojiPickerPosition({
            top: bounds.bottom + 260,
            left: Math.max(0, bounds.left - 100),
          });
          setShowEmojiPicker(true);
        }
      }
    };

    editor.on('text-change', handleTextChange);

    // Setup double-tap for images
    const editorContainer = editor.root;
    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        setSelectedImage(target as HTMLImageElement);
        setImageEditorOpen(true);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const now = Date.now();
        if (now - lastTapTime.current < 300) {
          // Double tap detected
          setSelectedImage(target as HTMLImageElement);
          setImageEditorOpen(true);
        }
        lastTapTime.current = now;
      }
    };

    editorContainer.addEventListener('dblclick', handleDblClick);
    editorContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      editor.off('text-change', handleTextChange);
      editorContainer.removeEventListener('dblclick', handleDblClick);
      editorContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleImageApply = (mode: 'size' | 'crop', params: any) => {
    if (!selectedImage) return;

    if (mode === 'size') {
      if (params.width) {
        selectedImage.style.width = `${params.width}px`;
      }
      if (params.height) {
        selectedImage.style.height = `${params.height}px`;
      }
    } else if (mode === 'crop') {
      const { top, right, bottom, left } = params;

      if (top || right || bottom || left) {
        const img = selectedImage;
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        const cropTop = (top / 100) * originalHeight;
        const cropRight = (right / 100) * originalWidth;
        const cropBottom = (bottom / 100) * originalHeight;
        const cropLeft = (left / 100) * originalWidth;

        const newWidth = originalWidth - cropLeft - cropRight;
        const newHeight = originalHeight - cropTop - cropBottom;

        // Store crop data as data attributes
        img.dataset.cropTop = String(top);
        img.dataset.cropRight = String(right);
        img.dataset.cropBottom = String(bottom);
        img.dataset.cropLeft = String(left);

        // Apply crop using clip-path
        const clipPath = `polygon(
          ${(cropLeft / originalWidth) * 100}% ${(cropTop / originalHeight) * 100}%,
          ${100 - (cropRight / originalWidth) * 100}% ${(cropTop / originalHeight) * 100}%,
          ${100 - (cropRight / originalWidth) * 100}% ${100 - (cropBottom / originalHeight) * 100}%,
          ${(cropLeft / originalWidth) * 100}% ${100 - (cropBottom / originalHeight) * 100}%
        )`;

        img.style.clipPath = clipPath;
        img.style.width = `${newWidth * (originalWidth / (originalWidth - cropLeft - cropRight))}px`;
        img.style.height = 'auto';
      }
    }

    setImageEditorOpen(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#FAF3EA' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#B88E2F' }}>
            {blogId ? 'Edit Post' : 'Create New Post'}
          </h1>
          <button
            onClick={() => router.push('/admin')}
            className="hover:opacity-80 transition-all font-semibold"
            style={{ color: '#B88E2F' }}
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
              placeholder="Enter post title..."
              style={{ '--tw-ring-color': '#B88E2F' } as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Slug (URL)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
              placeholder="post-url-slug"
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
              placeholder="Brief description of the post..."
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Featured Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 px-4 py-3 rounded-lg border cursor-pointer transition-all" style={{ borderColor: '#B88E2F' }}>
                <span className="font-semibold" style={{ color: '#B88E2F' }}>
                  {uploadingImage ? 'Uploading...' : 'Choose Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              {featuredImage && (
                <div className="flex-1">
                  <img 
                    src={featuredImage} 
                    alt="Featured" 
                    className="max-h-32 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
            {featuredImage && (
              <p className="text-xs mt-2" style={{ color: '#B88E2F' }}>Image uploaded successfully</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Content
            </label>
            <div style={{ position: 'relative' }}>
              <div className="rich-text-editor border rounded-lg relative" style={{ borderColor: '#B88E2F' }}>
                <ReactQuill
                  ref={quillRef as any}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Write your blog post content here... (Type :: to insert emoji, double-tap images to resize/crop)"
                />
              </div>

              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  style={{
                    position: 'absolute',
                    top: `${emojiPickerPosition.top}px`,
                    left: `${emojiPickerPosition.left}px`,
                    zIndex: 1000,
                  }}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <p className="text-sm mt-2" style={{ color: '#B88E2F' }}>
              💡 Tips: Type <strong>::</strong> to insert emoji • Double-tap images to resize or crop
            </p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex-1 text-white px-8 py-4 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{ backgroundColor: '#888888' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex-1 text-white px-8 py-4 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{ backgroundColor: '#B88E2F' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      <ImageEditorModal
        isOpen={imageEditorOpen}
        imageSrc={selectedImage?.src || ''}
        imageElement={selectedImage}
        onClose={() => setImageEditorOpen(false)}
        onApply={handleImageApply}
      />
    </div>
  );
}
