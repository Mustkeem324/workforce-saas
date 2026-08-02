import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Search, Edit2, Trash2, Globe, Eye, Sparkles, Check, X, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  category: 'Engineering' | 'Workforce Management' | 'Payroll & Compliance';
  summary: string;
  content: string;
  status: 'Published' | 'Draft';
  author: string;
  publishedAt: string;
}

const INITIAL_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    title: 'Building an AI-Native Workforce SaaS: 17-Phase Architecture',
    slug: 'ai-native-workforce-saas-architecture',
    category: 'Workforce Management',
    summary: 'A deep dive into designing a zero-lag attendance and payroll platform for multi-location enterprises.',
    content: 'Full retrospective blueprint detailing design-first constraints, guarded payroll flows, and offline-first IndexedDB sync.',
    status: 'Published',
    author: 'Alex Rivera (VP Engineering)',
    publishedAt: '2026-08-02'
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
    publishedAt: '2026-07-28'
  },
  {
    id: 'post-3',
    title: 'Statutory Payroll Compliance Guide 2026',
    slug: 'statutory-payroll-compliance-guide-2026',
    category: 'Payroll & Compliance',
    summary: 'Navigating Form 941, state tax withholdings, and zero-lapse statutory filing automation.',
    content: 'Comprehensive compliance guide for HR officers managing multi-state labor laws.',
    status: 'Draft',
    author: 'Compliance Editorial Team',
    publishedAt: '2026-08-10'
  }
];

export const BlogCmsAdminManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Create New Article
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Engineering' | 'Workforce Management' | 'Payroll & Compliance'>('Workforce Management');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [author, setAuthor] = useState('Alex Rivera');

  const filteredPosts = posts.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreatePost = () => {
    if (!title.trim()) return;

    const newPost: BlogPostItem = {
      id: `post-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      summary: summary || 'Article summary description.',
      content: content || 'Full article content body...',
      status,
      author: author || 'Editorial Team',
      publishedAt: new Date().toISOString().split('T')[0]
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setTitle('');
    setSummary('');
    setContent('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Blog & Editorial CMS Admin Console</h2>
            <Badge variant="accent">ADVANCED CMS PLATFORM</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Manage thought leadership articles, SEO metadata, editorial categories, and published statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-52"
          />

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create New Post
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {['All', 'Workforce Management', 'Engineering', 'Payroll & Compliance'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-3.5 py-1.5 rounded-xl font-semibold border transition-all
              ${selectedCategory === cat 
                ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-xs' 
                : 'bg-[var(--bg-surface-raised)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Table */}
      <Card elevation={2} className="overflow-hidden p-0">
        <table className="w-full text-left text-xs border-collapse font-mono tabular-nums">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] uppercase tracking-wider font-semibold text-[var(--text-secondary)] font-sans">
              <th className="py-4 px-4">Article Title & Slug</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Author</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4 text-center">Status</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {filteredPosts.map(post => {
              const isPublished = post.status === 'Published';
              return (
                <tr key={post.id} className="hover:bg-[var(--bg-element-hover)]/40 transition-colors">
                  <td className="py-4 px-4 font-sans">
                    <div className="font-bold text-[var(--text-primary)] text-sm">{post.title}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)] font-mono">/{post.slug}</div>
                  </td>
                  <td className="py-4 px-4 font-sans">
                    <Badge variant="neutral">{post.category}</Badge>
                  </td>
                  <td className="py-4 px-4 font-sans text-[var(--text-secondary)]">{post.author}</td>
                  <td className="py-4 px-4 text-[var(--text-tertiary)]">{post.publishedAt}</td>
                  <td className="py-4 px-4 text-center font-sans">
                    <Badge variant={isPublished ? 'success' : 'warning'}>{post.status}</Badge>
                  </td>
                  <td className="py-4 px-4 text-center font-sans">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-[var(--text-tertiary)] hover:text-[var(--accent-500)] p-1">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                        className="text-[var(--text-tertiary)] hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Create New Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl p-6 max-w-xl w-full shadow-[var(--shadow-4)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">Create New Blog Article</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <Input
                  label="Article Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Building an AI-Native Workforce SaaS"
                />

                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full text-xs bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded-xl p-2.5 text-[var(--text-primary)]"
                  >
                    <option value="Workforce Management">Workforce Management</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Payroll & Compliance">Payroll & Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Summary Description</label>
                  <textarea
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    rows={2}
                    placeholder="Short summary excerpt for blog cards..."
                    className="w-full text-xs bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-accent)]"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Publication Status</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value as any)}
                      className="w-full text-xs bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded-xl p-2.5 text-[var(--text-primary)]"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <Input
                    label="Author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="accent" size="sm" onClick={handleCreatePost} leftIcon={<Check className="w-4 h-4" />}>
                  Publish Article
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
