import React from 'react';
import { useProduct } from '../context/ProductContext';
import { ArrowUp, Crown, PlusCircle, ExternalLink, Eye, Play, CheckCircle, Share2 } from 'lucide-react';

const normalizeUrl = (u: string) => {
  if (!u) return '';
  const trimmed = u.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const LeaderboardList: React.FC = () => {
  const { 
    sortedProducts, 
    openSubmitModal, 
    openProductPreview,
    upvoteProduct, 
    hasVotedToday,
    recordClick
  } = useProduct();

  if (sortedProducts.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        margin: '1rem 0 3rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 800,
          marginBottom: '0.4rem',
          color: 'var(--text-primary)'
        }}>
          The leaderboard is empty.
        </h3>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          maxWidth: '460px',
          margin: '0 auto 1.25rem',
          lineHeight: 1.5
        }}>
          Upload the first marketing campaign and own the crown.
        </p>

        <button
          onClick={() => openSubmitModal(null)}
          className="btn btn-primary"
          style={{
            padding: '0.65rem 1.6rem',
            fontSize: '0.925rem',
            fontWeight: 800,
            borderRadius: 'var(--radius-full)'
          }}
        >
          <PlusCircle size={16} />
          <span>Claim the first crown — Free</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      margin: '1rem 0 3rem'
    }}>
      {sortedProducts.map((product, index) => {
        const rank = index + 1;
        const isRank1 = rank === 1;

        const handleAssetClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          recordClick(product.id);
          const target = normalizeUrl(product.assetLink || product.url);
          if (target) window.open(target, '_blank', 'noopener,noreferrer');
        };

        const isVideoAsset = product.mediaType === 'video' || product.category === 'tiktok' || product.category === 'youtube';
        const isVoted = hasVotedToday(product.id);

        return (
          <div
            key={product.id}
            className="glass-panel leaderboard-list-card"
            style={{
              background: isRank1 ? 'var(--gradient-card-glow)' : 'var(--bg-card)',
              border: isRank1 ? '1px solid rgba(201, 142, 214, 0.45)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
          >
            {/* Left side: Rank Badge + Brand Favicon + Marketing Tactic Details */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.15rem',
              flex: '1',
              width: '100%'
            }}>
              {/* Rank Badge Indicator */}
              <div style={{
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: isRank1 ? 'var(--gradient-fire)' : 'var(--bg-input)',
                color: isRank1 ? '#fff' : 'var(--text-secondary)',
                border: isRank1 ? 'none' : '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.85rem',
                flexShrink: 0,
                marginTop: '0.2rem'
              }}>
                {isRank1 && <Crown size={13} color="#fff" />}
                <span>#{rank}</span>
              </div>

              {/* Brand Favicon / Logo (Direct Dofollow Link) */}
              <a
                href={normalizeUrl(product.url)}
                target="_blank"
                rel="noopener"
                onClick={() => recordClick(product.id)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                  position: 'relative',
                  textDecoration: 'none'
                }}
                title={`Visit ${product.displayUrl} (Direct Link)`}
              >
                <img
                  src={product.logo}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </a>

              {/* Marketing Tactic Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                {/* Brand name & website source (Direct Dofollow Links) */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <a
                    href={normalizeUrl(product.url)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => recordClick(product.id)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    {product.name}
                  </a>

                  <span style={{ color: 'var(--text-muted)' }}>•</span>

                  <a
                    href={normalizeUrl(product.url)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => recordClick(product.id)}
                    style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {product.displayUrl}
                  </a>

                  {product.creator?.handle && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-primary)',
                      background: 'rgba(201, 142, 214, 0.12)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600
                    }}>
                      {product.creator.handle}
                    </span>
                  )}
                </div>

                {/* Tactic Hook Headline - clicks to open asset directly */}
                <div 
                  onClick={handleAssetClick}
                  style={{
                    fontSize: '0.975rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    lineHeight: 1.35,
                    cursor: 'pointer'
                  }}
                  title="Click to view marketing visual asset"
                >
                  {product.tagline}
                </div>

                {/* Marketing Case Study / Tactic Description */}
                {product.description && (
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.45,
                    maxWidth: '680px'
                  }}>
                    {product.description}
                  </p>
                )}

                {/* Bottom Category Tags */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.35rem'
                }}>
                  {(product.categories && product.categories.length > 0 ? product.categories : [product.category]).map(cat => (
                    <span 
                      key={cat}
                      style={{
                        padding: '0.15rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: BIG "View Visual" Button + Push Up Button */}
            <div className="card-actions" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap'
            }}>
              {/* BIG View Visual Button with direct link */}
              <button
                onClick={handleAssetClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(99, 102, 241, 0.14)',
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  color: 'var(--accent-primary)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(99, 102, 241, 0.15)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.14)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title={`Open marketing visual asset: ${product.assetLink || product.url}`}
              >
                {isVideoAsset ? <Play size={14} fill="currentColor" /> : <Eye size={14} />}
                <span>View Visual</span>
                <ExternalLink size={13} />
              </button>

              {/* Details & Permalink Modal Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProductPreview(product);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(201, 142, 214, 0.12)',
                  border: '1px solid rgba(201, 142, 214, 0.3)',
                  color: 'var(--accent-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201, 142, 214, 0.22)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(201, 142, 214, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(201, 142, 214, 0.3)';
                }}
                title="View Campaign Details & Permalink"
              >
                <span>Details</span>
              </button>

              {/* Share on X Viral Link Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const shareText = `Check out "${product.name}" on marketingdb.lol — ranked #${rank} on the live directory leaderboard! 🚀\n\nDirect link 👇`;
                  const url = `https://marketingdb.lol/?category=${product.category || 'all'}`;
                  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
                title="Share on X (Twitter)"
              >
                <Share2 size={13} />
                <span>Share</span>
              </button>

              {/* Push Up Action Button (24h rate limited per IP) */}
              {isVoted ? (
                <button
                  disabled
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.65rem 1.2rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: 'var(--accent-green)',
                    cursor: 'default',
                    opacity: 0.95
                  }}
                  title="You've pushed up this campaign today! You can push again after 24 hours."
                >
                  <CheckCircle size={15} />
                  <span>Pushed Today</span>
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.25)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.775rem'
                  }}>
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
                    gap: '0.45rem',
                    padding: '0.65rem 1.2rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap'
                  }}
                  title="Push this marketing tactic up the leaderboard"
                >
                  <ArrowUp size={15} />
                  <span>Push Up</span>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.775rem'
                  }}>
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
