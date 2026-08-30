import React from 'react';
import { useProduct } from '../context/ProductContext';
import type { Category } from '../types';

const CATEGORY_DIRECTORY_DATA: Record<Category, {
  overline: string;
  h1: string;
  subheading: string;
  placeholder: string;
  badge: string;
}> = {
  'all': {
    overline: '🚀 #1 Directory for Shopify, Ecom, WooCommerce & SaaS Brands',
    h1: 'Submit & Promote Your Shopify Store, E-Commerce Site, WooCommerce Brand & X Pages for Free Dofollow Backlinks',
    subheading: 'Index your Shopify store, WooCommerce brand, X pages & SaaS tools on Google. Claim high-authority Dofollow SEO backlinks & drive organic buyer traffic.',
    placeholder: 'Enter your Shopify store, WooCommerce site, X page, or SaaS URL...',
    badge: 'All'
  },
  'meta-ads': {
    overline: '📢 Meta & Facebook Ad Creative Swipe File',
    h1: 'Submit Meta Ads & Discover High-ROAS Facebook Video Hooks & Ad Creatives',
    subheading: 'Promote your Meta ad creatives and swipe top-performing Facebook video hooks, UGC ad scripts, and carousel designs ranked daily by media buyers.',
    placeholder: 'Enter your Meta ad link or Facebook video URL',
    badge: 'Meta Ads'
  },
  'landing-pages': {
    overline: '🌐 SaaS Landing Page Directory & CRO Teardowns',
    h1: 'Submit SaaS Landing Pages & Discover High-Converting Homepage CRO Layouts',
    subheading: 'Promote your landing page for direct Dofollow backlinks while swiping proven B2B SaaS hero hooks, pricing matrices, and conversion rate optimization teardowns.',
    placeholder: 'Enter your landing page URL (e.g. yourbrand.com/landing)',
    badge: 'Landing Pages'
  },
  'ecom': {
    overline: '🛍️ E-Commerce & Shopify Brand Directory',
    h1: 'Promote E-Commerce & Shopify Stores for Free Dofollow Backlinks & Traffic',
    subheading: 'List your Shopify store, DTC brand campaigns, and e-commerce product pages on our high-authority directory to rank on search engines.',
    placeholder: 'Enter your Shopify store or product page URL',
    badge: 'Ecom Pages'
  },
  'dropshipping': {
    overline: '📦 Dropshipping Winning Product Directory',
    h1: 'Promote Dropshipping Stores & Discover Winning Product Video Ads',
    subheading: 'Index your single-item product pages, dropshipping video ads, and high-converting sales funnels with permanent Dofollow SEO backlinks.',
    placeholder: 'Enter your dropshipping product or store URL',
    badge: 'Dropshipping Pages'
  },
  'twitter-x': {
    overline: '𝕏 Viral Twitter & X Growth Playbooks',
    h1: 'Promote X Launch Threads & Build-in-Public Marketing Tactics',
    subheading: 'Promote your Twitter/X launch threads and SaaS growth teardowns to gain organic impressions, followers, and permanent profile backlinks.',
    placeholder: 'Enter your X tweet or thread URL (e.g. x.com/user/status/...)',
    badge: 'X Pages'
  },
  'fb-pages': {
    overline: '📘 Facebook Business & Ad Campaign Index',
    h1: 'Promote Facebook Pages, Viral Video Posts & Ad Creatives for SEO',
    subheading: 'Index your Facebook business pages, viral post creatives, and community campaigns with direct Dofollow backlinks and community votes.',
    placeholder: 'Enter your Facebook page or video post URL',
    badge: 'FB Pages'
  },
  'slideshow': {
    overline: '🖼️ PDF Slideshows & Carousel Deck Swipe File',
    h1: 'Promote PDF Slide Decks & Swipe LinkedIn Carousel Marketing Tactics',
    subheading: 'Promote your PDF slide decks, LinkedIn carousels, and visual breakdowns ranked by community saves and shares with a permanent backlink.',
    placeholder: 'Enter your slideshow or carousel deck URL',
    badge: 'Slideshow'
  },
  'tiktok': {
    overline: '📱 TikTok Ad Creative & UGC Video Directory',
    h1: 'Promote Viral TikTok Ads & Swipe UGC Creative Hook Scripts',
    subheading: 'Promote your organic-looking TikTok ad creatives, sound frameworks, and high-retention UGC ads that drove millions in views and sales.',
    placeholder: 'Enter your TikTok video or ad creative URL',
    badge: 'TikTok'
  },
  'youtube': {
    overline: '▶️ YouTube Marketing & Video Teardown Directory',
    h1: 'Promote YouTube Marketing Videos & Long-Form VSL Teardowns',
    subheading: 'Promote your long-form YouTube video breakdowns, sponsor integrations, and video sales letter (VSL) playbooks to thousands of marketers.',
    placeholder: 'Enter your YouTube video or channel URL',
    badge: 'YouTube'
  },
  'email': {
    overline: '💌 SaaS Email Funnels & Newsletter Directory',
    h1: 'Promote Email Marketing Funnels & Swipe SaaS Onboarding Sequences',
    subheading: 'Promote your SaaS welcome flows, retention newsletters, and cold email templates. Earn high-authority backlinks and subscriber traffic.',
    placeholder: 'Enter your email campaign or newsletter URL',
    badge: 'Email'
  },
  'copywriting': {
    overline: '✍️ Headline Hooks & Copywriting Swipe Archive',
    h1: 'Promote Copywriting Assets & Swipe Magnetic Headline Hooks',
    subheading: 'Promote your magnetic headline hooks, benefit-driven value propositions, and objection-handling copy to growth copywriters worldwide.',
    placeholder: 'Enter your copywriting asset or sales page URL',
    badge: 'Copywriting'
  }
};

export const HeroClaim: React.FC = () => {
  const { 
    activeCategory, 
    setActiveCategory 
  } = useProduct();

  const currentData = CATEGORY_DIRECTORY_DATA[activeCategory] || CATEGORY_DIRECTORY_DATA['all'];

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: 'all', label: 'All Sites & Tools', icon: '🚀' },
    { key: 'ecom', label: 'Shopify & Ecom', icon: '🛍️' },
    { key: 'dropshipping', label: 'WooCommerce & Dropship', icon: '📦' },
    { key: 'landing-pages', label: 'SaaS Landing Pages', icon: '🌐' },
    { key: 'meta-ads', label: 'Meta & Facebook Ads', icon: '📢' },
    { key: 'twitter-x', label: 'X & Twitter Pages', icon: '𝕏' },
    { key: 'tiktok', label: 'TikTok UGC Ads', icon: '📱' },
    { key: 'fb-pages', label: 'Facebook Pages', icon: '📘' },
    { key: 'slideshow', label: 'PDF Slideshows', icon: '🖼️' },
    { key: 'youtube', label: 'YouTube Marketing', icon: '▶️' },
    { key: 'email', label: 'Email Funnels', icon: '💌' },
    { key: 'copywriting', label: 'Copywriting Hooks', icon: '✍️' }
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
