import React, { useState } from 'react';
import type { LongTailKeyword } from '../types';
import { generatePSeoContent } from '../data/pSeoContentGenerator';
import { INTENT_DESCRIPTIONS } from '../data/longTailKeywords';
import { useProduct } from '../context/ProductContext';
import { LeaderboardList } from './LeaderboardList';
import { ProductGridView } from './ProductGridView';
import { Globe, ArrowRight, CheckCircle, HelpCircle, ShieldCheck, User } from 'lucide-react';

interface Props {
  keywordData: LongTailKeyword;
}

export const PSeoKeywordPage: React.FC<Props> = ({ keywordData }) => {
  const { openSubmitModal, viewMode } = useProduct();
  const [urlInput, setUrlInput] = useState('');
  const content = generatePSeoContent(keywordData);
  const intentInfo = INTENT_DESCRIPTIONS[keywordData.intent];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openSubmitModal({
      id: '',
      name: '',
      tagline: '',
      description: '',
      url: urlInput,
      displayUrl: urlInput,
      logo: '',
      mediaType: 'url',
      creator: { name: '', handle: '', avatar: '' },
      submittedAt: ''
    });
  };

  return (
    <div className="pseo-keyword-page" style={{ paddingBottom: '60px' }}>
      {/* E-E-A-T & Header Container */}
      <section style={{ padding: '3rem 0 2rem', textAlign: 'center', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="app-container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          
          {/* Intent & Category Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: `${intentInfo.badgeColor}22`, border: `1px solid ${intentInfo.badgeColor}44`, color: intentInfo.badgeColor, fontSize: '0.8rem', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            <span>{intentInfo.label}</span>
            <span>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>Category: {keywordData.category}</span>
          </div>

          {/* Unique H1 Heading */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 900, lineHeight: '1.25', color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {content.h1}
          </h1>

          {/* Subheading */}
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
            {content.subheading}
          </p>

          {/* E-E-A-T Trust Signals Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '28px', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Verified Marketing Breakdown</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} color="var(--accent-primary)" />
              <span>By {content.author.name} ({content.author.handle})</span>
            </div>
            <span>•</span>
            <span>Updated: {content.lastUpdated}</span>
            <span>•</span>
            <span>{content.readTime}</span>
          </div>

          {/* Tool Submission Form */}
          <form onSubmit={handleQuickSubmit} className="quick-submit-form" style={{ maxWidth: '640px', margin: '0 auto 16px auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, width: '100%' }}>
              <Globe size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Enter your website or SaaS URL for a free Dofollow backlink..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
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
            <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
              <span>Submit for Free</span>
              <ArrowRight size={15} />
            </button>
          </form>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
            ✨ Includes direct high-authority Dofollow backlink & live leaderboard push ups
          </div>
        </div>
      </section>

      {/* Main Content & Takeaways Section */}
      <section style={{ padding: '40px 20px', background: 'var(--bg-primary)' }}>
        <div className="app-container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          
          <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '28px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Strategic Overview & SEO Backlink Authority
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem', marginBottom: '24px' }}>
              {content.contentParagraph}
            </p>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Key Strategy Takeaways
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {content.takeaways.map((point, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Ranked Campaign Leaderboard */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Matching Top-Ranked Campaigns
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Filter: "{keywordData.keyword}"
              </span>
            </div>
            {viewMode === 'list' ? <LeaderboardList /> : <ProductGridView />}
          </div>

          {/* Schema FAQ Section */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '28px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <HelpCircle size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {content.faqs.map((faq, idx) => (
                <div key={idx} style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Links: Related Long-Tail Keywords Grid */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Related Search Intent Topics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
              {content.relatedKeywords.map((rel, idx) => (
                <a
                  key={idx}
                  href={`/?kw=${rel.slug}`}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  → {rel.keyword}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
