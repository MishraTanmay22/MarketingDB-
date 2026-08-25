import React from 'react';
import { useProduct } from '../context/ProductContext';
import { Megaphone, ArrowRight, Flame, Sparkles, ExternalLink, Zap } from 'lucide-react';

export const AdvertiseSection: React.FC = () => {
  const { navigateTo } = useProduct();

  const slots = [
    {
      id: 1,
      label: 'Spot #1',
      price: 10,
      isAvailable: true,
      title: 'Advertise Here',
      tagline: 'Showcase your tool or agency.',
      badge: 'Available',
      badgeColor: '#eab308'
    },
    {
      id: 2,
      label: 'Spot #2',
      price: 10,
      isAvailable: true,
      title: 'Advertise Here',
      tagline: 'Showcase your tool or agency.',
      badge: 'Available',
      badgeColor: '#eab308'
    },
    {
      id: 3,
      label: 'Spot #3',
      isAvailable: false,
      title: 'Pdfs.lol',
      tagline: 'Simple, fast, and secure PDF tools for creators.',
      url: 'https://pdfs.lol',
      logo: 'https://www.google.com/s2/favicons?domain=pdfs.lol&sz=128',
      badge: 'Featured',
      badgeColor: 'var(--accent-primary)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {slots.map((slot) => {
        if (!slot.isAvailable && slot.url) {
          return (
            <div
              key={slot.id}
              className="glass-panel"
              style={{
                padding: '0.85rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid rgba(201, 142, 214, 0.75)',
                background: 'linear-gradient(180deg, rgba(201, 142, 214, 0.18) 0%, rgba(26, 23, 20, 0.95) 100%)',
                boxShadow: '0 4px 20px rgba(201, 142, 214, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(201, 142, 214, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 142, 214, 0.75)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 142, 214, 0.22)';
              }}
            >
              {/* Top Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--accent-primary)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  <Zap size={11} fill="var(--accent-primary)" />
                  <span>{slot.label}</span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.66rem',
                  color: '#ffffff',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #c98ed6 0%, #a855f7 100%)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 2px 8px rgba(201, 142, 214, 0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em'
                }}>
                  <span>Sponsor</span>
                </div>
              </div>

              {/* Title & Short Pitch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {slot.logo && (
                  <img
                    src={slot.logo}
                    alt={slot.title}
                    style={{ width: '22px', height: '22px', borderRadius: '4px', objectFit: 'contain', border: '1px solid rgba(201, 142, 214, 0.3)' }}
                  />
                )}
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.925rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  {slot.title}
                </h4>
              </div>

              <p style={{
                fontSize: '0.725rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.35,
                margin: 0
              }}>
                {slot.tagline}
              </p>

              {/* High Contrast Visit Button */}
              <a
                href={slot.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  width: '100%',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(201, 142, 214, 0.15)',
                  border: '1px solid rgba(201, 142, 214, 0.5)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.775rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-primary)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(201, 142, 214, 0.15)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Visit {slot.title}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          );
        }

        // Available Spot #1
        return (
          <div
            key={slot.id}
            className="glass-panel"
            style={{
              padding: '0.85rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              border: '1.5px dashed rgba(201, 142, 214, 0.55)',
              background: 'linear-gradient(180deg, rgba(201, 142, 214, 0.08) 0%, var(--bg-card) 100%)',
              boxShadow: '0 4px 15px rgba(201, 142, 214, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.55rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 22px rgba(201, 142, 214, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 142, 214, 0.55)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(201, 142, 214, 0.1)';
            }}
          >
            {/* Top Header Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: 'var(--accent-primary)',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                <Megaphone size={11} />
                <span>{slot.label}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.66rem',
                color: '#eab308',
                fontWeight: 700
              }}>
                <Flame size={10} fill="#eab308" />
                <span>Available</span>
              </div>
            </div>

            {/* Title & Short Pitch */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.885rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 0.15rem 0'
              }}>
                {slot.title}
              </h4>
              <p style={{
                fontSize: '0.725rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.3,
                margin: 0
              }}>
                {slot.tagline}
              </p>
            </div>

            {/* Micro Feature Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: 'var(--bg-input)',
              padding: '0.28rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.68rem',
              color: 'var(--text-secondary)'
            }}>
              <Sparkles size={10} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
              <span>Direct link & visual spotlight</span>
            </div>

            {/* High Contrast CTA Button */}
            <button
              onClick={() => {
                navigateTo('advertise');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                width: '100%',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #c98ed6 0%, #a855f7 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.775rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(201, 142, 214, 0.35)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span>Book Spot</span>
              <ArrowRight size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
