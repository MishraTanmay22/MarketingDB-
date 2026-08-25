import React, { useState } from 'react';
import { X, Shield, FileText, Cookie, AlertCircle, CheckCircle2 } from 'lucide-react';

export type LegalTab = 'terms' | 'privacy' | 'cookies' | 'dmca';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      padding: '1.25rem'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '780px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-nav)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shield size={20} color="var(--accent-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800 }}>
              Legal, Privacy & Compliance
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.75rem',
          background: 'var(--bg-input)',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('terms')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'terms' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              background: activeTab === 'terms' ? 'rgba(201, 142, 214, 0.18)' : 'transparent',
              color: activeTab === 'terms' ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            <FileText size={14} />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'privacy' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              background: activeTab === 'privacy' ? 'rgba(201, 142, 214, 0.18)' : 'transparent',
              color: activeTab === 'privacy' ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            <Shield size={14} />
            <span>Privacy Policy (GDPR/CCPA/PIPEDA)</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'cookies' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              background: activeTab === 'cookies' ? 'rgba(201, 142, 214, 0.18)' : 'transparent',
              color: activeTab === 'cookies' ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            <Cookie size={14} />
            <span>Cookie & Storage Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('dmca')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'dmca' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              background: activeTab === 'dmca' ? 'rgba(201, 142, 214, 0.18)' : 'transparent',
              color: activeTab === 'dmca' ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            <AlertCircle size={14} />
            <span>DMCA & Takedowns</span>
          </button>
        </div>

        {/* Content Body */}
        <div style={{
          padding: '1.75rem',
          overflowY: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {activeTab === 'terms' && (
            <>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  1. Terms of Service
                </h4>
                <p>
                  Welcome to <strong>marketingdb.lol</strong>. By accessing or using our directory platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  2. User Submissions & Marketing Content
                </h5>
                <p>
                  marketingdb.lol allows users and creators to submit links and summaries of publicly accessible marketing campaigns, ads, UGC, copywriting, and growth tactics. By submitting content, you represent and warrant that the material is non-infringing, does not violate any third-party rights, and does not contain unlawful, harassing, or deceptive materials.
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  3. Community Push Ups & Fair Use
                </h5>
                <p>
                  Push ups (upvotes) are limited to 1 push up per campaign per IP address every 24 hours. Automated botting, script abuse, or manipulative vote spamming is strictly prohibited and subject to immediate IP blacklisting and campaign removal.
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  4. Disclaimer of Warranty & Limitation of Liability
                </h5>
                <p>
                  marketingdb.lol is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. We do not guarantee continuous uptime or the accuracy of third-party creative links listed on the platform.
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  5. Governing Law
                </h5>
                <p>
                  These terms are drafted in compliance with global standards, including applicable European Union regulations, US Federal and State laws, and Canadian statutory provisions.
                </p>
              </div>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Global Privacy Policy (GDPR, CCPA/CPRA & PIPEDA Compliant)
                </h4>
                <p>
                  Your privacy is a fundamental priority. We adhere to the EU General Data Protection Regulation (<strong>GDPR</strong>), California Consumer Privacy Act (<strong>CCPA/CPRA</strong>), and Canadian Personal Information Protection and Electronic Documents Act (<strong>PIPEDA</strong>).
                </p>
              </div>

              <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Zero Sale of Personal Data</span>
                </div>
                <p style={{ fontSize: '0.825rem', margin: 0 }}>
                  We <strong>never sell, rent, or trade</strong> your personal information or browsing data to any third parties or advertising networks.
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Information We Collect
                </h5>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>Hashed IP Addresses:</strong> Collected strictly for 24-hour rate limiting and anti-spam verification when voting.</li>
                  <li><strong>Public Campaign Metadata:</strong> Website URL, brand name, creative links, and headlines submitted voluntarily for directory indexing.</li>
                </ul>
              </div>

              <div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Your Rights (Access, Deletion & Portability)
                </h5>
                <p>
                  Under GDPR and CCPA, you have the right to request access to, correction of, or permanent deletion of any data associated with your submissions. To exercise your rights, email our data privacy officer at <a href="mailto:contact@marketingdb.lol" style={{ color: 'var(--accent-primary)' }}>contact@marketingdb.lol</a> or <a href="mailto:tanmio0xx@proton.me" style={{ color: 'var(--accent-primary)' }}>tanmio0xx@proton.me</a>.
                </p>
              </div>
            </>
          )}

          {activeTab === 'cookies' && (
            <>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Cookie & Local Storage Policy
                </h4>
                <p>
                  marketingdb.lol utilizes <strong>strict minimal essential client storage</strong> (Browser LocalStorage) solely to ensure basic platform functionality:
                </p>
              </div>

              <div>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong>Theme Preferences:</strong> Remembers your light/dark mode selection.</li>
                  <li><strong>Audio Preferences:</strong> Stores whether celebration sound effects are toggled on or off.</li>
                  <li><strong>24-Hour Push Up Timestamps:</strong> Temporarily caches your push up cooldown timers locally to prevent duplicate requests.</li>
                </ul>
              </div>

              <p>
                We <strong>do not use tracking cookies</strong> or invasive third-party cross-site trackers.
              </p>
            </>
          )}

          {activeTab === 'dmca' && (
            <>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  DMCA & Copyright Takedown Procedure
                </h4>
                <p>
                  marketingdb.lol respects the intellectual property of creators, marketers, and brands. If you are a copyright owner and believe that any visual asset link or material indexed on our site infringes upon your copyright, please submit a notice with:
                </p>
              </div>

              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The specific URL or campaign name on marketingdb.lol.</li>
                <li>Your contact information (name, email address, physical address).</li>
                <li>A statement confirming your good-faith belief that the use is unauthorized.</li>
              </ol>

              <div style={{ marginTop: '0.5rem' }}>
                <p>
                  Send DMCA takedown requests directly to: <br />
                  📧 <a href="mailto:contact@marketingdb.lol" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>contact@marketingdb.lol</a> / <a href="mailto:tanmio0xx@proton.me" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>tanmio0xx@proton.me</a>
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Requests are typically reviewed and resolved within 24 to 48 business hours.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '1rem 1.75rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-nav)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Last updated: August 2026 • Global Standard Compliant
          </span>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{
              padding: '0.45rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-full)'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
