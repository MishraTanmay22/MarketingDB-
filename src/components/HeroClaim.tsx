import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { ArrowRight, Globe } from 'lucide-react';
import type { Category } from '../types';

const CATEGORY_DIRECTORY_DATA: Record<Category, {
  overline: string;
  h1: string;
  subheading: string;
  placeholder: string;
  badge: string;
}> = {
  'all': {
    overline: '🚀 The #1 Marketing & SaaS Directory',
    h1: 'Promote & Rank Your Marketing Campaigns & SaaS Tools (100% Free Directory)',
    subheading: 'Promote your website, SaaS tool, or creative campaigns for free. Earn a permanent high-authority Dofollow backlink, drive organic referral traffic, and compete for the daily #1 crown.',
    placeholder: 'Enter your website or campaign URL (e.g. yourproduct.com)',
    badge: 'All'
  },
  'meta-ads': {
    overline: '📣 Promote Meta & Instagram Ad Campaigns',
    h1: 'Promote & Discover Top-Performing Meta & Instagram Ad Creatives',
    subheading: 'Promote your best-performing Meta ad creatives and swipe high-ROAS video hooks, carousel designs, and UGC ad frameworks ranked daily by media buyers.',
    placeholder: 'Enter your Meta ad link or campaign URL',
    badge: 'Meta Ads'
  },
  'landing-pages': {
    overline: '🌐 Promote SaaS Landing Pages & CRO',
    h1: 'Promote Your Landing Pages & Discover High-Converting SaaS Homepages',
    subheading: 'Promote your landing page to thousands of founders and marketers. Get a direct Dofollow backlink while exploring top-converting CRO layouts, hero hooks, and pricing matrices.',
    placeholder: 'Enter your landing page URL (e.g. yourbrand.com/landing)',
    badge: 'Landing Pages'
  },
  'ecom': {
    overline: '🛍️ Promote E-Commerce & Shopify Stores',
    h1: 'Promote Your E-Commerce Store & High-Converting Product Pages',
    subheading: 'Promote your Shopify store, DTC brand campaigns, and e-commerce product pages. Gain instant SEO backlinks, buyer traffic, and rank your store against top brands.',
    placeholder: 'Enter your Shopify store or product page URL',
    badge: 'Ecom Pages'
  },
  'dropshipping': {
    overline: '📦 Promote Dropshipping Winning Products',
    h1: 'Promote Your Dropshipping Store & Winning Product Creatives',
    subheading: 'Promote your dropshipping winning products, single-item landing pages, and viral video ads. Get permanent backlink power and showcase your highest-converting funnels.',
    placeholder: 'Enter your dropshipping product or store URL',
    badge: 'Dropshipping Pages'
  },
  'twitter-x': {
    overline: '𝕏 Promote X Posts & Growth Playbooks',
    h1: 'Promote Your X Posts, Viral Launch Threads & Build-in-Public Tactics',
    subheading: 'Promote your Twitter/X launch threads, viral breakdown tweets, and build-in-public milestones. Drive organic impressions, followers, and permanent backlinks to your profile.',
    placeholder: 'Enter your X tweet or thread URL (e.g. x.com/user/status/...)',
    badge: 'X Pages'
  },
  'fb-pages': {
    overline: '📘 Promote Facebook Pages & Posts',
    h1: 'Promote Your Facebook Pages, Viral Posts & Brand Campaigns',
    subheading: 'Promote your Facebook business pages, viral post creatives, and community campaigns. Index your brand on our live directory with direct Dofollow backlinks.',
    placeholder: 'Enter your Facebook page or video post URL',
    badge: 'FB Pages'
  },
  'slideshow': {
    overline: '🖼️ Promote Marketing Slideshows & Decks',
    h1: 'Promote & Swipe Viral Marketing Slideshows & Carousel Decks',
    subheading: 'Promote your PDF slide decks, LinkedIn carousels, and visual breakdowns ranked by community saves and shares with a permanent backlink.',
    placeholder: 'Enter your slideshow or carousel deck URL',
    badge: 'Slideshow'
  },
  'tiktok': {
    overline: '📱 Promote TikTok Ads & Viral UGC',
    h1: 'Promote Viral TikTok Ads & UGC Creative Playbooks',
    subheading: 'Promote your organic-looking TikTok ad creatives, sound frameworks, and high-retention UGC ads that drove millions in views and sales.',
    placeholder: 'Enter your TikTok video or ad creative URL',
    badge: 'TikTok'
  },
  'youtube': {
    overline: '▶️ Promote YouTube Marketing & Video Teardowns',
    h1: 'Promote & Discover Top YouTube Video Marketing & Creative Teardowns',
    subheading: 'Promote your long-form YouTube video breakdowns, sponsor integrations, and video sales letter (VSL) playbooks to thousands of marketers.',
    placeholder: 'Enter your YouTube video or channel URL',
    badge: 'YouTube'
  },
  'email': {
    overline: '💌 Promote Email Sequences & Newsletters',
    h1: 'Promote & Swipe High-Converting Email Marketing Sequences',
    subheading: 'Promote your SaaS welcome flows, retention newsletters, and cold email templates. Earn high-authority backlinks and subscriber traffic.',
    placeholder: 'Enter your email campaign or newsletter URL',
    badge: 'Email'
  },
  'copywriting': {
    overline: '✍️ Promote Copywriting & Value Propositions',
    h1: 'Promote & Swipe High-Converting Copywriting & Headline Hooks',
    subheading: 'Promote your magnetic headline hooks, benefit-driven value propositions, and objection-handling copy to growth copywriters worldwide.',
    placeholder: 'Enter your copywriting asset or sales page URL',
    badge: 'Copywriting'
  }
};

