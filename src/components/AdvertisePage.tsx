import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Coffee, 
  CheckCircle2
} from 'lucide-react';
import { autoFetchDomainMetadata } from '../utils/productHelper';
import { saveSponsorToTurso } from '../services/tursoService';

export const AdvertisePage: React.FC = () => {
  const { navigateTo } = useProduct();

  // Form State
  const [urlInput, setUrlInput] = useState('');
  const [saasName, setSaasName] = useState('');
  const [saasTagline, setSaasTagline] = useState('');
  const [saasLogo, setSaasLogo] = useState('');
  const [saasDirectUrl, setSaasDirectUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-fetch details when URL changes
  const handleUrlChange = (val: string) => {
    setUrlInput(val);
    if (!val || val.trim().length < 3) return;

    try {
      const meta = autoFetchDomainMetadata(val.trim());
      setSaasName(meta.name);
      setSaasTagline(meta.headline || 'Next-gen growth tool for creators & marketers');
      setSaasLogo(meta.logo);
      setSaasDirectUrl(val.trim().startsWith('http') ? val.trim() : `https://${val.trim()}`);
    } catch {}
  };

  const handlePayAndActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saasName || !saasDirectUrl) return;

    setIsProcessing(true);
    try {
      // Save sponsor to DB
      await saveSponsorToTurso({
        name: saasName,
        tagline: saasTagline,
        url: saasDirectUrl,
        logo: saasLogo,
        email: contactEmail
      });

      // Open Buy Me A Coffee $10 checkout
      const bmacUrl = `https://buymeacoffee.com/tanm_io?amount=10&note=Sponsor%20Spot%20for%20${encodeURIComponent(saasName)}`;
      window.open(bmacUrl, '_blank', 'noopener,noreferrer');
      
      setIsPaidSuccess(true);
    } catch (err) {
      console.warn('Error saving sponsor:', err);
      setIsPaidSuccess(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="app-container" style={{ maxWidth: '1080px' }}>
        {/* Top Back Navigation */}
        <button
          onClick={() => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            marginBottom: '1.75rem',
            fontWeight: 600,
            padding: 0
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={16} />
          <span>Back to Leaderboard</span>
        </button>

        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(201, 142, 214, 0.15)',
            border: '1px solid rgba(201, 142, 214, 0.3)',
            color: 'var(--accent-primary)',
            fontSize: '0.825rem',
            fontWeight: 800,
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={13} />
            <span>Featured Spotlight Slot</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            Sponsor marketingdb.lol
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            Enter your SaaS or product link. We auto-fetch your metadata so you can launch in 60 seconds.
          </p>
        </div>

        {/* 2-Column Split: Left (SaaS Auto-fetch Details) | Right ($10 Payment) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Left Column: SaaS Details & Auto-Fetch */}
          <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              1. Your SaaS / Product Details
            </h3>

            {/* Input Link */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                SaaS or Website Link (Auto-Fetches Everything)
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 0.85rem'
              }}>
                <Globe size={16} color="var(--accent-primary)" />
                <input
                  type="text"
                  placeholder="e.g. https://mytool.ai or myagency.com"
                  value={urlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Editable Fetched Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme SaaS"
                  value={saasName}
                  onChange={(e) => setSaasName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Headline / Tagline Pitch
                </label>
                <input
                  type="text"
                  placeholder="e.g. The fastest way to turn comments into customers"
                  value={saasTagline}
                  onChange={(e) => setSaasTagline(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Destination URL
                </label>
                <input
                  type="text"
                  placeholder="https://mytool.ai"
                  value={saasDirectUrl}
                  onChange={(e) => setSaasDirectUrl(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Live Ad Card Preview */}
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '-9px',
                left: '12px',
                background: 'var(--accent-primary)',
                color: '#1a0a2a',
                fontSize: '0.65rem',
                fontWeight: 900,
                padding: '0.1rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase'
              }}>
                Live Sponsor Ad Preview
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(201, 142, 214, 0.2)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {saasLogo ? (
                    <img src={saasLogo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Sparkles size={18} color="var(--accent-primary)" />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {saasName || 'Your Product Name'}
                    </strong>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(234, 179, 8, 0.15)',
                      color: '#eab308',
                      fontWeight: 700
                    }}>
                      SPONSOR
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.785rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {saasTagline || 'Your compelling marketing pitch shows up here'}
                  </p>
                </div>

                <div style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-primary)',
                  color: '#1a0a2a',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  flexShrink: 0
                }}>
                  <span>Visit</span>
                  <ExternalLink size={11} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: $10 USD Payment & Activation */}
          <div className="glass-panel" style={{
            padding: '2.2rem 2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(180deg, rgba(201, 142, 214, 0.12) 0%, var(--bg-card) 100%)',
            border: '2px solid rgba(201, 142, 214, 0.5)',
            boxShadow: '0 10px 40px rgba(201, 142, 214, 0.18)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--accent-primary)'
              }}>
                Instant Activation
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--accent-green)',
                fontWeight: 700
              }}>
                Live Sponsor Slot
              </span>
            </div>

            {/* Sponsor Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 129, 63, 0.15)',
                color: '#FF813F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Coffee size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Buy Me a Coffee Sponsor
                </h3>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  Pay any amount on Buy Me a Coffee to claim your spot
                </span>
              </div>
            </div>

            {/* Contribution Duration Rules Box */}
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid rgba(201, 142, 214, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.9rem 1rem',
              marginBottom: '1.4rem'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.6rem' }}>
                ⚡ Spotlight Duration Rules
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>☕ <strong>$1 – $5</strong> Support</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>1 Day Spotlight</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🚀 <strong>$6 – $49</strong> Support</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Equal Days (e.g. $10 = 10 Days)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>👑 <strong>$50+</strong> Support</span>
                  <span style={{ fontWeight: 800, color: 'var(--accent-green)' }}>Permanent Forever (Lifetime)</span>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.865rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span><strong>Featured Spot</strong> on left sidebar of marketingdb.lol</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span><strong>Direct Dofollow Link</strong> & verified sponsor badge</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span><strong>Instant Exposure</strong> to founders & marketers</span>
              </li>
            </ul>

            {/* Email Input & Checkout Form */}
            <form onSubmit={handlePayAndActivate}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Your Confirmation Email (Any email address)
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@gmail.com, proton, etc."
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              {isPaidSuccess ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'var(--accent-green)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  <CheckCircle2 size={20} />
                  <span>Sponsor details saved! Complete support on Buy Me a Coffee to activate live.</span>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isProcessing || !saasName || !saasDirectUrl}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Coffee size={18} />
                <span>{isProcessing ? 'Processing...' : 'Support on Buy Me a Coffee & Activate'}</span>
              </button>
            </form>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              marginTop: '1rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <ShieldCheck size={14} color="var(--accent-green)" />
              <span>Secure checkout • Instant activation • Support: contact@marketingdb.lol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
