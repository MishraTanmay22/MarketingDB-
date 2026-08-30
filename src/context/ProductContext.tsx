import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { ProductItem, Category, Timeframe, ViewMode, ActivityLog, PageRoute, AssetMetrics } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ACTIVITIES, parseProductUrl } from '../utils/productHelper';
import { playCoinSound, playCrownSound, playUpvoteSound, playClickSound } from '../utils/sound';
import { 
  initTursoDatabases, 
  fetchCampaignsFromTurso, 
  fetchActivitiesFromTurso, 
  saveCampaignToTurso, 
  recordClickInTurso, 
  saveActivityToTurso,
  getVoterId,
  recordVote24hInTurso,
  fetchUserVotes24hFromTurso
} from '../services/tursoService';

export type Theme = 'dark' | 'light';

interface ProductContextType {
  products: ProductItem[];
  sortedProducts: ProductItem[];
  topProduct: ProductItem | null;
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  timeframe: Timeframe;
  setTimeframe: (t: Timeframe) => void;
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  
  // Navigation Routing
  currentRoute: PageRoute;
  navigateTo: (route: PageRoute, prefill?: Partial<ProductItem> | null) => void;
  prefillData: Partial<ProductItem> | null;

  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Modals & Active
  selectedProductForOutbid: ProductItem | null;
  openSubmitModal: (prefill?: Partial<ProductItem> | null) => void;
  closeSubmitModal: () => void;
  
  activePreviewProduct: ProductItem | null;
  openProductPreview: (product: ProductItem) => void;
  closeProductPreview: () => void;

  isHowItWorksOpen: boolean;
  setIsHowItWorksOpen: (open: boolean) => void;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;

  // Real Metrics only
  totalProductsCount: number;
  totalVotesCount: number;
  totalClicks: number;
  activities: ActivityLog[];

  // Actions
  submitCampaign: (data: {
    productUrl: string;
    name: string;
    tagline: string;
    description: string;
    creatorName: string;
    creatorHandle: string;
    category: Category;
    categories?: Category[];
    assetLink?: string;
    metrics?: AssetMetrics;
    tactic?: string;
    sponsorLink?: string;
    mediaType?: 'url' | 'image' | 'video';
    mediaData?: string;
    targetProductId?: string;
  }) => { success: boolean; newRank: number; totalFee: number };

  upvoteProduct: (id: string) => void;
  hasVotedToday: (id: string) => boolean;
  recordClick: (id: string) => void;
  resetToDefaults: () => void;

