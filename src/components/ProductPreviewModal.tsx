import React from 'react';
import { useProduct } from '../context/ProductContext';
import { X, ExternalLink, ArrowUp } from 'lucide-react';

export const ProductPreviewModal: React.FC = () => {
  const { activePreviewProduct, closeProductPreview, upvoteProduct, recordClick } = useProduct();

  if (!activePreviewProduct) return null;

  const handleOpenLink = () => {
    recordClick(activePreviewProduct.id);
    window.open(activePreviewProduct.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-overlay" onClick={closeProductPreview}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
      >
        <button
          onClick={closeProductPreview}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-input)',
            border: 'none',
            color: 'var(--text-primary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {/* Header Profile */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            flexShrink: 0
          }}>
            <img 
              src={activePreviewProduct.logo} 
              alt={activePreviewProduct.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
                {activePreviewProduct.name}
              </h3>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                background: 'rgba(201, 142, 214, 0.15)',
                color: 'var(--accent-primary)',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                textTransform: 'capitalize'
              }}>
                {activePreviewProduct.category}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              {activePreviewProduct.tagline}
            </p>

            <button
              onClick={handleOpenLink}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: 0
              }}
            >
              <span>{activePreviewProduct.displayUrl}</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          background: 'var(--bg-input)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Ranking Push Ups
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {activePreviewProduct.votes}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Total Views
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
              {activePreviewProduct.clicks}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Entry Model
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-green)' }}>
              100% Free
            </span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
            About This Campaign
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {activePreviewProduct.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => upvoteProduct(activePreviewProduct.id)}
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.75rem', fontSize: '0.95rem', fontWeight: 800 }}
          >
            <ArrowUp size={16} />
            <span>Push Up Rank (+1)</span>
          </button>

          <button
            onClick={handleOpenLink}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.95rem' }}
          >
            <ExternalLink size={16} />
            <span>Visit Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
