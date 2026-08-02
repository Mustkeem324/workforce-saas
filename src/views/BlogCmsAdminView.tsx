import React from 'react';
import { BlogCmsAdminManager } from '../components/blog/BlogCmsAdminManager';
import { Badge } from '../components/ui/badge';

export const BlogCmsAdminView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent font-mono">ENTERPRISE CMS & BLOG</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">EDITORIAL CONTENT MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Blog CMS & Editorial Admin Console</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Full-stack editorial content management system with SEO metadata, category filtering, and publishing workflows.
          </p>
        </div>
      </div>

      <BlogCmsAdminManager />
    </div>
  );
};
