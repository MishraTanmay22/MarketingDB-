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
        {/* Main Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
          fontWeight: 800,
          lineHeight: 1.35,
          letterSpacing: '-0.015em',
          color: 'var(--text-primary)',
          maxWidth: '860px',
          margin: '0 auto 0.75rem'
        }}>
          Because the campaigns that change minds deserve a home that lasts longer than a bookmark.
        </h1>

        {/* Subheadline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          marginBottom: '1.5rem',
          maxWidth: '680px',
          margin: '0 auto 1.5rem'
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            textAlign: 'center',
            margin: 0
          }}>
            Upload your best marketing work — X tweets, images, videos, ads, landing pages, website links — and rank on a live community leaderboard.
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
                placeholder="Paste a campaign URL or website"
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
            <span>Submit for Free</span>
            <ArrowRight size={15} />
          </button>
        </form>

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