export const HeroClaim: React.FC = () => {
  const { 
    openSubmitModal, 
    activeCategory, 
    setActiveCategory 
  } = useProduct();

  const [campaignInput, setCampaignInput] = useState('');

  const currentData = CATEGORY_DIRECTORY_DATA[activeCategory] || CATEGORY_DIRECTORY_DATA['all'];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openSubmitModal({
      id: '',
      name: '',
      tagline: '',
      description: '',
      url: campaignInput,
      displayUrl: campaignInput,
      logo: '',
      mediaType: 'url',
      creator: { name: '', handle: '', avatar: '' },
      submittedAt: ''
    });
  };

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: '🚀' },
    { key: 'meta-ads', label: 'Meta Ads', icon: '📢' },
    { key: 'landing-pages', label: 'Landing Pages', icon: '🌐' },
    { key: 'ecom', label: 'Ecom Pages', icon: '🛍️' },
    { key: 'dropshipping', label: 'Dropshipping Pages', icon: '📦' },
    { key: 'twitter-x', label: 'X Pages', icon: '𝕏' },
    { key: 'fb-pages', label: 'FB Pages', icon: '📘' },
    { key: 'slideshow', label: 'Slideshow', icon: '🖼️' },
    { key: 'tiktok', label: 'TikTok', icon: '📱' },
    { key: 'youtube', label: 'YouTube', icon: '▶️' },
    { key: 'email', label: 'Email', icon: '💌' },
    { key: 'copywriting', label: 'Copywriting', icon: '✍️' }
  ];

  const handleCategorySelect = (key: Category) => {
    setActiveCategory(key);
    if (typeof window !== 'undefined') {
      const newUrl = key === 'all' ? window.location.pathname : `?category=${key}`;
      try { window.history.replaceState(null, '', newUrl); } catch {}
    }
  };

  return (
    <section style={{
      padding: '2.5rem 0 1.25rem',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="app-container" style={{ maxWidth: '1240px' }}>
        {/* Directory Overline Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.95rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(201, 142, 214, 0.12)',
          border: '1px solid rgba(201, 142, 214, 0.3)',
          color: 'var(--accent-primary)',
          fontSize: '0.8rem',
          fontWeight: 800,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          <span>{currentData.overline}</span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 3vw, 2.25rem)',
          fontWeight: 900,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          maxWidth: '940px',
          margin: '0 auto 0.85rem'
        }}>
          {currentData.h1}
        </h1>

        {/* Subheadline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          marginBottom: '1.5rem',
          maxWidth: '740px',
          margin: '0 auto 1.5rem'
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.025rem',
            lineHeight: 1.6,
            textAlign: 'center',
            margin: 0
          }}>
            {currentData.subheading}
          </p>
        </div>

        {/* Clean Input Bar Form */}
        <form
          onSubmit={handleQuickSubmit}
          className="quick-submit-form"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, width: '100%' }}>
            <Globe size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />

            {/* Text/URL Input */}
            <div style={{ flex: '1', minWidth: '160px' }}>
              <input
                type="text"
                placeholder={currentData.placeholder}
                value={campaignInput}
                onChange={(e) => setCampaignInput(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.9rem',
              flexShrink: 0
            }}
          >
            <span>Promote for Free</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Free Dofollow Perk Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          marginTop: '0.85rem',
          fontWeight: 600,
          flexWrap: 'wrap'
        }}>
          <span>✨ 100% Free forever</span>
          <span>•</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Direct Dofollow Backlink Included</span>
          <span>•</span>
          <span>Live Community Push Ups</span>
        </div>

        {/* Category Pills Filter */}
        <div className="hero-category-pills">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                style={{
                  padding: '0.38rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'rgba(201, 142, 214, 0.22)' : 'var(--bg-input)',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 10px rgba(201, 142, 214, 0.28)' : 'none',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(201, 142, 214, 0.4)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
