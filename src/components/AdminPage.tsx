import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { 
  fetchAllSponsorsForAdmin, 
  updateSponsorStatusInTurso, 
  deleteSponsorFromTurso,
  fetchAllWaitlistForAdmin,
  deleteCampaignFromTurso
} from '../services/tursoService';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  ExternalLink, 
  Copy, 
  Check, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Download, 
  Database, 
  Search,
  Sparkles,
  Users,
  Megaphone,
  Layers
} from 'lucide-react';

const ADMIN_EMAIL = 'tanmayatsaas@proton.me';
const ADMIN_PASS = 'Phonemobile22@';
const AUTH_SESSION_KEY = 'marketingdb_admin_auth_v1';

export const AdminPage: React.FC = () => {
  const { navigateTo, products, resetToDefaults } = useProduct();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data State
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'sponsors' | 'waitlist' | 'campaigns'>('sponsors');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && passInput === ADMIN_PASS) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch {}
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch {}
  };

  // Load Admin Data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sponsorData, waitlistData] = await Promise.all([
        fetchAllSponsorsForAdmin(),
        fetchAllWaitlistForAdmin()
      ]);
      setSponsors(sponsorData || []);
      setWaitlist(waitlistData || []);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Actions
  const handleStatusChange = async (id: string, newStatus: string) => {
    const ok = await updateSponsorStatusInTurso(id, newStatus);
    if (ok) {
      setSponsors(prev => prev.map(s => s.id === id ? { ...s, paidStatus: newStatus } : s));
    }
  };

  const handleDeleteSponsor = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete sponsor "${name}" from DB 2 and DB 1?`)) return;
    const ok = await deleteSponsorFromTurso(id);
    if (ok) {
      setSponsors(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDeleteCampaign = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete campaign "${name}" from the leaderboard?`)) return;
    const ok = await deleteCampaignFromTurso(id);
    if (ok) {
      resetToDefaults();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportWaitlistCsv = () => {
    if (!waitlist.length) return;
    const headers = 'Email,Source,Date\n';
    const rows = waitlist.map(w => `"${w.email}","${w.source || 'pro_access'}","${new Date(Number(w.createdAt) || Date.now()).toISOString()}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketingdb_waitlist_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 1. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--bg-primary)'
      }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'rgba(201, 142, 214, 0.18)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <Lock size={26} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 900,
            marginBottom: '0.35rem',
            color: 'var(--text-primary)'
          }}>
            MarketingDB Admin
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
            Protected Control Center. Enter authorized credentials to continue.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                Administrator Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@proton.me"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.7rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                Password / Master Key
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.7rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {authError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-full)',
                marginTop: '0.5rem'
              }}
            >
              Sign In to Control Center
            </button>
          </form>

          <button
            onClick={() => navigateTo('home')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.825rem',
              marginTop: '1.5rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Website</span>
          </button>
        </div>
      </div>
    );
  }

  // Filtered Sponsors
  const filteredSponsors = sponsors.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (s.name || '').toLowerCase().includes(q) || (s.email || '').toLowerCase().includes(q) || (s.url || '').toLowerCase().includes(q);
  });

  const pendingCount = sponsors.filter(s => s.paidStatus === 'pending').length;
  const approvedCount = sponsors.filter(s => s.paidStatus === 'approved').length;

  // 2. Authenticated Admin Dashboard
  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0 5rem', background: 'var(--bg-primary)' }}>
      <div className="app-container" style={{ maxWidth: '1280px' }}>
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--accent-primary)',
                color: '#1a0a2a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900
              }}>
                <ShieldCheck size={18} />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                MarketingDB Admin Control
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <span>Logged in as <strong>{ADMIN_EMAIL}</strong></span>
              <span>•</span>
              <span style={{ color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Database size={13} />
                <span>DB 1 & DB 2 Online</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <ArrowLeft size={15} />
              <span>Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <span>TOTAL SPONSOR ORDERS</span>
              <Megaphone size={16} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              {sponsors.length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stored in Turso DB 2 & DB 1</span>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <span>PENDING REVIEW (≤4H)</span>
              <Clock size={16} color="#eab308" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#eab308' }}>
              {pendingCount}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Awaiting moderation check</span>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <span>APPROVED & ACTIVE</span>
              <CheckCircle2 size={16} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--accent-green)' }}>
              {approvedCount}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified live sponsor placements</span>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <span>PRO WAITLIST LEADS</span>
              <Users size={16} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
              {waitlist.length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High-intent marketing signups</span>
          </div>
        </div>

        {/* Tab Selection Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveTab('sponsors')}
              style={{
                background: activeTab === 'sponsors' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'sponsors' ? '#1a0a2a' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Megaphone size={15} />
              <span>Sponsor Orders & Ads ({sponsors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('waitlist')}
              style={{
                background: activeTab === 'waitlist' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'waitlist' ? '#1a0a2a' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Users size={15} />
              <span>Pro Waitlist ({waitlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              style={{
                background: activeTab === 'campaigns' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'campaigns' ? '#1a0a2a' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Layers size={15} />
              <span>Submitted Campaigns ({products.length})</span>
            </button>
          </div>

          {activeTab === 'sponsors' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 0.9rem',
              width: '260px'
            }}>
              <Search size={15} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search sponsors, emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  width: '100%'
                }}
              />
            </div>
          )}

          {activeTab === 'waitlist' && (
            <button
              onClick={exportWaitlistCsv}
              style={{
                background: 'rgba(201, 142, 214, 0.18)',
                border: '1px solid rgba(201, 142, 214, 0.4)',
                color: 'var(--accent-primary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Tab 1: Sponsors & Ads Table */}
        {activeTab === 'sponsors' && (
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {isLoading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Loading sponsor orders from Turso DB 2...
              </div>
            ) : filteredSponsors.length === 0 ? (
              <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Megaphone size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
                <h3>No Sponsor Submissions Found</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  When someone enters their product details on the sponsor page, their complete record will appear here instantly.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(201, 142, 214, 0.08)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '1rem 1.25rem' }}>Product / Sponsor</th>
                      <th style={{ padding: '1rem' }}>Destination URL</th>
                      <th style={{ padding: '1rem' }}>Buyer Email</th>
                      <th style={{ padding: '1rem' }}>Date</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                      <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSponsors.map((s, idx) => {
                      const dateStr = s.createdAt ? new Date(Number(s.createdAt)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
                      const isApproved = s.paidStatus === 'approved';
                      const isPending = s.paidStatus === 'pending' || !s.paidStatus;

                      return (
                        <tr key={s.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s ease' }}>
                          {/* Product Info */}
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'var(--bg-input)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                {s.logo ? (
                                  <img src={s.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <Sparkles size={16} color="var(--accent-primary)" />
                                )}
                              </div>
                              <div>
                                <strong style={{ color: 'var(--text-primary)', fontSize: '0.925rem', display: 'block' }}>
                                  {s.name}
                                </strong>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.775rem', display: 'block', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {s.tagline || 'No tagline provided'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Direct URL */}
                          <td style={{ padding: '1rem' }}>
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--accent-primary)',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                fontWeight: 600,
                                maxWidth: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <span>{s.url?.replace(/^https?:\/\//, '')}</span>
                              <ExternalLink size={12} />
                            </a>
                          </td>

                          {/* Email with 1-click copy */}
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.825rem' }}>
                                {s.email || '—'}
                              </span>
                              {s.email && (
                                <button
                                  onClick={() => copyToClipboard(s.email, s.id)}
                                  title="Copy Email"
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: copiedId === s.id ? 'var(--accent-green)' : 'var(--text-muted)',
                                    padding: '2px'
                                  }}
                                >
                                  {copiedId === s.id ? <Check size={13} /> : <Copy size={13} />}
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Date */}
                          <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            {dateStr}
                          </td>

                          {/* Status Badge */}
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              background: isApproved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                              color: isApproved ? 'var(--accent-green)' : '#eab308'
                            }}>
                              {s.paidStatus || 'pending'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                              {isPending ? (
                                <button
                                  onClick={() => handleStatusChange(s.id, 'approved')}
                                  style={{
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    color: 'var(--accent-green)',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.785rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Approve Live
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(s.id, 'pending')}
                                  style={{
                                    background: 'rgba(234, 179, 8, 0.15)',
                                    border: '1px solid rgba(234, 179, 8, 0.3)',
                                    color: '#eab308',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.785rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Set Pending
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteSponsor(s.id, s.name)}
                                title="Delete Record"
                                style={{
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  border: '1px solid rgba(239, 68, 68, 0.25)',
                                  color: '#ef4444',
                                  padding: '0.35rem 0.55rem',
                                  borderRadius: 'var(--radius-sm)',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Pro Waitlist Table */}
        {activeTab === 'waitlist' && (
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {waitlist.length === 0 ? (
              <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Users size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
                <h3>No Waitlist Leads Yet</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  When visitors join the Pro Vault waitlist, their email addresses will be captured here in real-time.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(201, 142, 214, 0.08)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '1rem 1.25rem' }}>#</th>
                      <th style={{ padding: '1rem' }}>Subscriber Email</th>
                      <th style={{ padding: '1rem' }}>Source</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Signup Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((w, idx) => (
                      <tr key={w.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>{idx + 1}</td>
                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{w.email}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{w.source || 'Pro Access'}</td>
                        <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          {w.createdAt ? new Date(Number(w.createdAt)).toLocaleString() : 'Recent'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Campaigns Moderation */}
        {activeTab === 'campaigns' && (
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {products.length === 0 ? (
              <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Layers size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
                <h3>Leaderboard is Clean</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  No campaigns submitted yet.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(201, 142, 214, 0.08)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '1rem 1.25rem' }}>Campaign</th>
                      <th style={{ padding: '1rem' }}>Category</th>
                      <th style={{ padding: '1rem' }}>Push-Ups</th>
                      <th style={{ padding: '1rem' }}>Creator</th>
                      <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Moderate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, idx) => (
                      <tr key={p.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{p.name}</strong>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.775rem' }}>{p.tagline}</span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)' }}>
                            {p.category}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {p.votes || 1}
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                          {p.creator?.handle || p.creator?.name}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteCampaign(p.id, p.name)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#ef4444',
                              padding: '0.35rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              fontSize: '0.785rem',
                              fontWeight: 700
                            }}
                          >
                            <Trash2 size={12} />
                            <span>Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
