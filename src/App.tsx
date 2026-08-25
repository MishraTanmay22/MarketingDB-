import React from 'react';
import { ProductProvider, useProduct } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { LiveStatsBar } from './components/LiveStatsBar';
import { HeroClaim } from './components/HeroClaim';
import { LeaderboardList } from './components/LeaderboardList';
import { ProductGridView } from './components/ProductGridView';
import { SubmissionPage } from './components/SubmissionPage';
import { SuccessPage } from './components/SuccessPage';
import { AdvertisePage } from './components/AdvertisePage';
import { AdminPage } from './components/AdminPage';
import { MarketingProofSection } from './components/MarketingProofSection';
import { AdvertiseSection } from './components/AdvertiseSection';
import { ProductPreviewModal } from './components/ProductPreviewModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { viewMode, currentRoute } = useProduct();

  if (currentRoute === 'admin') {
    return <AdminPage />;
  }

  if (currentRoute === 'submit') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <SubmissionPage />
        </main>
        <Footer />
        <HowItWorksModal />
      </div>
    );
  }

  if (currentRoute === 'advertise') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AdvertisePage />
        </main>
        <Footer />
      </div>
    );
  }

  if (currentRoute === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <SuccessPage />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Navbar />
      <LiveStatsBar />

      {/* Floating Outer Left Sponsor Card (Visible on Desktop) */}
      <div className="desktop-left-sponsor">
        <AdvertiseSection />
      </div>

      <main style={{ flex: 1 }}>
        <HeroClaim />

        {/* Clean Centered Leaderboard */}
        <div className="app-container" style={{ maxWidth: '980px' }}>
          {viewMode === 'list' ? <LeaderboardList /> : <ProductGridView />}
        </div>

        {/* Social Proof Wall: From the people who took #1 */}
        <MarketingProofSection />
      </main>

      <Footer />

      {/* Modals */}
      <ProductPreviewModal />
      <HowItWorksModal />
    </div>
  );
};

export function App() {
  return (
    <ProductProvider>
      <MainContent />
    </ProductProvider>
  );
}

export default App;
