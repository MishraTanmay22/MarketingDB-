import React from 'react';
import { useProduct } from '../context/ProductContext';
import { X, Sparkles } from 'lucide-react';

export const HowItWorksModal: React.FC = () => {
  const { isHowItWorksOpen, setIsHowItWorksOpen, openSubmitModal } = useProduct();

  if (!isHowItWorksOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsHowItWorksOpen(false)}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
      >
        <button
          onClick={() => setIsHowItWorksOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-input)',
            border: 'none',
            color: 'var(--text-primary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-fire)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="#fff" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>
            How marketingdb.lol Works
          </h2>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
          The transparent, live leaderboard where top marketing campaigns, UGC, and ads compete for the #1 crown.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(201, 142, 214, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                Submit for Free
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Paste your campaign URL. Your campaign is listed permanently on marketingdb.lol. No credit card needed.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(201, 142, 214, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                Ranking Push Ups
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Anyone can push up your campaign. The higher your score, the higher you climb on the leaderboard.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(201, 142, 214, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                Own the #1 Crown
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                The #1 campaign holds the golden crown and captures the top spot across marketingdb.lol.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsHowItWorksOpen(false);
            openSubmitModal(null);
          }}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 800 }}
        >
          <span>Submit for Free</span>
        </button>
      </div>
    </div>
  );
};
