import React, { useState } from 'react';
import { X, Check, Copy, Sparkles } from 'lucide-react';

interface EmbedBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  rank?: number;
}

export const EmbedBadgeModal: React.FC<EmbedBadgeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'gold'>('dark');
  const [copiedType, setCopiedType] = useState<'html' | 'markdown' | null>(null);

  if (!isOpen) return null;

  const badgeUrl = selectedTheme === 'gold'
    ? 'https://marketingdb.lol/badges/top1-gold.svg'
    : selectedTheme === 'light'
    ? 'https://marketingdb.lol/badges/featured-light.svg'
    : 'https://marketingdb.lol/badges/featured-dark.svg';

  const altText = selectedTheme === 'gold'
    ? `Ranked #1 on MarketingDB`
    : `Featured on MarketingDB Directory`;

  const htmlCode = `<a href="https://marketingdb.lol" target="_blank" rel="noopener">
  <img src="${badgeUrl}" alt="${altText}" width="220" height="54" style="width: 220px; height: 54px;" />
</a>`;

  const markdownCode = `[![${altText}](${badgeUrl})](https://marketingdb.lol)`;

  const handleCopy = (text: string, type: 'html' | 'markdown') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      <div 
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          animation: 'scaleUp 0.2s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--gradient-fire)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-primary)'
          }}>
            Embed Backlink Badge
          </h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Showcase your feature on your website footer, hero, or README. Includes a high-authority backlink.
        </p>

        {/* Theme Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {(['dark', 'light', 'gold'] as const).map(theme => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              style={{
                flex: 1,
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'capitalize',
                background: selectedTheme === theme ? 'rgba(201, 142, 214, 0.18)' : 'var(--bg-input)',
                border: selectedTheme === theme ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                color: selectedTheme === theme ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              {theme === 'gold' ? '👑 Rank #1 Gold' : `${theme} Badge`}
            </button>
          ))}
        </div>

        {/* Live Badge Preview Box */}
        <div style={{
          padding: '1.75rem',
          borderRadius: 'var(--radius-md)',
          background: selectedTheme === 'light' ? '#f3f4f6' : '#0a080d',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <img 
            src={badgeUrl.replace('https://marketingdb.lol', '')}
            alt={altText}
            style={{ width: '220px', height: '54px', display: 'block' }}
          />
        </div>

        {/* HTML Embed Code */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              HTML Embed Code
            </span>
            <button
              onClick={() => handleCopy(htmlCode, 'html')}
              style={{
                background: 'transparent',
                border: 'none',
                color: copiedType === 'html' ? 'var(--accent-green)' : 'var(--accent-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {copiedType === 'html' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedType === 'html' ? 'Copied HTML!' : 'Copy HTML'}</span>
            </button>
          </div>
          <pre style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.775rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            margin: 0
          }}>
            {htmlCode}
          </pre>
        </div>

        {/* Markdown Embed Code */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Markdown (for GitHub / README)
            </span>
            <button
              onClick={() => handleCopy(markdownCode, 'markdown')}
              style={{
                background: 'transparent',
                border: 'none',
                color: copiedType === 'markdown' ? 'var(--accent-green)' : 'var(--accent-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {copiedType === 'markdown' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedType === 'markdown' ? 'Copied Markdown!' : 'Copy Markdown'}</span>
            </button>
          </div>
          <pre style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.775rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            margin: 0
          }}>
            {markdownCode}
          </pre>
        </div>
      </div>
    </div>
  );
};
