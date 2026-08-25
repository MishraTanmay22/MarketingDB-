import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { fetchPublishedArticlesFromTurso } from '../services/tursoService';
import { 
  ArrowLeft, 
  BookOpen, 
  ExternalLink, 
  Clock, 
  Calendar, 
  ArrowRight,
  Share2,
  Check,
  Mail
} from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const { navigateTo } = useProduct();
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      try {
        const data = await fetchPublishedArticlesFromTurso();
        setArticles(data || []);
      } catch (err) {
        console.warn('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Full Medium-Style Single Article Reader View
  if (selectedArticle) {
    return (
      <div style={{ minHeight: '100vh', padding: '2.5rem 0 6rem', background: 'var(--bg-primary)' }}>
        <div className="app-container" style={{ maxWidth: '780px' }}>
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              marginBottom: '2rem',
              padding: 0
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </button>

          {/* Category & Read Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(201, 142, 214, 0.18)',
              color: 'var(--accent-primary)'
            }}>
              {selectedArticle.category || 'Article'}
            </span>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={13} />
              <span>{selectedArticle.readTime || '5 min read'}</span>
            </span>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} />
              <span>{selectedArticle.createdAt ? new Date(Number(selectedArticle.createdAt)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
            </span>
          </div>

          {/* Article Main Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            {selectedArticle.title}
          </h1>

          {/* Subtitle / Lede */}
          {selectedArticle.subtitle && (
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '1.75rem',
              fontStyle: 'italic'
            }}>
              {selectedArticle.subtitle}
            </p>
          )}

          {/* Brand Attribution & Share */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {selectedArticle.brandLogo ? (
                <img
                  src={selectedArticle.brandLogo}
                  alt={selectedArticle.brandName}
                  style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#1a0a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                  {selectedArticle.brandName ? selectedArticle.brandName[0] : 'M'}
                </div>
              )}
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', display: 'block' }}>
                  {selectedArticle.brandName || 'MarketingDB Growth Lab'}
                </strong>
                {selectedArticle.brandUrl && (
                  <a
                    href={selectedArticle.brandUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>{selectedArticle.brandUrl.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={handleShare}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              {copiedLink ? <Check size={14} color="var(--accent-green)" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Cover Image */}
          {selectedArticle.coverImage && (
            <div style={{ marginBottom: '2.5rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img
                src={selectedArticle.coverImage}
                alt=""
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Medium-Style Article Body Typography */}
          <div style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-line',
            fontFamily: 'var(--font-sans)',
            marginBottom: '4rem'
          }}>
            {selectedArticle.content}
          </div>

          {/* Bottom Sponsor Banner */}
          <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(201, 142, 214, 0.15) 0%, rgba(168, 85, 247, 0.08) 100%)',
            border: '1px solid rgba(201, 142, 214, 0.4)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
              Want Your Product Featured in a Teardown?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              We craft deep-dive articles for our featured partners and spotlight sponsors.
            </p>
            <button
              onClick={() => { navigateTo('advertise'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', fontWeight: 800 }}
            >
              <span>Get Featured</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Articles List / Index Page
  return (
    <div style={{ minHeight: '100vh', padding: '2.5rem 0 6rem', background: 'var(--bg-primary)' }}>
      <div className="app-container" style={{ maxWidth: '1040px' }}>
        {/* Navigation Back */}
        <button
          onClick={() => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            marginBottom: '2rem',
            padding: 0
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Leaderboard</span>
        </button>

        {/* Live Articles / Empty State */}
        {isLoading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="glass-panel" style={{
            padding: '4rem 2rem',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <BookOpen size={42} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Get Custom Articles
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Get custom teardowns and deep-dive marketing articles breakdown for your brand and campaigns.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="mailto:tanmio0xx@proton.me?subject=Custom%20Article%20/%20Case%20Study%20Inquiry&body=Hi%20Tanmay,%0A%0AI'm%20interested%20in%20a%20custom%20marketing%20article%20breakdown%20for%20my%20product/brand:%0A%0A-%20Product%20URL:%20%0A-%20Key%20Growth%20Goals:%20"
                className="btn btn-primary"
                style={{
                  padding: '0.65rem 1.45rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Mail size={16} />
                <span>Mail Us</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => { setSelectedArticle(article); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {article.brandLogo ? (
                      <img
                        src={article.brandLogo}
                        alt=""
                        style={{ width: '26px', height: '26px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                    ) : null}
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {article.brandName || 'Article'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(201, 142, 214, 0.12)',
                      color: 'var(--accent-primary)'
                    }}>
                      {article.category || 'Growth'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {article.readTime || '5 min read'}
                    </span>
                  </div>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  marginBottom: '0.65rem',
                  lineHeight: 1.3
                }}>
                  {article.title}
                </h2>

                {article.subtitle && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {article.subtitle}
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
