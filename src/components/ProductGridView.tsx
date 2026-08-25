import React from 'react';
import { useProduct } from '../context/ProductContext';
import { ArrowUp, Crown, ExternalLink, PlusCircle, Play, Eye, CheckCircle } from 'lucide-react';

const normalizeUrl = (u: string) => {
  if (!u) return '';
  const trimmed = u.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const ProductGridView: React.FC = () => {
  const { sortedProducts, openSubmitModal, upvoteProduct, hasVotedToday, recordClick } = useProduct();

  if (sortedProducts.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        margin: '1.5rem 0 3rem'
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          The leaderboard is empty.
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 1.25rem' }}>
          Upload the first marketing campaign and own the crown.
        </p>
        <button
          onClick={() => openSubmitModal(null)}
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.6rem', fontSize: '0.925rem', fontWeight: 800, borderRadius: 'var(--radius-full)' }}
        >
          <PlusCircle size={16} />
          <span>Claim the first crown — Free</span>
        </button>
      </div>
    );
  }

  return (
    <div className="video-grid" style={{ margin: '1.5rem 0 4rem' }}>
      {sortedProducts.map((product, index) => {
        const rank = index + 1;
        const isRank1 = rank === 1;
        const isVideoAsset = product.mediaType === 'video' || product.category === 'tiktok' || product.category === 'youtube';
        const isVoted = hasVotedToday(product.id);

        const handleAssetClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          recordClick(product.id);
          const target = normalizeUrl(product.assetLink || product.url);
          if (target) window.open(target, '_blank', 'noopener,noreferrer');
        };

        return (
          <div
            key={product.id}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              position: 'relative',
              border: isRank1 ? '1px solid rgba(201, 142, 214, 0.45)' : '1px solid var(--border-subtle)',
              background: isRank1 ? 'var(--gradient-card-glow)' : 'var(--bg-card)'
            }}
          >
            <div>
              {/* Header: Rank + Category */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isRank1 ? 'var(--gradient-fire)' : 'var(--bg-input)',
                  color: isRank1 ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  {isRank1 ? <Crown size={12} color="#fff" /> : null}
                  <span>#{rank}</span>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {product.category}
                </span>
              </div>

              {/* Logo + Title (Direct Dofollow Link) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <a 
                  href={normalizeUrl(product.url)}
                  target="_blank"
                  rel="noopener"
                  onClick={() => recordClick(product.id)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: 'var(--bg-input)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none'
                  }}
                  title={`Visit ${product.displayUrl} (Direct Link)`}
                >
                  <img src={product.logo} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </a>
                <div>
                  <a 
                    href={normalizeUrl(product.url)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => recordClick(product.id)}
                    style={{ fontSize: '1rem', fontWeight: 800, cursor: 'pointer', color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}
                  >
                    {product.name}
                  </a>
                  <a 
                    href={normalizeUrl(product.url)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => recordClick(product.id)}
                    style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'block' }}
                  >
                    {product.displayUrl}
                  </a>
                </div>
              </div>

              {/* Tagline */}
              <p 
                onClick={handleAssetClick}
                style={{ fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.75rem', cursor: 'pointer' }}
              >
                {product.tagline}
              </p>
            </div>

            {/* Bottom Actions: Big View Visual Button + Push Up */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              <button
                onClick={handleAssetClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(201, 142, 214, 0.15)',
                  border: '1px solid rgba(201, 142, 214, 0.35)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.775rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {isVideoAsset ? <Play size={12} fill="currentColor" /> : <Eye size={12} />}
                <span>View Visual</span>
                <ExternalLink size={11} />
              </button>

              {isVoted ? (
                <button
                  disabled
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: 'var(--accent-green)',
                    cursor: 'default'
                  }}
                  title="You've pushed up this campaign today! You can push again after 24 hours."
                >
                  <CheckCircle size={12} />
                  <span>Pushed</span>
                  <span style={{ background: 'rgba(16, 185, 129, 0.25)', padding: '0.05rem 0.35rem', borderRadius: 'var(--radius-full)', fontSize: '0.725rem' }}>
                    {product.votes}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => upvoteProduct(product.id)}
                  className="btn-outbid"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 800
                  }}
                >
                  <ArrowUp size={13} />
                  <span>Push Up</span>
                  <span style={{ background: 'rgba(255, 255, 255, 0.25)', padding: '0.05rem 0.35rem', borderRadius: 'var(--radius-full)', fontSize: '0.725rem' }}>
                    {product.votes}
                  </span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
