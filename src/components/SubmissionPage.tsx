import React, { useState, useEffect, useRef } from 'react';
import { useProduct } from '../context/ProductContext';
import type { Category } from '../types';
import { autoFetchDomainMetadata } from '../utils/productHelper';
import { 
  ArrowLeft, 
  Globe, 
  Sparkles, 
  ArrowUp, 
  Crown, 
  Link2, 
  ExternalLink 
} from 'lucide-react';

export const SubmissionPage: React.FC = () => {
  const { 
    navigateTo, 
    prefillData, 
    submitCampaign 
  } = useProduct();

  // Field 1: Website Name / URL
  const [websiteUrl, setWebsiteUrl] = useState(prefillData?.url || '');
  const [brandName, setBrandName] = useState(prefillData?.name || '');
  const [brandLogo, setBrandLogo] = useState(prefillData?.logo || '');
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  const [autoFetchedSuccess, setAutoFetchedSuccess] = useState(false);

  // Field 2: Creative Selection (Single Category)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(() => {
    if (prefillData?.categories && prefillData.categories.length > 0) return prefillData.categories;
    return [];
  });

  // Direct Link to the Asset / Creative / Video / Campaign
  const [assetLink, setAssetLink] = useState(prefillData?.assetLink || '');

  // Field 4: Headlines / Tactic
  const [headline, setHeadline] = useState(prefillData?.tagline || '');

  // Field 5: Description / Breakdown
  const [description, setDescription] = useState(prefillData?.description || '');

  // Creator handle
  const [creatorHandle, setCreatorHandle] = useState(prefillData?.creator?.handle || '');

  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-fetch metadata whenever domain is entered
  const lastFetchedUrl = useRef('');
  useEffect(() => {
    if (!websiteUrl || websiteUrl.trim().length < 4) return;
    const clean = websiteUrl.trim().toLowerCase();
    if (clean === lastFetchedUrl.current) return;

    const timer = setTimeout(() => {
      lastFetchedUrl.current = clean;
      setIsAutoFetching(true);

      const meta = autoFetchDomainMetadata(clean);
      if (!brandName) setBrandName(meta.name);
      if (!headline) setHeadline(meta.headline);
      if (!description) setDescription(meta.description);
      setBrandLogo(meta.logo);

      setIsAutoFetching(false);
      setAutoFetchedSuccess(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [websiteUrl]);

  const availableCategories: { key: Category; label: string; icon: string }[] = [
    { key: 'slideshow', label: 'Slideshow', icon: '🖼️' },
    { key: 'ugc', label: 'UGC', icon: '🎬' },
    { key: 'meta-ads', label: 'Meta Ads', icon: '📢' },
    { key: 'tiktok', label: 'TikTok', icon: '📱' },
    { key: 'twitter-x', label: 'Tweet / X', icon: '𝕏' },
    { key: 'youtube', label: 'YouTube', icon: '▶️' },
    { key: 'landing-pages', label: 'Landing Pages', icon: '🌐' },
    { key: 'email', label: 'Email', icon: '💌' },
    { key: 'copywriting', label: 'Copywriting', icon: '✍️' },
    { key: 'branding', label: 'Branding', icon: '🎨' },
    { key: 'creative', label: 'Creative', icon: '✨' },
    { key: 'organic', label: 'Organic', icon: '🌱' }
  ];

  const toggleCategory = (catKey: Category) => {
    if (selectedCategories.includes(catKey)) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([catKey]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl || !brandName) return;

    const finalCategories: Category[] = selectedCategories.length > 0 ? selectedCategories : ['ugc'];

    setIsProcessing(true);
    setTimeout(() => {
      submitCampaign({
        productUrl: websiteUrl,
        name: brandName,
        tagline: headline || 'High-converting marketing campaign & tactic',
        description: description || 'Competing for top spots on marketingdb.lol',
        creatorName: brandName,
        creatorHandle: creatorHandle || `@${brandName.toLowerCase().replace(/\s+/g, '')}`,
        category: finalCategories[0],
        categories: finalCategories,
        assetLink: assetLink || websiteUrl,
        mediaType: 'url',
        mediaData: brandLogo
      });
      setIsProcessing(false);
    }, 600);
  };

  const activeFavicon = brandLogo || (websiteUrl ? `https://www.google.com/s2/favicons?domain=${websiteUrl.replace(/^https?:\/\//, '')}&sz=128` : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80');

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2.5rem 0 6rem',
      background: 'var(--bg-primary)'
    }}>
      <div className="app-container" style={{ maxWidth: '1240px' }}>
        {/* Back Navigation Bar */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigateTo('home')}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.925rem',
              fontWeight: 600,
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to Leaderboard</span>
          </button>

          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            100% Free • Stored permanently
          </span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-fire)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Crown size={20} color="#fff" />
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}>
              Submit Your Marketing Tactic & Creative
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.5 }}>
            Showcase your best marketing creatives, ads, and growth tactics. 100% Free forever.
          </p>
        </div>

        {/* Main Grid: Form (Left) & Real-Time Card Preview (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(380px, 1fr)',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Form Fields (in exact requested order) */}
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 1. Website Name / Domain */}
            <div className="glass-panel" style={{ padding: '1.8rem 2.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <label style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>1. Website Name / Campaign URL</span>
                  <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                {isAutoFetching && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} className="animate-spin" /> Auto-fetching brand metadata & favicon...
                  </span>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.8rem 1.1rem',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <Globe size={20} color="var(--accent-primary)" />
                <input
                  type="text"
                  required
                  placeholder="e.g. getseoo.com or https://mybrand.io"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value);
                    setAutoFetchedSuccess(false);
                  }}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)'
                  }}
                />
              </div>

              {/* Brand Name Input */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Brand / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GetSeoo"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 0.95rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Creator / Marketer Handle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @founder"
                    value={creatorHandle}
                    onChange={(e) => setCreatorHandle(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 0.95rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {autoFetchedSuccess && (
                <div style={{
                  marginTop: '0.9rem',
                  padding: '0.6rem 0.95rem',
                  background: 'rgba(201, 142, 214, 0.1)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(201, 142, 214, 0.25)',
                  fontSize: '0.85rem',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}>
                  <Sparkles size={15} />
                  <span>Auto-fetched brand favicon and headlines from domain!</span>
                </div>
              )}
            </div>

            {/* 2. Creative Selection (Single Category) */}
            <div className="glass-panel" style={{ padding: '1.8rem 2.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.6rem' }}>
                <label style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  2. Creative Format (Select 1)
                </label>
                <span style={{
                  fontSize: '0.825rem',
                  padding: '0.2rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(201, 142, 214, 0.15)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--accent-primary)',
                  fontWeight: 700
                }}>
                  100% Free
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.1rem' }}>
                Choose the primary marketing channel that best represents your campaign.
              </p>

              {/* Category Chips Multi-Selector */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {availableCategories.map(cat => {
                  const isSelected = selectedCategories.includes(cat.key);

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => toggleCategory(cat.key)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.1rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.925rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'rgba(201, 142, 214, 0.18)' : 'var(--bg-input)',
                        color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
                      <span>{cat.label}</span>
                      {isSelected ? (
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--accent-primary)',
                          color: '#fff'
                        }}>
                          ✓
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Direct Link to the Creative Asset */}
            <div className="glass-panel" style={{ padding: '1.8rem 2.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.6rem' }}>
                <label style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  3. Creative Asset Link (Direct URL)
                </label>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  X / TikTok / IG / YouTube / Web
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Paste the direct link to the marketing creative (e.g. viral X post, TikTok video, YouTube clip, or landing page).
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.8rem 1.1rem',
                gap: '0.75rem'
              }}>
                <Link2 size={20} color="var(--accent-primary)" />
                <input
                  type="text"
                  placeholder="e.g. https://x.com/username/status/123 or https://tiktok.com/@video/123"
                  value={assetLink}
                  onChange={(e) => setAssetLink(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)'
                  }}
                />
              </div>
            </div>

            {/* 4. Headline / Tactic Hook */}
            <div className="glass-panel" style={{ padding: '1.8rem 2.2rem' }}>
              <label style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                4. Marketing Tactic & Hook Headline
              </label>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.9rem' }}>
                Explain the specific marketing mechanism or customer acquisition tactic.
              </p>
              <input
                type="text"
                required
                placeholder="e.g. Turn Instagram Post Comments into Buyers with Automated DMs"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.8rem 1rem',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>

            {/* 5. Description / Case Study Breakdown */}
            <div className="glass-panel" style={{ padding: '1.8rem 2.2rem' }}>
              <label style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                5. Tactic Breakdown & Results Description
              </label>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.9rem' }}>
                Detail the strategy, hook angle, conversion funnel, or metrics achieved.
              </p>
              <textarea
                rows={4}
                placeholder="Describe the marketing angle, funnel steps, or creative testing structure that drove results..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  resize: 'vertical',
                  lineHeight: 1.55
                }}
              />
            </div>

            {/* Checkout & Submit Bar */}
            <button
              type="submit"
              disabled={isProcessing || !websiteUrl}
              className="btn btn-primary"
              style={{
                padding: '1.05rem 2rem',
                fontSize: '1.15rem',
                fontWeight: 900,
                borderRadius: 'var(--radius-full)',
                width: '100%',
                boxShadow: '0 6px 24px rgba(201, 142, 214, 0.45)'
              }}
            >
              {isProcessing ? (
                <span>Saving to database...</span>
              ) : (
                <span>Submit My Campaign — Free ✦</span>
              )}
            </button>
          </form>

          {/* Right Column: Live Mockup Card with Brand Favicon & Metrics */}
          <div style={{ position: 'sticky', top: '5.8rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Live Leaderboard Card Preview with Brand Favicon */}
            <div className="glass-panel" style={{ padding: '2rem 2.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Leaderboard Card Preview
                </span>
                <span style={{
                  fontSize: '0.825rem',
                  color: 'var(--accent-primary)',
                  background: 'rgba(201, 142, 214, 0.15)',
                  padding: '0.25rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700
                }}>
                  Rank #1 Preview
                </span>
              </div>

              {/* Rich Marketing Card Preview with Brand Favicon */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(201, 142, 214, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.65rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Brand Favicon / Logo Avatar */}
                    <div style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      position: 'relative'
                    }}>
                      <img 
                        src={activeFavicon} 
                        alt={brandName} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>

                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        {brandName || 'Brand Name'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {websiteUrl || 'domain.com'}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(201, 142, 214, 0.15)',
                    color: 'var(--accent-primary)',
                    fontSize: '0.925rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap'
                  }}>
                    <ArrowUp size={16} />
                    <span>Push Up</span>
                  </div>
                </div>

                {/* Tactic Headline */}
                <div style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  lineHeight: 1.4
                }}>
                  {headline || 'Marketing Tactic Hook'}
                </div>

                {/* Categories & Link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', fontSize: '0.9rem', paddingTop: '0.2rem' }}>
                  {selectedCategories.length > 0 && (
                    <span style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                      {selectedCategories[0]}
                    </span>
                  )}

                  {assetLink && (
                    <span style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                      <span>View Asset</span>
                      <ExternalLink size={14} />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Free Entry Confirmation */}
            <div className="glass-panel" style={{ padding: '1.65rem', textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.4rem', borderRadius: 'var(--radius-full)',
                background: 'rgba(201,142,214,0.15)', border: '1px solid rgba(201,142,214,0.3)',
                color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.1rem',
                marginBottom: '0.75rem'
              }}>
                ✦ 100% Free
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Your campaign is stored permanently. No credit card needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
