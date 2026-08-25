import React from 'react';
import { MessageCircle, Repeat2, Heart, Bookmark, Share } from 'lucide-react';

export const MarketingProofSection: React.FC = () => {
  return (
    <section className="marketing-proof-section" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', background: 'radial-gradient(circle, rgba(201, 142, 214, 0.13) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', background: 'radial-gradient(circle, rgba(201, 142, 214, 0.13) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '70%', left: '10%', width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', background: 'radial-gradient(circle, rgba(201, 142, 214, 0.13) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="app-container" style={{ maxWidth: '1120px', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 900, 
            letterSpacing: '-0.025em', 
            color: 'var(--text-primary)',
            marginBottom: '0.6rem', 
            lineHeight: 1.2
          }}>
            Whatever marketing made you grow.
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.925rem, 2vw, 1.05rem)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
            A viral X post, an Instagram Reel, a YouTube breakdown, or a viral Slideshow — showcase and rank #1 in your format.
          </p>

          <span style={{ display: 'inline-block', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.45rem', opacity: 0.8 }}>
            (Examples shown for visual illustration & format inspiration)
          </span>
        </div>

        {/* Zigzag Flow: odd rows LEFT, even rows RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', width: '100%' }}>

          {/* LINE 1: LEFT — 1. X Post */}
          <div className="proof-row proof-row-left">
            <div className="proof-card-wrapper proof-card-x-wrap">
              <div className="proof-badge" style={{ transform: 'rotate(-3deg)' }}>
                <span>1. X Post</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div className="glass-panel proof-card-inner" style={{
                padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 3vw, 2rem)',
                borderRadius: '24px',
                border: '1.5px solid rgba(201, 142, 214, 0.45)', 
                background: 'var(--bg-card)',
                boxShadow: '0 25px 60px -10px rgba(0,0,0,0.3), 0 0 35px rgba(201, 142, 214, 0.22)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 32px 75px -10px rgba(201,142,214,0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(0,0,0,0.3), 0 0 35px rgba(201, 142, 214, 0.22)'; }}
              >
                {/* Author Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#e11d48',
                      boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
                      flexShrink: 0
                    }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>What-A-Least</span>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#1d9bf0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: 900
                        }}>✓</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>@whataleast</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 800 }}>𝕏</span>
                </div>

                {/* Tweet Body */}
                <div style={{ fontSize: '0.975rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <p style={{ margin: 0 }}>🚀 Introducing <strong>MarketingDB.lol</strong></p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Upload your best ads, landing pages, emails, and creatives.</p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Rank on a live community leaderboard.</p>
                </div>

                {/* Timestamp & Views */}
                <div style={{
                  fontSize: '0.825rem',
                  color: 'var(--text-muted)',
                  paddingBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  flexWrap: 'wrap'
                }}>
                  <span>2:29 PM</span>
                  <span>·</span>
                  <span>Aug 25, 2026</span>
                  <span>·</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>40K</strong> Views</span>
                </div>

                {/* Engagement Stats */}
                <div style={{
                  fontSize: '0.825rem',
                  color: 'var(--text-muted)',
                  padding: '0.75rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                  flexWrap: 'wrap'
                }}>
                  <span><strong style={{ color: 'var(--text-primary)' }}>40</strong> Retweets</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>242</strong> Quotes</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>5.3K</strong> Likes</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>2K</strong> Bookmarks</span>
                </div>

                {/* Bottom Action Icons */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  color: 'var(--text-muted)',
                  maxWidth: '380px'
                }}>
                  <button type="button" aria-label="Reply" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#1d9bf0'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <MessageCircle size={17} />
                  </button>
                  <button type="button" aria-label="Repost" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#00ba7c'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <Repeat2 size={17} />
                  </button>
                  <button type="button" aria-label="Like" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#f91880'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <Heart size={17} />
                  </button>
                  <button type="button" aria-label="Bookmark" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#1d9bf0'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <Bookmark size={17} />
                  </button>
                  <button type="button" aria-label="Share" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#1d9bf0'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <Share size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Connector 1: curves RIGHT ↘ */}
          <div className="proof-connector">
            <svg width="220" height="70" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%' }}>
              <path d="M 30 10 C 80 10, 180 70, 230 70" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
              <path d="M 218 58 L 232 70 L 218 80" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* LINE 2: RIGHT — 2. Reel / TikTok */}
          <div className="proof-row proof-row-right">
            <div className="proof-card-wrapper proof-card-media-wrap">
              <div className="proof-badge" style={{ transform: 'rotate(-2deg)' }}>
                <span>2. Reel / TikTok</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div style={{
                position: 'relative', width: '100%', aspectRatio: '9 / 16',
                borderRadius: '24px', overflow: 'hidden', background: '#090807',
                boxShadow: '0 30px 75px -12px rgba(0,0,0,0.5), 0 0 40px rgba(201,142,214,0.35)',
                border: '2.5px solid rgba(201,142,214,0.65)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 38px 85px -12px rgba(201,142,214,0.55)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 30px 75px -12px rgba(0,0,0,0.5), 0 0 40px rgba(201,142,214,0.35)'; e.currentTarget.style.borderColor = 'rgba(201,142,214,0.65)'; }}
              >
                <img src="/creatives/reelic_pookie.png?v=2" alt="Reelic UGC Reel" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Connector 2: curves LEFT ↙ */}
          <div className="proof-connector">
            <svg width="220" height="70" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%' }}>
              <path d="M 230 10 C 180 10, 80 70, 30 70" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
              <path d="M 42 58 L 28 70 L 42 80" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* LINE 3: LEFT — 3. YouTube Video */}
          <div className="proof-row proof-row-left">
            <div className="proof-card-wrapper proof-card-youtube-wrap">
              <div className="proof-badge" style={{ transform: 'rotate(2deg)' }}>
                <span>3. YouTube Video</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div style={{
                position: 'relative', width: '100%', borderRadius: '24px', overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 30px 75px -12px rgba(0,0,0,0.4), 0 0 40px rgba(201,142,214,0.35)',
                border: '2.5px solid rgba(201,142,214,0.65)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 38px 85px -12px rgba(201,142,214,0.55)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 30px 75px -12px rgba(0,0,0,0.4), 0 0 40px rgba(201,142,214,0.35)'; e.currentTarget.style.borderColor = 'rgba(201,142,214,0.65)'; }}
              >
                <img src="/creatives/getseoo_youtube.png?v=2" alt="Getseoo YouTube Video" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          {/* Connector 3: curves RIGHT ↘ */}
          <div className="proof-connector">
            <svg width="220" height="70" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%' }}>
              <path d="M 30 10 C 80 10, 180 70, 230 70" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
              <path d="M 218 58 L 232 70 L 218 80" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* LINE 4: RIGHT — 4. Slideshow / Carousel */}
          <div className="proof-row proof-row-right">
            <div className="proof-card-wrapper proof-card-media-wrap">
              <div className="proof-badge" style={{ transform: 'rotate(-2deg)' }}>
                <span>4. Slideshow</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div style={{
                position: 'relative', width: '100%', aspectRatio: '3 / 4',
                borderRadius: '24px', overflow: 'hidden', background: '#090807',
                boxShadow: '0 30px 75px -12px rgba(0,0,0,0.45), 0 0 40px rgba(201,142,214,0.35)',
                border: '2.5px solid rgba(201,142,214,0.65)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 38px 85px -12px rgba(201,142,214,0.55)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 30px 75px -12px rgba(0,0,0,0.45), 0 0 40px rgba(201,142,214,0.35)'; e.currentTarget.style.borderColor = 'rgba(201,142,214,0.65)'; }}
              >
                <img src="/creatives/slideshow_tiktok.png" alt="Viral TikTok Slideshow" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* End: ...and many more ✦ */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'clamp(2rem, 4vw, 3rem) 0 0', marginTop: '0.5rem' }}>
            <div style={{
              fontFamily: "'Caveat', cursive", 
              fontSize: 'clamp(2rem, 5vw, 2.6rem)', 
              fontWeight: 700,
              color: 'var(--accent-primary)', 
              lineHeight: 1.1, 
              transform: 'rotate(-3deg)',
              marginBottom: '0.45rem', 
              textShadow: '0 2px 18px rgba(201,142,214,0.5)'
            }}>
              ...and many more ✦
            </div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', color: 'var(--text-muted)', transform: 'rotate(-1deg)' }}>
              all marketing battles rank forever
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
