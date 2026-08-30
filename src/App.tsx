import React from 'react';
import { ProductProvider, useProduct } from './context/ProductContext';
import { usePageSeo } from './hooks/usePageSeo';
import { Navbar } from './components/Navbar';
import { LiveStatsBar } from './components/LiveStatsBar';
import { HeroClaim } from './components/HeroClaim';
import { LeaderboardList } from './components/LeaderboardList';
import { ProductGridView } from './components/ProductGridView';
import { SubmissionPage } from './components/SubmissionPage';
import { SuccessPage } from './components/SuccessPage';
import { AdvertisePage } from './components/AdvertisePage';
import { AdminPage } from './components/AdminPage';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { MarketingProofSection } from './components/MarketingProofSection';
import { FaqSection } from './components/FaqSection';
import { HireCreatorSection } from './components/HireCreatorSection';
import { PSeoKeywordPage } from './components/PSeoKeywordPage';
import { getKeywordBySlug } from './data/longTailKeywords';
import { AdvertiseSection } from './components/AdvertiseSection';
import { CategorySidebar } from './components/CategorySidebar';
import { ProductPreviewModal } from './components/ProductPreviewModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { viewMode, currentRoute, activeCategory } = useProduct();
  usePageSeo(currentRoute, activeCategory);

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const kwSlug = urlParams ? urlParams.get('kw') : null;
  const matchedKw = kwSlug ? getKeywordBySlug(kwSlug) : undefined;

  if (currentRoute === 'admin') {
    return <AdminPage />;
  }

  if (currentRoute === 'case-studies') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <CaseStudiesPage />
        </main>
        <Footer />
      </div>
    );
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

      {/* Floating Outer Right Categories Navigation (Visible on Desktop, non-sticky) */}
      <div className="desktop-right-categories">
        <CategorySidebar />
      </div>

      <main style={{ flex: 1 }}>
        {matchedKw ? (
          <PSeoKeywordPage keywordData={matchedKw} />
        ) : (
          <>
            <HeroClaim />

            {/* Clean Centered Leaderboard */}
            <div id="leaderboard-section" className="app-container" style={{ maxWidth: '980px' }}>
              {viewMode === 'list' ? <LeaderboardList /> : <ProductGridView />}
            </div>

            {/* Social Proof Wall: From the people who took #1 */}
            <MarketingProofSection />

            {/* SEO FAQ Section with Google FAQPage Schema */}
            <FaqSection />

            {/* Hire Creator / Work Together Section */}
            <HireCreatorSection />
          </>
        )}
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
