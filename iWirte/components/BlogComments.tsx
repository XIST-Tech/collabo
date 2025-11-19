'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

type Comment = {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
  parent_id: string | null;
  replies?: Comment[];
};

export default function BlogComments({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthorName, setReplyAuthorName] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/comments?blogId=${blogId}`);
      if (response.ok) {
        const data = await response.json();
        // Organize comments into threads
        const organized = organizeComments(data);
        setComments(organized);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const organizeComments = (allComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // First pass: create map of all comments
    allComments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize into tree structure
    allComments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies!.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          blogId, 
          content: newComment,
          authorName: authorName.trim() || 'Anonymous'
        }),
      });

      if (response.ok) {
        setNewComment('');
        setAuthorName('');
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          blogId, 
          content: replyContent,
          authorName: replyAuthorName.trim() || 'Anonymous',
          parentId
        }),
      });

      if (response.ok) {
        setReplyContent('');
        setReplyAuthorName('');
        setReplyingTo(null);
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to post reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <div key={comment.id} className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-6'}`}>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#B88E2F' }}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold" style={{ color: '#B88E2F' }}>{comment.author_name}</div>
            <div className="text-sm text-gray-500">
              {format(new Date(comment.created_at), 'MMM dd, yyyy · h:mm a')}
            </div>
          </div>
        </div>
        <p className="text-gray-700 mb-3">{comment.content}</p>

        <button
          onClick={() => setReplyingTo(comment.id)}
          className="text-sm font-medium transition-all"
          style={{ color: '#B88E2F' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Reply
        </button>

        {replyingTo === comment.id && (
          <div className="mt-4 p-4 bg-white rounded-lg border" style={{ borderColor: '#B88E2F' }}>
            <input
              type="text"
              value={replyAuthorName}
              onChange={(e) => setReplyAuthorName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none mb-2"
              style={{ '--tw-ring-color': '#B88E2F' } as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleReply(comment.id)}
                disabled={loading}
                className="text-white px-6 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
                style={{ backgroundColor: '#B88E2F' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {loading ? 'Posting...' : 'Post Reply'}
              </button>
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent('');
                  setReplyAuthorName('');
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map(reply => renderComment(reply, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: '#B88E2F' }}>Comments</h2>

      <form onSubmit={handleSubmit} className="mb-12">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name (optional - leave blank for Anonymous)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none mb-3"
          onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
          onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 text-white px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          style={{ backgroundColor: '#B88E2F' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}
