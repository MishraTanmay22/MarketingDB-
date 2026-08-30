import React, { useState, useMemo } from 'react';
import { LONG_TAIL_KEYWORDS, INTENT_DESCRIPTIONS, searchKeywords } from '../data/longTailKeywords';
import type { SearchIntent, Category } from '../types';
import { useProduct } from '../context/ProductContext';

export const SeoKeywordHub: React.FC = () => {
  const { setSearchQuery } = useProduct();
  const [selectedIntent, setSelectedIntent] = useState<SearchIntent | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 36;

  const filteredKeywords = useMemo(() => {
    return searchKeywords(searchTerm, selectedIntent, selectedCategory);
  }, [searchTerm, selectedIntent, selectedCategory]);

  const totalPages = Math.ceil(filteredKeywords.length / itemsPerPage);

  const paginatedKeywords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredKeywords.slice(start, start + itemsPerPage);
  }, [filteredKeywords, currentPage]);

  const handleKeywordClick = (kw: string) => {
    setSearchQuery(kw);
    const leaderboardEl = document.getElementById('leaderboard-section') || document.getElementById('root');
    if (leaderboardEl) {
      leaderboardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const intentCounts = useMemo(() => {
    const counts = { transactional: 0, informational: 0, commercial: 0, navigational: 0 };
    LONG_TAIL_KEYWORDS.forEach((item) => {
      if (counts[item.intent] !== undefined) {
        counts[item.intent]++;
      }
    });
    return counts;
  }, []);

  return (
    <section id="keywords" className="seo-keyword-hub-section" style={{ padding: '60px 20px', background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="app-container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
            <span>⚡ Programmatic SEO Engine</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#818cf8' }}></span>
            <span>1,000 Long-Tail Keywords Indexed</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Search Intent & Long-Tail Keyword Directory
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
            Explore 1,000+ intent-clustered long-tail keywords driving organic traffic, backlink discovery, and high-converting marketing campaigns on MarketingDB.
          </p>

          {/* Stats Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
            <div style={{ padding: '10px 18px', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>{intentCounts.transactional}</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Transactional Intent</span>
            </div>
            <div style={{ padding: '10px 18px', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3b82f6' }}>{intentCounts.informational}</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Informational Intent</span>
            </div>
            <div style={{ padding: '10px 18px', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#8b5cf6' }}>{intentCounts.commercial}</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Commercial Intent</span>
            </div>
            <div style={{ padding: '10px 18px', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>{intentCounts.navigational}</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Navigational Intent</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '30px' }}>
          
          {/* Search bar & Intent Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            
            {/* Search Input */}
            <div style={{ flex: '1 1 300px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search 1,000 long-tail keywords (e.g. meta ads, dofollow backlinks, CRO)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔍</span>
            </div>

            {/* Intent Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => { setSelectedIntent('all'); setCurrentPage(1); }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: selectedIntent === 'all' ? '1px solid #818cf8' : '1px solid transparent',
                  background: selectedIntent === 'all' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  color: selectedIntent === 'all' ? '#fff' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                All Intents ({LONG_TAIL_KEYWORDS.length})
              </button>

              {(['transactional', 'informational', 'commercial', 'navigational'] as SearchIntent[]).map((intent) => {
                const info = INTENT_DESCRIPTIONS[intent];
                const active = selectedIntent === intent;
                return (
                  <button
                    key={intent}
                    onClick={() => { setSelectedIntent(intent); setCurrentPage(1); }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: active ? `1px solid ${info.badgeColor}` : '1px solid transparent',
                      background: active ? `${info.badgeColor}33` : 'rgba(15, 23, 42, 0.6)',
                      color: active ? '#fff' : '#94a3b8',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: info.badgeColor }}></span>
                    {info.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intent description line if specific intent selected */}
          {selectedIntent !== 'all' && (
            <div style={{ fontSize: '0.85rem', color: INTENT_DESCRIPTIONS[selectedIntent].badgeColor, paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              💡 <strong>{INTENT_DESCRIPTIONS[selectedIntent].label}:</strong> {INTENT_DESCRIPTIONS[selectedIntent].description}
            </div>
          )}
        </div>

        {/* Keyword Grid Display */}
        {filteredKeywords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '16px' }}>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>No long-tail keywords matched your filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedIntent('all'); setSelectedCategory('all'); }}
              style={{ marginTop: '12px', padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {paginatedKeywords.map((item) => {
                const intentInfo = INTENT_DESCRIPTIONS[item.intent];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleKeywordClick(item.keyword)}
                    style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = intentInfo.badgeColor;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: `${intentInfo.badgeColor}22`, color: intentInfo.badgeColor, border: `1px solid ${intentInfo.badgeColor}44`, textTransform: 'uppercase' }}>
                          {item.intent}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                          {item.category}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f1f5f9', lineHeight: '1.4', margin: 0 }}>
                        "{item.keyword}"
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.78rem', color: '#94a3b8' }}>
                      <span>Vol: <strong style={{ color: '#cbd5e1' }}>{item.searchVolume}</strong></span>
                      <span>KD: <strong style={{ color: item.difficulty === 'Easy' ? '#10b981' : '#f59e0b' }}>{item.difficulty}</strong></span>
                      <span style={{ color: '#818cf8', fontWeight: 600 }}>Click to Search →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.2)',
                    color: currentPage === 1 ? '#475569' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Previous
                </button>

                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  Page <strong style={{ color: '#fff' }}>{currentPage}</strong> of <strong style={{ color: '#fff' }}>{totalPages}</strong> ({filteredKeywords.length} keywords)
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.2)',
                    color: currentPage === totalPages ? '#475569' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
