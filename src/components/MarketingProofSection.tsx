import React from 'react';
import { Sparkles } from 'lucide-react';

export const MarketingProofSection: React.FC = () => {
  return (
    <section style={{
      padding: '5rem 0 8rem',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201, 142, 214, 0.13) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201, 142, 214, 0.13) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '70%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201, 142, 214, 0.13) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="app-container" style={{ maxWidth: '1120px', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)',
            background: 'rgba(201, 142, 214, 0.15)', border: '1px solid rgba(201, 142, 214, 0.25)',
            color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 800,
            marginBottom: '0.85rem', boxShadow: '0 2px 14px rgba(201, 142, 214, 0.18)'
          }}>
            <Sparkles size={14} />
            <span>Every Format. One Permanent Home.</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 900, letterSpacing: '-0.025em', color: 'var(--text-primary)',
            marginBottom: '0.6rem', lineHeight: 1.2
          }}>
            Whatever marketing made you grow.
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
            A viral X post, an Instagram Reel, a YouTube breakdown, or a viral Slideshow — rank #1 in your format. Free forever.
          </p>

          <span style={{ display: 'inline-block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.45rem', opacity: 0.8 }}>
            (Examples shown for visual illustration & format inspiration)
          </span>
        </div>

        {/* Zigzag Flow: odd rows LEFT, even rows RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>

          {/* LINE 1: LEFT — 1. X Post */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingLeft: '2rem' }}>
            <div style={{ width: '540px' }}>
              <div style={{
                fontFamily: "'Caveat', cursive", fontSize: '2.4rem', fontWeight: 700,
                color: 'var(--accent-primary)', marginBottom: '0.7rem',
                transform: 'rotate(-3deg)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                textShadow: '0 2px 16px rgba(201, 142, 214, 0.4)'
              }}>
                <span>1. X Post</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div className="glass-panel" style={{
                width: '100%', padding: '1.75rem 2rem', borderRadius: '28px',
                border: '1.5px solid rgba(201, 142, 214, 0.45)', background: 'var(--bg-card)',
                boxShadow: '0 25px 60px -10px rgba(0,0,0,0.3), 0 0 35px rgba(201, 142, 214, 0.22)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 32px 75px -10px rgba(201,142,214,0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(0,0,0,0.3), 0 0 35px rgba(201, 142, 214, 0.22)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-fire)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(201,142,214,0.5)' }}>M</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>marketingdb_lol</span>
                        <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px' }}>✓</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>@marketingdb_lol</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)', fontWeight: 800 }}>𝕏</span>
                </div>

                <div style={{ fontSize: '1.025rem', color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: '1.1rem' }}>
                  <p style={{ marginBottom: '0.6rem' }}>🚀 Introducing <strong>MarketingDB.lol</strong></p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>Upload your best ads, landing pages, emails, and creatives.<br />Rank on a live community leaderboard.</p>
                  <p style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '1.05rem' }}>💜 $5 once. Stay on the board forever.</p>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <span><strong style={{ color: 'var(--text-primary)' }}>4</strong> Retweets</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>23</strong> Quotes</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>54</strong> Likes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connector 1: curves RIGHT ↘ */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
            <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 30 10 C 80 10, 180 70, 230 70" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
              <path d="M 218 58 L 232 70 L 218 80" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* LINE 2: RIGHT — 2. Reel / TikTok */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '2rem' }}>
            <div style={{ width: '360px' }}>
              <div style={{
                fontFamily: "'Caveat', cursive", fontSize: '2.4rem', fontWeight: 700,
                color: 'var(--accent-primary)', marginBottom: '0.7rem',
                transform: 'rotate(-2deg)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                textShadow: '0 2px 16px rgba(201, 142, 214, 0.4)'
              }}>
                <span>2. Reel / TikTok</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div style={{
                position: 'relative', width: '100%', aspectRatio: '9 / 16',
                borderRadius: '32px', overflow: 'hidden', background: '#090807',
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
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
            <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 230 10 C 180 10, 80 70, 30 70" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
              <path d="M 42 58 L 28 70 L 42 80" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* LINE 3: LEFT — 3. YouTube Video */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingLeft: '2rem' }}>
            <div style={{ width: '380px' }}>
              <div style={{
                fontFamily: "'Caveat', cursive", fontSize: '2.4rem', fontWeight: 700,
                color: 'var(--accent-primary)', marginBottom: '0.7rem',
                transform: 'rotate(2deg)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                textShadow: '0 2px 16px rgba(201, 142, 214, 0.4)'
              }}>
                <span>3. YouTube Video</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div style={{
                position: 'relative', width: '100%', borderRadius: '32px', overflow: 'hidden',
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
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
            <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 30 10 C 80 10, 180 70, 230 70" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
              <path d="M 218 58 L 232 70 L 218 80" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* LINE 4: RIGHT — 4. Slideshow / Carousel */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '2rem' }}>
            <div style={{ width: '360px' }}>
              <div style={{
                fontFamily: "'Caveat', cursive", fontSize: '2.4rem', fontWeight: 700,
                color: 'var(--accent-primary)', marginBottom: '0.7rem',
                transform: 'rotate(-2deg)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                textShadow: '0 2px 16px rgba(201, 142, 214, 0.4)'
              }}>
                <span>4. Slideshow</span>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}>✦</span>
              </div>

              <div style={{
                position: 'relative', width: '100%', aspectRatio: '3 / 4',
                borderRadius: '32px', overflow: 'hidden', background: '#090807',
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3rem 0 0', marginTop: '1rem' }}>
            <div style={{
              fontFamily: "'Caveat', cursive", fontSize: '2.6rem', fontWeight: 700,
              color: 'var(--accent-primary)', lineHeight: 1.1, transform: 'rotate(-3deg)',
              marginBottom: '0.45rem', textShadow: '0 2px 18px rgba(201,142,214,0.5)'
            }}>
              ...and many more ✦
            </div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: 'var(--text-muted)', transform: 'rotate(-1deg)' }}>
              all marketing battles rank forever
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
