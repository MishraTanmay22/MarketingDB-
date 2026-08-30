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
    <div style={{
      background: 'linear-gradient(90deg, rgba(201, 142, 214, 0.22) 0%, rgba(99, 102, 241, 0.22) 50%, rgba(16, 185, 129, 0.22) 100%)',
      borderBottom: '1px solid rgba(201, 142, 214, 0.35)',
      padding: '0.6rem 1rem',
      position: 'relative',
      zIndex: 40
    }}>
      <div className="app-container" style={{
        maxWidth: '1140px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Left Side: Flame Pill & Message */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            <Flame size={13} color="#f87171" />
            <span>Launch Special</span>
          </span>

          <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            🎉 <strong>First 5 sites submitted</strong> will be permanently featured in our official marketing examples &amp; swipe file!
          </span>
        </div>

        {/* Right Side: CTA Button & Dismiss */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleBannerClick}
            className="btn btn-primary"
            style={{
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.825rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={13} />
            <span>Submit to Claim Spot #1-5</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close Launch Banner"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
