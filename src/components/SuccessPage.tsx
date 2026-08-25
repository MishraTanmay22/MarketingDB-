import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, ExternalLink, Trophy, ArrowLeft, Coffee, Share2, Sparkles, Star } from 'lucide-react';
import { useProduct } from '../context/ProductContext';

const CATEGORY_LABELS: Record<string, string> = {
  'all': 'All',
  'slideshow': '🖼️ Slideshow',
  'meta-ads': '📣 Meta Ads',
  'tiktok': '🎵 TikTok',
  'twitter-x': '🐦 Tweet / X',
  'youtube': '▶️ YouTube',
  'landing-pages': '🌐 Landing Pages',
  'email': '📧 Email',
  'copywriting': '✍️ Copywriting',
  'branding': '💎 Branding',
  'creative': '🎨 Creative',
  'organic': '🌱 Organic',
  'ugc': '📸 UGC',
};

export const SuccessPage: React.FC = () => {
  const { lastSubmittedProduct, lastSubmittedRank, navigateTo } = useProduct();
  const hasRunConfetti = useRef(false);

  useEffect(() => {
    if (!hasRunConfetti.current) {
      hasRunConfetti.current = true;
      // Fire burst confetti
      const fire = (particleRatio: number, opts: Record<string, unknown>) => {
        confetti({
          origin: { y: 0.45 },
          ...opts,
          particleCount: Math.floor(220 * particleRatio),
          colors: ['#c98ed6', '#dfbce8', '#ffd700', '#ffffff', '#a78bfa'],
        });
      };
      setTimeout(() => {
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      }, 150);
    }
  }, []);

  if (!lastSubmittedProduct) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={() => navigateTo('home')}
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.75rem', borderRadius: '12px', fontSize: '1rem' }}
        >
          Back to Leaderboard
        </button>
      </div>
    );
  }

  const p = lastSubmittedProduct;
  const cats = p.categories || [p.category];
  const catLabels = cats.filter(c => c !== 'all').map(c => CATEGORY_LABELS[c] || c);

  const shareText = `Just submitted my marketing campaign "${p.name}" to marketingdb.lol — ranked #${lastSubmittedRank}!\n\nCheck it out 👇`;
  const shareUrl = `https://marketingdb.lol`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: p.name, text: shareText, url: shareUrl });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 4.8rem)',
      background: 'var(--bg-base)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '1.25rem 1rem 2.5rem'
    }}>
      {/* Ambient glow backdrop */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201,142,214,0.18) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top Header Bar with Back Button & Success Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => navigateTo('home')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)', padding: '0.45rem 1.1rem',
              color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer',
              fontWeight: 600, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <ArrowLeft size={15} />
            Back to Leaderboard
          </button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
            background: 'rgba(201,142,214,0.15)', border: '1px solid rgba(201,142,214,0.3)',
            color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700,
          }}>
            <Sparkles size={13} />
            100% Free • Listed Permanently
          </div>
        </div>

        {/* Compact Title Row */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(201,142,214,0.25), rgba(167,139,250,0.25))',
            border: '2px solid rgba(201,142,214,0.6)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.5rem',
            boxShadow: '0 0 28px rgba(201,142,214,0.35)',
            animation: 'pulseGlow 2s ease-in-out infinite'
          }}>
            <CheckCircle size={28} color="var(--accent-primary)" strokeWidth={2.2} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
            fontWeight: 900, letterSpacing: '-0.025em', color: 'var(--text-primary)',
            lineHeight: 1.15, margin: '0 0 0.25rem'
          }}>
            Your campaign is live! 🎉
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            It's published on the board. The community sees it now.
          </p>
        </div>

        {/* 2-Column Desktop Grid (Non-scrollable) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        }}>
          {/* Column 1: Campaign Summary Card */}
          <div className="glass-panel" style={{
            borderRadius: '20px', padding: '1.5rem 1.65rem',
            border: '1.5px solid rgba(201,142,214,0.4)',
            boxShadow: '0 16px 48px -8px rgba(0,0,0,0.2), 0 0 24px rgba(201,142,214,0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              {/* Rank & Category badges */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15))',
                  border: '1px solid rgba(255,215,0,0.4)',
                }}>
                  <Trophy size={15} color="#ffd700" />
                  <span style={{ fontWeight: 800, color: '#ffd700', fontSize: '0.875rem' }}>
                    Rank #{lastSubmittedRank} on Leaderboard
                  </span>
                </div>

                {catLabels.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {catLabels.map(label => (
                      <span key={label} style={{
                        padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)',
                        background: 'rgba(201,142,214,0.15)', border: '1px solid rgba(201,142,214,0.25)',
                        color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700
                      }}>{label}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Brand Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                  background: p.logo ? `url(${p.logo}) center/cover` : 'var(--gradient-fire)',
                  border: '1.5px solid var(--border-subtle)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 0.15rem', lineHeight: 1.2 }}>
                    {p.name}
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    by {p.creator.handle} · {p.displayUrl}
                  </span>
                </div>
              </div>

              {/* Tactic Hook */}
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                lineHeight: 1.35,
                marginBottom: '0.75rem'
              }}>
                {p.tagline}
              </div>

              {/* Description box */}
              {p.description && (
                <div style={{
                  padding: '0.75rem 0.9rem', borderRadius: '10px',
                  background: 'rgba(201,142,214,0.07)', border: '1px solid rgba(201,142,214,0.15)',
                  marginBottom: '0.85rem'
                }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.45, margin: 0 }}>
                    {p.description}
                  </p>
                </div>
              )}

              {/* Votes & Clicks */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  flex: 1, textAlign: 'center', padding: '0.5rem',
                  borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>{p.votes}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Push Ups</div>
                </div>
                <div style={{
                  flex: 1, textAlign: 'center', padding: '0.5rem',
                  borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>{p.clicks}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Clicks</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={() => navigateTo('home')}
                style={{
                  flex: 1.3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-primary)', color: '#fff',
                  border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.9rem',
                  boxShadow: '0 4px 16px rgba(201,142,214,0.35)',
                  transition: 'all 0.2s'
                }}
              >
                <ExternalLink size={15} />
                View on Leaderboard
              </button>

              <button
                onClick={handleShare}
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)',
                  background: 'transparent', color: 'var(--text-primary)',
                  border: '1.5px solid var(--border-subtle)', cursor: 'pointer',
                  fontWeight: 700, fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
              >
                <Share2 size={15} />
                Share on X
              </button>
            </div>
          </div>

          {/* Column 2: Buy Me a Coffee / Support Builder Card */}
          <div style={{
            borderRadius: '20px', padding: '1.75rem 1.65rem',
            background: 'linear-gradient(135deg, rgba(255,189,79,0.09) 0%, rgba(255,122,0,0.09) 100%)',
            border: '1.5px solid rgba(255,189,79,0.35)',
            boxShadow: '0 12px 36px rgba(255,189,79,0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative stars */}
            <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', opacity: 0.4 }}>
              <Star size={14} color="#ffd700" fill="#ffd700" />
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', opacity: 0.3 }}>
              <Star size={12} color="#ffd700" fill="#ffd700" />
            </div>

            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.35rem' }}>☕</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900,
                color: 'var(--text-primary)', margin: '0 0 0.5rem', lineHeight: 1.25
              }}>
                Enjoying MarketingDB?
              </h3>
              <p style={{
                color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.5,
                margin: '0 auto 1.25rem', maxWidth: '380px'
              }}>
                MarketingDB is 100% free because great marketing should live forever — not behind a paywall. If this made your day, support the developer with a coffee! ☕
              </p>
            </div>

            <div>
              <a
                href="https://buymeacoffee.com/tanm_io"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                  width: '100%',
                  padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #FF813F 0%, #FFDD00 100%)',
                  color: '#1a0a00', fontWeight: 800, fontSize: '0.975rem',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(255,129,63,0.38)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                <Coffee size={18} />
                Buy Me a Coffee
              </a>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.75rem 0 0' }}>
                100% optional ✦ Keeps servers live & me coding
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 28px rgba(201,142,214,0.35); }
          50% { box-shadow: 0 0 50px rgba(201,142,214,0.65); }
        }
      `}</style>
    </div>
  );
};
