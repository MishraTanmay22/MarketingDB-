import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { Sparkles, ArrowRight, X, Flame } from 'lucide-react';

export const FeaturedLaunchBanner: React.FC = () => {
  const { openSubmitModal } = useProduct();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleBannerClick = () => {
    openSubmitModal({
      id: '',
      name: '',
      tagline: '',
      description: '',
      url: '',
      displayUrl: '',
      logo: '',
      mediaType: 'url',
      creator: { name: '', handle: '', avatar: '' },
      submittedAt: ''
    });
  };

  return (
    <aside
      aria-label="Launch Promo Banner"
      style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.45rem 1rem',
        fontSize: '0.825rem',
        position: 'relative',
        zIndex: 40,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        className="app-container"
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          textAlign: 'center',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: '0.725rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              flexShrink: 0
            }}
          >
            <Flame size={12} color="#ef4444" />
            <span>Launch Offer</span>
          </span>

          <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
            🎉 <strong>First 5 sites submitted</strong> get permanently featured in our official marketing examples list!
          </span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={handleBannerClick}
            style={{
              background: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              padding: '0.28rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.775rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(201, 142, 214, 0.25)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Sparkles size={12} />
            <span>Claim Spot #1–5</span>
            <ArrowRight size={12} />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.2rem'
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
