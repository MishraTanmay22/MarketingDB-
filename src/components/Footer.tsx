import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { Mail, Shield, FileText, Cookie, AlertCircle, Coffee, ArrowUpRight, ExternalLink } from 'lucide-react';
import { LegalModal, type LegalTab } from './LegalModal';

export const Footer: React.FC = () => {
  const { setIsHowItWorksOpen, navigateTo } = useProduct();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('terms');

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <>
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-nav)',
        padding: '3.5rem 0 2rem',
        marginTop: 'auto'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}>
          {/* Main Footer Multi-Column Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Column 1: Brand & Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', gridColumn: 'span 1' }}>
              <div 
                onClick={() => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
              >
                <div style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  borderRadius: '0.6rem',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(201, 142, 214, 0.25) 0%, rgba(26, 23, 20, 0.8) 100%)',
                  border: '1px solid rgba(201, 142, 214, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(201, 142, 214, 0.25)'
                }}>
                  <img 
                    src="/logo.png" 
                    alt="marketingdb.lol" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                  marketingdb<span style={{ color: 'var(--accent-primary)' }}>.lol</span>
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                The live internet leaderboard where the best marketing tactics, creatives, and campaigns battle for #1 community ranking.
              </p>

              {/* Compliance Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  🇪🇺 GDPR Ready
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  🇺🇸 CCPA Compliant
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  🇨🇦 PIPEDA
                </span>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Platform
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Leaderboard & Crown
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); navigateTo('case-studies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Case Studies & Teardowns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); navigateTo('submit'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Submit Campaign (100% Free)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setIsHowItWorksOpen(true); }}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Policies (EU / USA / Canada compliant) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Legal & Privacy
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <li>
                  <button
                    onClick={() => openLegal('terms')}
                    style={{
                      background: 'transparent', border: 'none', padding: 0,
                      color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <FileText size={13} />
                    <span>Terms of Service</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegal('privacy')}
                    style={{
                      background: 'transparent', border: 'none', padding: 0,
                      color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Shield size={13} />
                    <span>Privacy Policy (GDPR / CCPA)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegal('cookies')}
                    style={{
                      background: 'transparent', border: 'none', padding: 0,
                      color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Cookie size={13} />
                    <span>Cookie & Storage Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegal('dmca')}
                    style={{
                      background: 'transparent', border: 'none', padding: 0,
                      color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <AlertCircle size={13} />
                    <span>DMCA & Takedown</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Support */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Support & Inquiries
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <a
                  href="https://x.com/tanm_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <ExternalLink size={14} color="var(--accent-primary)" />
                  <span>@tanm_io on X</span>
                </a>

                <a
                  href="mailto:contact@marketingdb.lol"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <Mail size={14} color="var(--accent-primary)" />
                  <span>contact@marketingdb.lol</span>
                </a>

                <a
                  href="mailto:tanmio0xx@proton.me"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <Mail size={14} color="var(--accent-primary)" />
                  <span>tanmio0xx@proton.me</span>
                </a>

                <a
                  href="https://buymeacoffee.com/tanm_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: '#FF813F',
                    fontWeight: 700,
                    textDecoration: 'none',
                    marginTop: '0.2rem'
                  }}
                >
                  <Coffee size={14} />
                  <span>Buy Me a Coffee</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom copyright & Creator Attribution */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.825rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span>© {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>marketingdb.lol</strong></span>
              <span>•</span>
              <span>All rights reserved.</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Built by</span>
              <a
                href="https://x.com/tanm_io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                @tanm_io
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Global Legal Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </>
  );
};
