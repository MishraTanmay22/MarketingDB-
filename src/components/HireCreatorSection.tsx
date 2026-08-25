import React from 'react';
import { Mail, ArrowRight, ExternalLink } from 'lucide-react';

export const HireCreatorSection: React.FC = () => {
  return (
    <section style={{
      padding: '4rem 0 5.5rem',
      position: 'relative'
    }}>
      <div className="app-container" style={{ maxWidth: '820px' }}>
        <div className="glass-panel" style={{
          padding: 'clamp(2.25rem, 4vw, 3.25rem)',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: 'var(--accent-green)',
            fontSize: '0.825rem',
            fontWeight: 800,
            marginBottom: '1.25rem'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
            <span>Available for Hire & Projects</span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Hire Me for Your Next Build.
          </h2>

          {/* Copy using tanmio */}
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.025rem',
            lineHeight: 1.65,
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            I'm @tanm_io, the developer behind MarketingDB. I build full-stack web applications, landing pages, and interactive platforms for founders and brands looking for fast, high-quality execution.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a
              href="mailto:tanmio0xx@proton.me?subject=Hiring%20/%20Project%20Inquiry&body=Hi%20tanmio,%0A%0AI'm%20interested%20in%20hiring%20you%20for%20a%20project:%0A%0A-%20Project%20Overview:%20%0A-%20Scope%20(Full-Stack%20App,%20Landing%20Page,%20UI/UX):%20%0A-%20Budget%20&%20Timeline:%20"
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.95rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                textDecoration: 'none'
              }}
            >
              <Mail size={16} />
              <span>Hire Me</span>
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
                padding: '0.85rem 1.45rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.925rem',
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
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
