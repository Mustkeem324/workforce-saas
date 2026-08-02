import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Filter, Eye, Edit3, Trash2, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  status: 'Published' | 'Draft';
  author: string;
  published_at: string;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Building an AI-Native Workforce SaaS: Synkron AI Architecture',
    slug: 'synkron-ai-native-workforce-saas-architecture',
    category: 'Workforce Management',
    summary: 'A deep dive into designing a zero-lag attendance and payroll platform for multi-location enterprises in India.',
    content: 'Full retrospective blueprint detailing design-first constraints, guarded payroll flows, and offline-first IndexedDB sync.',
    status: 'Published',
    author: 'Alex Rivera (VP Engineering)',
    published_at: '2026-08-02'
  },
  {
    id: 'post-2',
    title: 'Why We Enforced Tabular Numerics for Payroll UI',
    slug: 'tabular-numerics-payroll-design',
    category: 'Engineering',
    summary: 'Preventing number jiggling in high-stakes financial tables using JetBrains Mono and font-variant-numeric.',
    content: 'Detailed font discipline guidelines for monetary values, hourly rates, and payroll ledgers.',
    status: 'Published',
    author: 'Sarah Chen (Lead Product Designer)',
    published_at: '2026-07-28'
  }
];

export const BlogCmsAdminManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Workforce Management');
  const [summaryInput, setSummaryInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  // Fetch posts from backend API if available
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/blog/posts')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data.length > 0) {
          setPosts(data.data);
        }
      })
      .catch(() => {
        // Fallback to initial mock posts
      });
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: titleInput,
      slug: titleInput.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: categoryInput,
      summary: summaryInput,
      content: contentInput,
      status: 'Published',
      author: 'Synkron Editorial Team',
      published_at: new Date().toISOString().split('T')[0]
    };

    // Save to SQLite via backend API
    fetch('http://localhost:5000/api/v1/blog/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    }).catch(() => {});

    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
    setTitleInput('');
    setSummaryInput('');
    setContentInput('');
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Editorial CMS & Blog Admin</h2>
            <Badge variant="accent">SQLITE BACKED</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Create, publish, and manage engineering retrospective blog posts and SEO articles.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create New Article
        </Button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-[var(--bg-surface-raised)] border border-[var(--border-default)] px-3 py-1.5 rounded-xl text-xs">
          <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search article title or summary..."
            className="w-full bg-transparent text-[var(--text-primary)] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          {['All', 'Workforce Management', 'Engineering', 'Product Design'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${selectedCategory === cat ? 'bg-[var(--accent-500)] text-white' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map(post => (
          <Card key={post.id} elevation={1} className="p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <Badge variant="neutral">{post.category}</Badge>
                <Badge variant="success" dot>{post.status}</Badge>
              </div>

              <h3 className="text-base font-extrabold text-[var(--text-primary)]">{post.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{post.summary}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
              <span>By {post.author}</span>
              <span>{post.published_at}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Article Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Publish New Article</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-[var(--text-tertiary)]">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={titleInput}
                  onChange={e => setTitleInput(e.target.value)}
                  placeholder="e.g. Designing Tabular Numerics for Payroll UI"
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-default)] p-2.5 rounded-xl text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-bold mb-1">Category</label>
                <select
                  value={categoryInput}
                  onChange={e => setCategoryInput(e.target.value)}
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-default)] p-2.5 rounded-xl text-[var(--text-primary)]"
                >
                  <option>Workforce Management</option>
                  <option>Engineering</option>
                  <option>Product Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-bold mb-1">Article Summary</label>
                <textarea
                  required
                  rows={2}
                  value={summaryInput}
                  onChange={e => setSummaryInput(e.target.value)}
                  placeholder="Brief summary snippet..."
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-default)] p-2.5 rounded-xl text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-bold mb-1">Article Content (Markdown Supported)</label>
                <textarea
                  required
                  rows={4}
                  value={contentInput}
                  onChange={e => setContentInput(e.target.value)}
                  placeholder="Full article content body..."
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-default)] p-2.5 rounded-xl text-[var(--text-primary)] font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="accent">Publish Article to SQLite</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
