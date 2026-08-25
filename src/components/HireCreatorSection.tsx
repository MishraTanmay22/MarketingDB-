import React from 'react';
import { 
  Sparkles, 
  Mail, 
  ArrowRight, 
  Rocket, 
  Code, 
  TrendingUp, 
  ExternalLink
} from 'lucide-react';

export const HireCreatorSection: React.FC = () => {
  return (
    <section style={{
      padding: '5rem 0 6.5rem',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(201, 142, 214, 0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="app-container" style={{ maxWidth: '1060px', position: 'relative', zIndex: 1 }}>
        <div className="glass-panel" style={{
          padding: 'clamp(2rem, 4vw, 3.5rem)',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(135deg, rgba(201, 142, 214, 0.12) 0%, var(--bg-card) 100%)',
          border: '1.5px solid rgba(201, 142, 214, 0.4)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Bio & Value */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(201, 142, 214, 0.18)',
                border: '1px solid rgba(201, 142, 214, 0.35)',
                color: 'var(--accent-primary)',
                fontSize: '0.8rem',
                fontWeight: 800,
                marginBottom: '1rem'
              }}>
                <Sparkles size={13} />
                <span>Work Directly With The Creator</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                Need High-Converting Growth, Apps, or Marketing?
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.975rem',
                lineHeight: 1.65,
                marginBottom: '1.75rem'
              }}>
                MarketingDB was conceived, designed, and coded from scratch by an independent builder. I collaborate with select founders, startups, and agencies to build high-converting landing pages, custom viral software, and growth-engineered products.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a
                  href="mailto:tanmio0xx@proton.me?subject=Inquiry%20to%20Hire%20/%20Work%20Together&body=Hi%20Tanmay,%0A%0AI%20saw%20MarketingDB%20and%20would%20like%20to%20hire%20you%20for%20a%20project.%0A%0A-%20Project%20Name:%20%0A-%20What%20we%20need%20(Design,%20Full-Stack%20Development,%20Growth):%20%0A-%20Estimated%20Budget:%20"
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 1.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.925rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={16} />
                  <span>Hire / Work Together</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href="https://x.com/tanm_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <span>DM on X @tanm_io</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Right Column: Capabilities Card */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem'
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Areas of Expertise & Collaboration
              </div>

              {/* Item 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201, 142, 214, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Code size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>Full-Stack Web & MVP Development</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rapid, production-grade React, Node, and Edge database applications.</span>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201, 142, 214, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Rocket size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>Viral Growth & Acquisition Engines</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interactive directories, leaderboards, and viral organic marketing loops.</span>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.65rem 0' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201, 142, 214, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <TrendingUp size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>High-Converting UI/UX & Landing Pages</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Polished visual identity, micro-interactions, and conversion rate optimization.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
