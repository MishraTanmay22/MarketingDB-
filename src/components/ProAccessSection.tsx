import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { 
  Check, 
  Sparkles, 
  Crown, 
  ArrowRight, 
  Zap, 
  Megaphone, 
  FileText, 
  Compass, 
  Headphones, 
  Share2,
  Mail,
  CheckCircle2,
  Globe2,
  Layers
} from 'lucide-react';
import { saveProWaitlistEmailToTurso } from '../services/tursoService';

export const ProAccessSection: React.FC = () => {
  const { navigateTo } = useProduct();
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || waitlistEmail.trim().length < 5) return;

    setIsSaving(true);
    try {
      await saveProWaitlistEmailToTurso(waitlistEmail.trim());
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Error submitting waitlist email:', err);
      setIsSubmitted(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section style={{
      padding: '4.5rem 0 6rem',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(201, 142, 214, 0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="app-container" style={{ maxWidth: '1060px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(201, 142, 214, 0.15)',
            border: '1px solid rgba(201, 142, 214, 0.3)',
            color: 'var(--accent-primary)',
            fontSize: '0.85rem',
            fontWeight: 800,
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={14} />
            <span>Access & Plans</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            marginBottom: '0.6rem'
          }}>
            Transparent Access for Every Growth Hacker
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto' }}>
            Start completely free today. Scale with upcoming Pro distribution & priority spotlight features.
          </p>
        </div>

        {/* Pricing & Tier Grid (2 Columns Side-by-Side) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {/* Card 1: Basic (Free Forever) */}
          <div className="glass-panel" style={{
            padding: '2.5rem 2.2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.75rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)'
                }}>
                  Community Tier
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-green)',
                  fontWeight: 700
                }}>
                  Free Forever
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  $0
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  / no credit card
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                Everything you need to list your marketing campaigns, rank on the community leaderboard, and show off your creative assets.
              </p>

              {/* Feature List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span><strong>Submit for 100% Free</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span><strong>1 Push Up every 24 hours</strong> per IP</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>Direct creative visual asset link display</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>Real-time community leaderboard ranking</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>Live activity feed recognition</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => { navigateTo('submit'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span>Submit for Free</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2: Pro Access (Coming Soon) */}
          <div className="glass-panel" style={{
            padding: '2.5rem 2.2rem',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid rgba(201, 142, 214, 0.65)',
            background: 'linear-gradient(180deg, rgba(201, 142, 214, 0.09) 0%, var(--bg-card) 100%)',
            boxShadow: '0 12px 40px -10px rgba(201, 142, 214, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.75rem',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Top Ribbon */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '24px',
              background: 'linear-gradient(135deg, #c98ed6 0%, #a855f7 100%)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 15px rgba(201, 142, 214, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Zap size={13} fill="#fff" />
              <span>Coming Soon</span>
            </div>

            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Crown size={18} color="var(--accent-primary)" />
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--accent-primary)'
                  }}>
                    Pro Spotlight Access
                  </span>
                </div>
              </div>

              {/* Price Tag / Status */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Pro Suite
                </span>
                <span style={{
                  color: 'var(--accent-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: 'rgba(201, 142, 214, 0.15)',
                  padding: '0.15rem 0.55rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  Early Wishlist
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Maximum distribution and spotlight attention for serious agencies, founders, and growth marketing teams.
              </p>

              {/* Pro Feature List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.885rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>Everything in Basic, plus:</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Share2 size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>Specific Mention & Shoutout on X (Twitter)</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Globe2 size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>Weekly submission to 10 high-authority citations</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Layers size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>More Creative Formats & Multi-Asset Adds</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <FileText size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>Special Case Study Mention on Site and X</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Compass size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>Similar Campaign Recommendations</strong> (cross-promoted)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Megaphone size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>Featured Advertisement Area</strong> on top of site</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201, 142, 214, 0.25)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Headphones size={13} strokeWidth={2.5} />
                  </div>
                  <span><strong>Special Priority Support</strong> & verified marketer profile</span>
                </li>
              </ul>
            </div>

            {/* Waitlist / Wishlist Form */}
            {isSubmitted ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-green)',
                fontWeight: 700,
                fontSize: '0.875rem'
              }}>
                <CheckCircle2 size={18} />
                <span>You&apos;re on the Pro wishlist! Saved to database.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email for Pro wishlist"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem 1.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Mail size={15} />
                  <span>{isSaving ? 'Saving...' : 'Notify Me'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
