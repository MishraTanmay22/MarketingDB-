import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { Crown, Radio, ArrowUp, ExternalLink } from 'lucide-react';

const normalizeUrl = (u: string) => {
  if (!u) return '';
  const trimmed = u.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const LiveStatsBar: React.FC = () => {
  const { totalProductsCount, totalVotesCount, activities, products, recordClick } = useProduct();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through activities one at a time every 4 seconds
  useEffect(() => {
    if (activities.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activities.length]);

  // Keep index within bounds if activities change
  const currentAct = activities[currentIndex % Math.max(1, activities.length)];

  // Find matching product for direct visual opening
  const matchedProduct = currentAct ? products.find(p => 
    (currentAct.productName && p.name.toLowerCase() === currentAct.productName.toLowerCase()) ||
    (currentAct.message && currentAct.message.toLowerCase().includes(p.name.toLowerCase()))
  ) : null;

  const handleActivityClick = () => {
    if (matchedProduct) {
      recordClick(matchedProduct.id);
      const target = normalizeUrl(matchedProduct.assetLink || matchedProduct.url);
      if (target) window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  // If no campaigns or activities exist, hide the bar completely
  if (totalProductsCount === 0 && activities.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: 'var(--bg-nav)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0.45rem 0',
      transition: 'background-color 0.25s ease'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Real Stats */}
        {totalProductsCount > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Crown size={13} color="var(--accent-primary)" />
              <strong style={{ color: 'var(--text-primary)' }}>{totalProductsCount}</strong> active campaigns
            </div>

            {totalVotesCount > 0 && (
              <>
                <span style={{ color: 'var(--border-subtle)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ArrowUp size={13} color="var(--accent-primary)" />
                  <strong style={{ color: 'var(--text-primary)' }}>{totalVotesCount}</strong> ranking push ups
                </div>
              </>
            )}
          </div>
        )}

        {/* Real-time Ticker: ONE activity at a time */}
        {currentAct && (
          <div 
            onClick={handleActivityClick}
            style={{
              flex: '1',
              maxWidth: '540px',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              padding: '0.25rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              overflow: 'hidden',
              cursor: matchedProduct ? 'pointer' : 'default',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              if (matchedProduct) {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={e => {
              if (matchedProduct) {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            title={matchedProduct ? `Click to view "${matchedProduct.name}" creative visual asset` : undefined}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--accent-primary)',
              fontSize: '0.725rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              flexShrink: 0
            }}>
              <Radio size={12} />
              <span>Activity</span>
            </div>

            <div 
              key={currentAct.id + '-' + currentIndex}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.775rem',
                color: 'var(--text-secondary)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                animation: 'fadeIn 0.3s ease',
                flex: 1
              }}
            >
              {currentAct.avatar && (
                <img 
                  src={currentAct.avatar} 
                  alt="" 
                  style={{ width: '16px', height: '16px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} 
                />
              )}
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentAct.message}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', flexShrink: 0 }}>
                ({currentAct.timeAgo})
              </span>
            </div>

            {matchedProduct && (
              <ExternalLink size={12} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
