import React from 'react';
import { useProduct } from '../context/ProductContext';
import { 
  LayoutGrid,
  List,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    viewMode,
    setViewMode,
    theme,
    toggleTheme,
    navigateTo
  } = useProduct();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.8rem',
        gap: '1.25rem'
      }}>
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            navigateTo('home'); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '2.85rem',
            height: '2.85rem',
            borderRadius: '0.9rem',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(201, 142, 214, 0.25) 0%, rgba(26, 23, 20, 0.8) 100%)',
            border: '1px solid rgba(201, 142, 214, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(201, 142, 214, 0.35)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <img 
              src="/logo.png" 
              alt="marketingdb" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}>
              marketingdb<span style={{ color: 'var(--accent-primary)' }}>.lol</span>
            </div>
          </div>
        </a>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => { navigateTo('case-studies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 700,
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(201, 142, 214, 0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <span>Case Studies</span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              padding: '0.1rem 0.4rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(201, 142, 214, 0.2)',
              color: 'var(--accent-primary)',
              textTransform: 'uppercase'
            }}>
              Pro
            </span>
          </button>
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* View mode toggle */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '3px'
          }}>
            <button
              onClick={() => setViewMode('list')}
              title="List Leaderboard View"
              aria-label="Switch to List Leaderboard View"
              style={{
                background: viewMode === 'list' ? 'rgba(201, 142, 214, 0.2)' : 'transparent',
                color: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                padding: '0.4rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Switch to Grid View"
              style={{
                background: viewMode === 'grid' ? 'rgba(201, 142, 214, 0.2)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                padding: '0.4rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{ padding: '0.55rem', borderRadius: '50%' }}
            aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun size={17} color="var(--accent-light)" />
            ) : (
              <Moon size={17} color="var(--accent-primary)" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
