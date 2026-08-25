import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useProduct } from '../context/ProductContext';

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is MarketingDB and how does the directory work?',
    answer: 'MarketingDB is the live internet directory and leaderboard where SaaS founders, marketers, and brands submit their marketing campaigns, ad creatives, slideshows, landing pages, and growth tactics. Submissions are curated and permanently indexed with a free Dofollow backlink, competing on a live community leaderboard ranked by daily user push ups.'
  },
  {
    question: 'Is submitting to MarketingDB really 100% free with a Dofollow backlink?',
    answer: 'Yes! Submissions are completely free. Every approved submission gets a permanent direct HTML dofollow link to their website domain and marketing visual asset, helping improve organic search rankings and domain authority.'
  },
  {
    question: 'How do push ups and ranking cooldowns work?',
    answer: 'Any visitor can push up a marketing campaign to help it climb the leaderboard. To ensure 100% fair competition and prevent spam bots, votes are rate-limited to 1 push up per campaign every 24 hours per unique visitor.'
  },
  {
    question: 'What types of marketing assets and creatives can I submit?',
    answer: 'You can submit across 8 creative categories: Slideshows, Meta Ads, TikTok creatives, Tweet/X posts, YouTube breakdowns, Landing Pages, Email campaigns, and Copywriting teardowns. Simply paste your live URL or asset link.'
  },
  {
    question: 'How do I add the "Featured on MarketingDB" badge to my site?',
    answer: 'Once listed, you can grab an embeddable badge (available in dark, light, and gold rank #1 styles) from our embed tool or submission success page. Copy-paste the HTML or Markdown snippet directly onto your website footer, hero, or README for instant social proof.'
  },
  {
    question: 'How can I advertise or sponsor a spot on MarketingDB?',
    answer: 'You can book high-visibility sticky sponsor spots on our directory leaderboard. Sponsoring gives you prominent spotlight placement, custom taglines, and direct dofollow backlinks for your SaaS, product, or agency.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { navigateTo } = useProduct();

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  // Inject Schema.org FAQPage JSON-LD
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_ITEMS.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };

    let scriptTag = document.getElementById('faq-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      const existing = document.getElementById('faq-schema-jsonld');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <section 
      id="faq"
      style={{
        padding: '4.5rem 0 3.5rem',
        position: 'relative'
      }}
    >
      <div className="app-container" style={{ maxWidth: '860px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(201, 142, 214, 0.12)',
            border: '1px solid rgba(201, 142, 214, 0.25)',
            color: 'var(--accent-primary)',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            <HelpCircle size={14} />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: '0.65rem'
          }}>
            Everything You Need to Know About the Directory
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            Learn how directory submissions, Dofollow backlinks, and live ranking push ups work.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: isOpen ? '1px solid rgba(201, 142, 214, 0.4)' : '1px solid var(--border-subtle)',
                  background: isOpen ? 'var(--bg-card)' : 'var(--bg-card)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.025rem',
                    fontWeight: 700,
                    lineHeight: 1.4
                  }}>
                    {item.question}
                  </span>
                  <div style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: isOpen ? 'var(--accent-primary)' : 'var(--text-muted)',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.35rem',
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1rem',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Ready to showcase your product?
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              100% Free submission • Direct Dofollow backlink included
            </div>
          </div>

          <button
            onClick={() => {
              navigateTo('submit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 800
            }}
          >
            <span>Submit for Free</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
