import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { ArrowRight, Globe } from 'lucide-react';
import type { Category } from '../types';

export const HeroClaim: React.FC = () => {
  const { 
    openSubmitModal, 
    activeCategory, 
    setActiveCategory 
  } = useProduct();

  const [campaignInput, setCampaignInput] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openSubmitModal({
      id: '',
      name: '',
      tagline: '',
      description: '',
      url: campaignInput,
      displayUrl: campaignInput,
      logo: '',
      mediaType: 'url',
      creator: { name: '', handle: '', avatar: '' },
      submittedAt: ''
    });
  };

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'slideshow', label: 'Slideshow' },
    { key: 'meta-ads', label: 'Meta Ads' },
    { key: 'tiktok', label: 'TikTok' },
    { key: 'twitter-x', label: 'Tweet / X' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'landing-pages', label: 'Landing Pages' },
    { key: 'email', label: 'Email' },
    { key: 'copywriting', label: 'Copywriting' }
  ];

  return (
    <section style={{
      padding: '2.5rem 0 1.25rem',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="app-container" style={{ maxWidth: '1240px' }}>
        {/* Directory Overline Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.95rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(201, 142, 214, 0.12)',
          border: '1px solid rgba(201, 142, 214, 0.3)',
          color: 'var(--accent-primary)',
          fontSize: '0.8rem',
          fontWeight: 800,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          <span>🚀 The #1 Marketing & SaaS Directory</span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3.2vw, 2.35rem)',
          fontWeight: 900,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          maxWidth: '920px',
          margin: '0 auto 0.85rem'
        }}>
          The Live Internet Directory Where The Best Marketing & SaaS Tools Rank #1.
        </h1>

        {/* Subheadline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          marginBottom: '1.5rem',
          maxWidth: '720px',
          margin: '0 auto 1.5rem'
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            textAlign: 'center',
            margin: 0
          }}>
            Submit your SaaS, landing page, or marketing campaign for free. Get a permanent <strong>Dofollow backlink</strong>, index on Google, and battle for the daily community crown.
          </p>
        </div>

        {/* Clean Input Bar Form */}
        <form
          onSubmit={handleQuickSubmit}
          className="quick-submit-form"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, width: '100%' }}>
            <Globe size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />

            {/* Text/URL Input */}
            <div style={{ flex: '1', minWidth: '160px' }}>
              <input
                type="text"
                placeholder="Enter your website or campaign URL (e.g. getseoo.com)"
                value={campaignInput}
                onChange={(e) => setCampaignInput(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.9rem',
              flexShrink: 0
            }}
          >
            <span>Submit to Directory — Free</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Free Dofollow Perk Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          marginTop: '0.85rem',
          fontWeight: 600,
          flexWrap: 'wrap'
        }}>
          <span>✨ 100% Free forever</span>
          <span>•</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Direct Dofollow Backlink Included</span>
          <span>•</span>
          <span>Live Community Push Ups</span>
        </div>

        {/* Category Pills Filter */}
        <div 
          className="category-scroll-bar"
          style={{
            maxWidth: '960px',
            margin: '1rem auto 0'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 8px rgba(201, 142, 214, 0.2)' : 'none',
                  flexShrink: 0
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
