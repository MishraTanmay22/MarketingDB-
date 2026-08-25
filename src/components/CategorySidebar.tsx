import React from 'react';
import { useProduct } from '../context/ProductContext';
import type { Category } from '../types';
import { Layers } from 'lucide-react';

export const CategorySidebar: React.FC = () => {
  const { activeCategory, setActiveCategory, products } = useProduct();

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: 'all', label: 'All Work', icon: '🚀' },
    { key: 'meta-ads', label: 'Meta Ads', icon: '📢' },
    { key: 'landing-pages', label: 'Landing Pages', icon: '🌐' },
    { key: 'ecom', label: 'Ecom Pages', icon: '🛍️' },
    { key: 'dropshipping', label: 'Dropshipping', icon: '📦' },
    { key: 'twitter-x', label: 'X Pages', icon: '𝕏' },
    { key: 'fb-pages', label: 'FB Pages', icon: '📘' },
    { key: 'slideshow', label: 'Slideshow', icon: '🖼️' },
    { key: 'tiktok', label: 'TikTok UGC', icon: '📱' },
    { key: 'youtube', label: 'YouTube', icon: '▶️' },
    { key: 'email', label: 'Email', icon: '💌' },
    { key: 'copywriting', label: 'Copywriting', icon: '✍️' }
  ];

  const handleCategorySelect = (key: Category) => {
    setActiveCategory(key);
    if (typeof window !== 'undefined') {
      const newUrl = key === 'all' ? '/' : `/?category=${key}`;
      try { window.history.replaceState(null, '', newUrl); } catch {}
    }
  };

  // Helper to count items in each category
  const getItemCount = (key: Category) => {
    if (key === 'all') return products.length;
    return products.filter(p => p.category === key || p.categories?.includes(key)).length;
  };

  return (
    <aside style={{
      width: '100%',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Sidebar Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        marginBottom: '0.85rem',
        paddingBottom: '0.65rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <Layers size={15} color="var(--accent-primary)" />
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          Categories
        </span>
      </div>

      {/* Category List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count = getItemCount(cat.key);

          return (
            <button
              key={cat.key}
              onClick={() => handleCategorySelect(cat.key)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                background: isActive ? 'rgba(201, 142, 214, 0.18)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-input)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '0.95rem' }}>{cat.icon}</span>
                <span>{cat.label}</span>
              </div>

              {count > 0 && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(201, 142, 214, 0.3)' : 'var(--bg-input)',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: 700
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
