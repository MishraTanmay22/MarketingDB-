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
    navigateTo,
    openSubmitModal
  } = useProduct();

  const handleOpenSubmit = () => {
    openSubmitModal({
      id: '',
      name: '',
      tagline: '',
      description: '',
      url: '',
      displayUrl: '',
      logo: '',
      mediaType: 'url',
      creator: { name: '', handle: '', avatar: '' },
      submittedAt: ''
    });
  };

  return (
    <header className="site-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="app-container header-container">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            navigateTo('home'); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          className="nav-logo"
        >
          <div className="nav-logo-icon">
            <img 
              src="/logo.png" 
              alt="marketingdb" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div className="nav-logo-text">
            marketingdb<span style={{ color: 'var(--accent-primary)' }}>.lol</span>
          </div>
        </a>

        {/* Right Controls: Articles + Submit for Free + View Mode + Theme Toggle */}
        <div className="nav-actions">
          {/* Nav Links */}
          <button
            onClick={() => { navigateTo('case-studies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="nav-link-btn"
          >
            <span>Articles</span>
          </button>

          {/* Top Right 'Submit for Free' Button */}
          <button
            onClick={handleOpenSubmit}
            className="btn btn-primary"
            style={{
              padding: '0.45rem 1.05rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 10px rgba(201, 142, 214, 0.3)'
            }}
          >
            <span>+ Submit for Free</span>
          </button>

          {/* View mode toggle */}
          <div className="nav-view-mode-toggle">
            <button
              onClick={() => setViewMode('list')}
              title="List Leaderboard View"
              aria-label="Switch to List Leaderboard View"
              style={{
                background: viewMode === 'list' ? 'rgba(201, 142, 214, 0.2)' : 'transparent',
                color: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Switch to Grid View"
              style={{
                background: viewMode === 'grid' ? 'rgba(201, 142, 214, 0.2)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LayoutGrid size={15} />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary nav-theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun size={16} color="var(--accent-light)" />
            ) : (
              <Moon size={16} color="var(--accent-primary)" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
