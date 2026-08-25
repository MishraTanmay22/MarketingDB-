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
  CheckCircle2,
  Heart,
  Server
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

      // Open Buy Me A Coffee checkout
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
      <div className="app-container" style={{ maxWidth: '1100px' }}>
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
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto' }}>
            A community project for founders & marketers. Sponsoring gets you permanent visibility while directly keeping our servers & databases running.
          </p>
        </div>

        {/* 2-Column Split: Left (SaaS Auto-fetch & Side Project Note) | Right (Support & Activation) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {/* Left Column: SaaS Details, Auto-Fetch & Indie Note */}
          <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  1. Your SaaS / Product Details
                </h3>
                <span style={{
                  fontSize: '0.72rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  background: 'rgba(201, 142, 214, 0.12)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  Auto-Sync Enabled
                </span>
              </div>

              {/* Input Link */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  SaaS or Website Link (Auto-Fetches Metadata)
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
                    placeholder="e.g. getseoo.com or https://yourproduct.io"
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.785rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GetSeoo"
                    value={saasName}
                    onChange={(e) => setSaasName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.55rem 0.75rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.785rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                    Headline / Tagline Pitch
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Turn organic search into recurring paying customers"
                    value={saasTagline}
                    onChange={(e) => setSaasTagline(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.55rem 0.75rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.785rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                    Destination URL (Direct Dofollow)
                  </label>
                  <input
                    type="text"
                    placeholder="https://getseoo.com"
                    value={saasDirectUrl}
                    onChange={(e) => setSaasDirectUrl(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.55rem 0.75rem',
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
                padding: '0.9rem',
                position: 'relative',
                marginBottom: '1.5rem'
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
                  Live Sidebar Preview
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.15rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
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
                      <Sparkles size={16} color="var(--accent-primary)" />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {saasName || 'Your Product Name'}
                      </strong>
                      <span style={{
                        fontSize: '0.62rem',
                        padding: '0.08rem 0.35rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(234, 179, 8, 0.15)',
                        color: '#eab308',
                        fontWeight: 700
                      }}>
                        SPONSOR
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.75rem',
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
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#1a0a2a',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    flexShrink: 0
                  }}>
                    <span>Visit</span>
                    <ExternalLink size={10} />
                  </div>
                </div>
              </div>
            </div>

            {/* Indie Project & Server Running Note (Balances the layout & explains side-project nature) */}
            <div style={{
              background: 'rgba(201, 142, 214, 0.07)',
              border: '1px dashed rgba(201, 142, 214, 0.45)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              fontSize: '0.785rem',
              lineHeight: 1.45,
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                marginBottom: '0.35rem',
                fontSize: '0.82rem'
              }}>
                <Heart size={14} fill="var(--accent-primary)" />
                <span>Side Project • No Corporate Paywalls</span>
              </div>
              <p style={{ margin: 0 }}>
                MarketingDB is an independent community side-project. We intentionally avoid complex commercial payment gateways and recurring corporate subscriptions. Sponsoring via Buy Me a Coffee directly funds our cloud database, media storage, and server uptime.
              </p>
            </div>
          </div>

          {/* Right Column: Buy Me A Coffee Support & Activation */}
          <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(180deg, rgba(201, 142, 214, 0.12) 0%, var(--bg-card) 100%)',
            border: '2px solid rgba(201, 142, 214, 0.5)',
            boxShadow: '0 10px 40px rgba(201, 142, 214, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '0.785rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--accent-primary)'
                }}>
                  Instant Activation
                </span>
                <span style={{
                  fontSize: '0.72rem',
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
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 129, 63, 0.15)',
                  color: '#FF813F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Coffee size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Buy Me a Coffee Sponsor
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Support server hosting to activate your featured slot
                  </span>
                </div>
              </div>

              {/* Contribution Duration Rules Box */}
              <div style={{
                background: 'var(--bg-input)',
                border: '1px solid rgba(201, 142, 214, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                  ⚡ Spotlight Duration & Value
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.3rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>☕ <strong>$1 – $5</strong> Support</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>1 Day Spotlight</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.3rem', borderBottom: '1px solid var(--border-subtle)' }}>
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
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span><strong>Featured Spot</strong> on left sidebar of marketingdb.lol</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span><strong>Direct Dofollow Link</strong> & verified sponsor badge (SEO Boost)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Server size={11} strokeWidth={2.5} />
                  </div>
                  <span><strong>100% Server Direct:</strong> Funds cloud hosting & database upkeep</span>
                </li>
              </ul>
            </div>

            {/* Email Input & Checkout Form */}
            <div>
              <form onSubmit={handlePayAndActivate}>
                <div style={{ marginBottom: '1.15rem' }}>
                  <label style={{ display: 'block', fontSize: '0.785rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
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
                      padding: '0.65rem 0.85rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {isPaidSuccess ? (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--accent-green)',
                    fontWeight: 700,
                    fontSize: '0.825rem',
                    marginBottom: '1rem'
                  }}>
                    <CheckCircle2 size={18} />
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
                    fontSize: '0.925rem',
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
                marginTop: '0.85rem',
                fontSize: '0.725rem',
                color: 'var(--text-muted)'
              }}>
                <ShieldCheck size={13} color="var(--accent-green)" />
                <span>Zero bloated subscriptions • Direct server funding • Instant activation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