  // Last submitted campaign (for success page)
  lastSubmittedProduct: ProductItem | null;
  lastSubmittedRank: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'marketingdb_v8_creative_items';
const STORAGE_KEY_SOUND = 'marketingdb_v8_sound';
const STORAGE_KEY_THEME = 'marketingdb_v8_theme';
const STORAGE_KEY_ACTIVITIES = 'marketingdb_v8_activities';
const STORAGE_KEY_VOTES = 'marketingdb_v8_voted_map';
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

// Clear stale test data
try { 
  localStorage.removeItem('marketingdb_v5_creative_items');
  localStorage.removeItem('marketingdb_v5_activities');
  localStorage.removeItem('marketingdb_v6_creative_items');
  localStorage.removeItem('marketingdb_v6_activities');
  localStorage.removeItem('marketingdb_v7_creative_items');
  localStorage.removeItem('marketingdb_v7_activities');
  localStorage.removeItem('marketingdb_v7_voted_map');
} catch {}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_ACTIVITIES;
  });

  const [votedMap, setVotedMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOTES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {};
  });

  const hasVotedToday = (campaignId: string): boolean => {
    const lastVotedAt = votedMap[campaignId];
    if (!lastVotedAt) return false;
    return Date.now() - lastVotedAt < TWENTY_FOUR_HOURS_MS;
  };

  // Sync with Turso on mount
  useEffect(() => {
    async function syncTurso() {
      await initTursoDatabases();
      const remoteCampaigns = await fetchCampaignsFromTurso();
      setProducts(remoteCampaigns || []);
      
      const remoteActivities = await fetchActivitiesFromTurso();
      setActivities(remoteActivities || []);

      const voterId = await getVoterId();
      const remoteVotes = await fetchUserVotes24hFromTurso(voterId);
      if (remoteVotes && Object.keys(remoteVotes).length > 0) {
        setVotedMap(prev => {
          const merged = { ...prev, ...remoteVotes };
          try { localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(merged)); } catch {}
          return merged;
        });
      }
    }
    syncTurso();
  }, []);

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {}
    return 'light';
  });

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      // Secret Admin Access only for Tanmay
      if (hash === '#tanm-control' || hash === '#admin-tanm-22' || search.includes('key=tanm22')) {
        return 'admin';
      }
      // If someone types /admin directly without secret, redirect to home
      if (path.includes('/admin')) {
        try { window.history.replaceState(null, '', '/'); } catch {}
        return 'home';
      }

      if (path.includes('/case-studies') || hash === '#case-studies') return 'case-studies';
      if (path.includes('/submit') || hash === '#submit') return 'submit';
      if (path.includes('/advertise') || hash === '#advertise') return 'advertise';
      if (path.includes('/success') || hash === '#success') return 'success';
    }
    return 'home';
  });

  // Listen for browser URL changes & secret shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (hash === '#tanm-control' || hash === '#admin-tanm-22' || search.includes('key=tanm22')) {
        setCurrentRoute('admin');
      } else if (path.includes('/admin')) {
        try { window.history.replaceState(null, '', '/'); } catch {}
        setCurrentRoute('home');
      } else if (path.includes('/case-studies') || hash === '#case-studies') {
        setCurrentRoute('case-studies');
      } else if (path.includes('/submit') || hash === '#submit') {
        setCurrentRoute('submit');
      } else if (path.includes('/advertise') || hash === '#advertise') {
        setCurrentRoute('advertise');
      } else if (path.includes('/success') || hash === '#success') {
        setCurrentRoute('success');
      } else {
        setCurrentRoute('home');
      }
    };

    // Secret Key Combination: Ctrl+Shift+A (or Cmd+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentRoute(prev => prev === 'admin' ? 'home' : 'admin');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [prefillData, setPrefillData] = useState<Partial<ProductItem> | null>(null);

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<Timeframe>('top');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const [selectedProductForOutbid, setSelectedProductForOutbid] = useState<ProductItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activePreviewProduct, setActivePreviewProduct] = useState<ProductItem | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [lastSubmittedProduct, setLastSubmittedProduct] = useState<ProductItem | null>(null);
  const [lastSubmittedRank, setLastSubmittedRank] = useState<number>(1);

  // Auto-detect and open direct campaign permalinks or keyword search from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const itemId = params.get('item');
      if (itemId && products.length > 0) {
        const found = products.find(p => p.id === itemId || p.name.toLowerCase().replace(/\s+/g, '-') === itemId.toLowerCase());
        if (found) {
          setActivePreviewProduct(found);
        }
      }
      const kwSlug = params.get('kw');
      if (kwSlug) {
        const cleanKw = kwSlug.replace(/-/g, ' ');
        setSearchQuery(cleanKw);
      }
    }
  }, [products]);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem(STORAGE_KEY_SOUND);
      return val !== null ? JSON.parse(val) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    playClickSound(soundEnabled);
  };

  const navigateTo = (route: PageRoute, prefill?: Partial<ProductItem> | null) => {
    setCurrentRoute(route);
    setPrefillData(prefill || null);
    try {
      if (route === 'home') window.history.pushState(null, '', '/');
      else if (route === 'admin') window.history.pushState(null, '', '#tanm-control');
      else window.history.pushState(null, '', `/${route}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound(soundEnabled);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
    } catch {}
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, JSON.stringify(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playClickSound(true);
  };

  const getSortedProducts = () => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory || p.categories?.includes(activeCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.displayUrl.toLowerCase().includes(q) ||
        p.creator.name.toLowerCase().includes(q) ||
        p.creator.handle.toLowerCase().includes(q)
      );
    }

    if (timeframe === 'trending') {
      list.sort((a, b) => (b.votes * 3 + b.clicks) - (a.votes * 3 + a.clicks));
    } else if (timeframe === 'newest') {
      list.sort((a, b) => (b.id > a.id ? 1 : -1));
    } else {
      list.sort((a, b) => b.votes - a.votes || b.clicks - a.clicks);
    }

    return list;
  };

  const sortedProducts = getSortedProducts();
  const allRankedByVotes = [...products].sort((a, b) => b.votes - a.votes || b.clicks - a.clicks);
  const topProduct = allRankedByVotes.length > 0 ? allRankedByVotes[0] : null;

  const totalProductsCount = products.length;
  const totalVotesCount = products.reduce((acc, curr) => acc + curr.votes, 0);
  const totalClicks = products.reduce((acc, curr) => acc + curr.clicks, 0);

  const openSubmitModal = (prefill?: Partial<ProductItem> | null) => {
    navigateTo('submit', prefill);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
    setSelectedProductForOutbid(null);
  };

  const openProductPreview = (product: ProductItem) => {
    setActivePreviewProduct(product);
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', `/?item=${encodeURIComponent(product.id)}`);
      } catch {}
    }
    playClickSound(soundEnabled);
  };

  const closeProductPreview = () => {
    setActivePreviewProduct(null);
    if (typeof window !== 'undefined') {
      try {
        const url = activeCategory && activeCategory !== 'all' ? `/?category=${activeCategory}` : '/';
        window.history.pushState(null, '', url);
      } catch {}
    }
  };

  const upvoteProduct = async (id: string) => {
    if (hasVotedToday(id)) return;

    const voterId = await getVoterId();
    const currentTop = allRankedByVotes[0];
    playUpvoteSound(soundEnabled);

    const now = Date.now();
    setVotedMap(prev => {
      const updated = { ...prev, [id]: now };
      try { localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(updated)); } catch {}
      return updated;
    });

    let willBecomeNewRank1 = false;

    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          const newVotes = p.votes + 1;
          if (currentTop && currentTop.id !== id && newVotes > currentTop.votes) {
            willBecomeNewRank1 = true;
          }
          return { ...p, votes: newVotes };
        }
        return p;
      });
      return updated;
    });

    // Record in Turso with 24h constraint
    recordVote24hInTurso(id, voterId);

    const target = products.find(p => p.id === id);
    if (target) {
      if (willBecomeNewRank1) {
        playCrownSound(soundEnabled);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#c98ed6', '#dfbce8', '#ffd700', '#ffffff']
          });
        } catch (e) {}
      }

      const newAct: ActivityLog = {
        id: 'act-' + Date.now(),
        type: willBecomeNewRank1 ? 'claim' : 'vote',
        message: willBecomeNewRank1 
          ? `👑 "${target.name}" took over the #1 CROWN with ${target.votes + 1} votes!`
          : `Someone pushed up "${target.name}" (${target.votes + 1} push ups)`,
        timeAgo: 'Just now',
        avatar: target.logo,
        productName: target.name
      };

      setActivities(prev => [newAct, ...prev.slice(0, 15)]);
      saveActivityToTurso(newAct);
    }
  };

  const recordClick = (id: string) => {
    let newClicks = 1;
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          newClicks = p.clicks + 1;
          return { ...p, clicks: newClicks };
        }
        return p;
      })
    );
    recordClickInTurso(id, newClicks);
  };

  const submitCampaign = (data: {
    productUrl: string;
    name: string;
    tagline: string;
    description: string;
    creatorName: string;
    creatorHandle: string;
    category: Category;
    categories?: Category[];
    assetLink?: string;
    metrics?: AssetMetrics;
    tactic?: string;
    sponsorLink?: string;
    mediaType?: 'url' | 'image' | 'video';
    mediaData?: string;
    targetProductId?: string;
  }) => {
    const parsed = parseProductUrl(data.productUrl);
    const selectedCats = data.categories && data.categories.length > 0 ? data.categories : [data.category];
    const totalFee = 0; // FREE — no entry fee

    const existingIndex = data.targetProductId 
      ? products.findIndex(p => p.id === data.targetProductId)
      : products.findIndex(p => p.url.toLowerCase() === data.productUrl.toLowerCase() || p.displayUrl.toLowerCase() === parsed.displayUrl.toLowerCase());

    const isFirstEntry = products.length === 0;
    const creatorHandle = data.creatorHandle.startsWith('@') ? data.creatorHandle : `@${data.creatorHandle}`;

    let updatedList: ProductItem[];
    let targetItem: ProductItem;

    if (existingIndex >= 0) {
      const existing = products[existingIndex];
      targetItem = {
        ...existing,
        name: data.name || existing.name || parsed.name,
        tagline: data.tagline || existing.tagline,
        description: data.description || existing.description,
        url: data.productUrl || existing.url,
        displayUrl: parsed.displayUrl || existing.displayUrl,
        logo: parsed.logo || existing.logo,
        mediaType: data.mediaType || existing.mediaType,
        mediaData: data.mediaData || existing.mediaData,
        assetLink: data.assetLink || existing.assetLink || data.productUrl,
        tactic: data.tactic || existing.tactic,
        category: selectedCats[0] || data.category,
        categories: selectedCats,
        entryFee: totalFee,
        sponsorLink: data.sponsorLink || existing.sponsorLink,
        creator: {
          name: data.creatorName || existing.creator.name,
          handle: creatorHandle || existing.creator.handle,
          avatar: parsed.logo || existing.creator.avatar,
          verified: existing.creator.verified
        }
      };
      updatedList = [...products];
      updatedList[existingIndex] = targetItem;
    } else {
      targetItem = {
        id: 'camp-' + Date.now(),
        name: data.name || parsed.name,
        tagline: data.tagline || 'Marketing Tactic & Campaign Asset',
        description: data.description || 'Marketing case study & tactic breakdown on marketingdb.lol',
        url: data.productUrl,
        displayUrl: parsed.displayUrl,
        logo: parsed.logo,
        mediaType: data.mediaType || 'url',
        mediaData: data.mediaData,
        assetLink: data.assetLink || data.productUrl,
        tactic: data.tactic,
        creator: {
          name: data.creatorName || parsed.name,
          handle: creatorHandle,
          avatar: parsed.logo,
          verified: false
        },
        category: selectedCats[0] || data.category,
        categories: selectedCats,
        entryFee: totalFee,
        votes: 1,
        clicks: 0,
        submittedAt: 'Just now',
        sponsorLink: data.sponsorLink || data.productUrl
      };
      updatedList = [targetItem, ...products];
    }

    setProducts(updatedList);

    // Save to Turso DB 1 (Campaign) & DB 2 (Media)
    saveCampaignToTurso(targetItem, data.mediaData, data.name);

    const sorted = [...updatedList].sort((a, b) => b.votes - a.votes || b.clicks - a.clicks);
    const newRank = sorted.findIndex(p => p.id === targetItem.id) + 1;

    if (isFirstEntry || newRank === 1) {
      playCrownSound(soundEnabled);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c98ed6', '#dfbce8', '#ffd700', '#ffffff']
        });
      } catch (e) {}
    } else {
      playCoinSound(soundEnabled);
    }

    const newAct: ActivityLog = {
      id: 'act-' + Date.now(),
      type: 'new_entry',
      message: `🚀 ${creatorHandle} uploaded marketing tactic "${targetItem.name}" to the leaderboard`,
      timeAgo: 'Just now',
      avatar: targetItem.logo,
      productName: targetItem.name,
      rank: newRank
    };

    setActivities(prev => [newAct, ...prev.slice(0, 15)]);
    saveActivityToTurso(newAct);

    // Store last submitted for success page
    setLastSubmittedProduct(targetItem);
    setLastSubmittedRank(newRank);

    // Navigate to beautiful success page
    setCurrentRoute('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return { success: true, newRank, totalFee };
  };

  const resetToDefaults = () => {
    setProducts([]);
    setActivities([]);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_ACTIVITIES);
    playCoinSound(soundEnabled);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        sortedProducts,
        topProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        timeframe,
        setTimeframe,
        viewMode,
        setViewMode,
        currentRoute,
        navigateTo,
        prefillData,
        theme,
        toggleTheme,
        selectedProductForOutbid,
        openSubmitModal,
        closeSubmitModal,
        activePreviewProduct,
        openProductPreview,
        closeProductPreview,
        isHowItWorksOpen,
        setIsHowItWorksOpen,
        soundEnabled,
        toggleSound,
        totalProductsCount,
        totalVotesCount,
        totalClicks,
        activities,
        submitCampaign,
        upvoteProduct,
        hasVotedToday,
        recordClick,
        resetToDefaults,
        lastSubmittedProduct,
        lastSubmittedRank
      }}
    >
      {children}
      {isSubmitModalOpen && <div style={{ display: 'none' }} />}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
