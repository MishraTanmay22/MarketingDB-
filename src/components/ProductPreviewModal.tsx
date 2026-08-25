import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { 
  X, 
  ExternalLink, 
  ArrowUp, 
  Share2, 
  Copy, 
  Check, 
  Code, 
  Play, 
  Eye, 
  CheckCircle,
  Trophy
} from 'lucide-react';
import { EmbedBadgeModal } from './EmbedBadgeModal';

export const ProductPreviewModal: React.FC = () => {
  const { 
    activePreviewProduct, 
    closeProductPreview, 
    upvoteProduct, 
    hasVotedToday, 
    recordClick,
    sortedProducts 
  } = useProduct();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  // Compute rank in live leaderboard
  const rank = activePreviewProduct 
    ? sortedProducts.findIndex(p => p.id === activePreviewProduct.id) + 1 
    : 1;

  const isVoted = activePreviewProduct ? hasVotedToday(activePreviewProduct.id) : false;
  const isVideoAsset = activePreviewProduct?.mediaType === 'video' || activePreviewProduct?.category === 'tiktok' || activePreviewProduct?.category === 'youtube';

  // Inject Schema.org SoftwareApplication / Product JSON-LD Schema
  useEffect(() => {
    if (!activePreviewProduct) return;

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': activePreviewProduct.name,
      'applicationCategory': activePreviewProduct.category || 'BusinessApplication',
      'operatingSystem': 'All',
      'url': activePreviewProduct.url,
      'description': activePreviewProduct.description || activePreviewProduct.tagline,
      'image': activePreviewProduct.logo,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'ratingCount': Math.max(1, activePreviewProduct.votes),
        'bestRating': '5',
        'worstRating': '1'
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    };

    let scriptTag = document.getElementById('product-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'product-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(productSchema);

    // Update document title for the permalink
    const prevTitle = document.title;
    document.title = `${activePreviewProduct.name} — Marketing Breakdown & Rankings | MarketingDB`;

    return () => {
      document.title = prevTitle;
      const existing = document.getElementById('product-schema-jsonld');
      if (existing) existing.remove();
    };
  }, [activePreviewProduct]);

  if (!activePreviewProduct) return null;

  const permalinkUrl = `https://marketingdb.lol/?item=${encodeURIComponent(activePreviewProduct.id)}`;

  const handleCopyPermalink = () => {
    navigator.clipboard.writeText(permalinkUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareOnX = () => {
    const shareText = `Check out "${activePreviewProduct.name}" on marketingdb.lol — ranked #${rank} on the live directory leaderboard! 🚀\n\nDirect link 👇`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(permalinkUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const handleAssetClick = () => {
    recordClick(activePreviewProduct.id);
    const target = activePreviewProduct.assetLink || activePreviewProduct.url;
    window.open(target.startsWith('http') ? target : `https://${target}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="modal-overlay" onClick={closeProductPreview}>
        <div 
          className="glass-panel" 
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '640px',
            padding: '2.25rem',
            borderRadius: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            animation: 'scaleUp 0.2s ease-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeProductPreview}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
          >
            <X size={16} />
          </button>

          {/* Header Profile */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'var(--bg-input)',
              border: '1.5px solid var(--border-subtle)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={activePreviewProduct.logo} 
                alt={activePreviewProduct.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.2rem 0.65rem',
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15))',
                  border: '1px solid rgba(255,215,0,0.4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.775rem',
                  fontWeight: 800,
                  color: '#ffd700'
                }}>
                  <Trophy size={13} />
                  <span>Rank #{rank}</span>
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  {activePreviewProduct.name}
                </h3>

                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.15rem 0.55rem',
                  background: 'rgba(201, 142, 214, 0.15)',
                  border: '1px solid rgba(201, 142, 214, 0.3)',
                  color: 'var(--accent-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}>
                  {activePreviewProduct.category}
                </span>
              </div>

              {/* Direct Dofollow Website Link */}
              <a
                href={activePreviewProduct.url.startsWith('http') ? activePreviewProduct.url : `https://${activePreviewProduct.url}`}
                target="_blank"
                rel="noopener"
                onClick={() => recordClick(activePreviewProduct.id)}
                style={{
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  textDecoration: 'none'
                }}
              >
                <span>{activePreviewProduct.displayUrl}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Tactic Hook Headline */}
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(201, 142, 214, 0.08)',
            border: '1px solid rgba(201, 142, 214, 0.25)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
              Marketing Headline / Hook
            </div>
            <div style={{ fontSize: '1.025rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {activePreviewProduct.tagline}
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            background: 'var(--bg-input)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                Push Ups
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
                {activePreviewProduct.votes}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                Direct Views
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {activePreviewProduct.clicks}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                SEO Backlink
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                ✓ Dofollow
              </span>
            </div>
          </div>

          {/* Description */}
          {activePreviewProduct.description && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                About This Campaign & Tactic
              </h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {activePreviewProduct.description}
              </p>
            </div>
          )}

          {/* Direct Permalink Box */}
          <div style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {permalinkUrl}
            </div>

            <button
              onClick={handleCopyPermalink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: copiedLink ? 'rgba(16, 185, 129, 0.2)' : 'rgba(201, 142, 214, 0.15)',
                border: copiedLink ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(201, 142, 214, 0.35)',
                color: copiedLink ? 'var(--accent-green)' : 'var(--accent-primary)',
                fontSize: '0.775rem',
                fontWeight: 800,
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {copiedLink ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              {/* Push Up Button */}
              {isVoted ? (
                <button
                  disabled
                  style={{
                    flex: 1.2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.9rem', cursor: 'default'
                  }}
                >
                  <CheckCircle size={16} />
                  <span>Pushed Up Today ({activePreviewProduct.votes})</span>
                </button>
              ) : (
                <button
                  onClick={() => upvoteProduct(activePreviewProduct.id)}
                  className="btn btn-primary"
                  style={{ flex: 1.2, padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 800 }}
                >
                  <ArrowUp size={16} />
                  <span>Push Up Rank (+1)</span>
                </button>
              )}

              {/* View Visual Asset Button */}
              <button
                onClick={handleAssetClick}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 700
                }}
              >
                {isVideoAsset ? <Play size={15} /> : <Eye size={15} />}
                <span>View Asset</span>
                <ExternalLink size={14} />
              </button>
            </div>

            {/* Social Sharing & Embed Badge Row */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={handleShareOnX}
                style={{
                  flex: 1,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
                }}
              >
                <Share2 size={14} />
                <span>Share on X</span>
              </button>

              <button
                onClick={() => setIsBadgeModalOpen(true)}
                style={{
                  flex: 1,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                  background: 'rgba(201, 142, 214, 0.12)', border: '1px solid rgba(201, 142, 214, 0.3)',
                  color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer'
                }}
              >
                <Code size={14} />
                <span>Get Embed Badge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embed Badge Modal */}
      <EmbedBadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        productName={activePreviewProduct.name}
        rank={rank}
      />
    </>
  );
};
