import type { ProductItem, ActivityLog, Category } from '../types';

export interface DomainMetadata {
  name: string;
  displayUrl: string;
  logo: string;
  headline: string;
  description: string;
  suggestedCategory: Category;
}

export function parseProductUrl(inputUrl: string): { displayUrl: string; logo: string; name: string } {
  if (!inputUrl) {
    return {
      displayUrl: 'campaign.link',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      name: 'Marketing Campaign'
    };
  }

  try {
    let clean = inputUrl.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'https://' + clean;
    }
    const urlObj = new URL(clean);
    const domain = urlObj.hostname.replace(/^www\./, '');
    const cleanName = domain.split('.')[0];
    const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
    return {
      displayUrl: domain,
      logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      name: capitalized
    };
  } catch (e) {
    return {
      displayUrl: inputUrl,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      name: inputUrl.slice(0, 20)
    };
  }
}

// In-memory cache for live metadata
const metadataCache = new Map<string, DomainMetadata>();

// Live real-time metadata fetcher for any URL / domain
export async function fetchLiveWebsiteMetadata(inputUrl: string): Promise<DomainMetadata> {
  const parsed = parseProductUrl(inputUrl);
  const cleanUrl = inputUrl.trim().startsWith('http') ? inputUrl.trim() : `https://${inputUrl.trim()}`;
  
  if (metadataCache.has(cleanUrl)) {
    return metadataCache.get(cleanUrl)!;
  }

  // Fast fallback
  const fallback = autoFetchDomainMetadata(inputUrl);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // Query Microlink for live real open graph, title, description, and publisher
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(cleanUrl)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.status === 'success' && json.data) {
        const data = json.data;

        // Real live brand name
        let brandName = data.publisher || '';
        if (!brandName && data.title) {
          const parts = data.title.split(/[-–—|:]/);
          if (parts.length > 1) {
            brandName = parts[0].trim();
          }
        }
        if (!brandName || brandName.length > 35) {
          brandName = parsed.name;
        }

        // Real live headline / title
        let liveHeadline = data.title || '';
        if (liveHeadline) {
          // Clean up trailing branding if duplicate
          liveHeadline = liveHeadline.replace(/ \| [^|]+$/, '').replace(/ - [^-]+$/, '').trim();
        }
        if (!liveHeadline) {
          liveHeadline = fallback.headline;
        }

        // Real live description / pitch
        let liveDescription = data.description || '';
        if (!liveDescription) {
          liveDescription = liveHeadline;
        }

        // Real live logo / favicon
        const liveLogo = data.logo?.url || data.image?.url || parsed.logo;

        // Categorize based on real title & description keywords
        const combinedText = `${liveHeadline} ${liveDescription} ${parsed.displayUrl}`.toLowerCase();
        let cat: Category = fallback.suggestedCategory;
        if (combinedText.includes('ad') || combinedText.includes('meta') || combinedText.includes('facebook')) {
          cat = 'meta-ads';
        } else if (combinedText.includes('tiktok') || combinedText.includes('reel') || combinedText.includes('video')) {
          cat = 'tiktok';
        } else if (combinedText.includes('youtube')) {
          cat = 'youtube';
        } else if (combinedText.includes('email') || combinedText.includes('newsletter') || combinedText.includes('mail')) {
          cat = 'email';
        } else if (combinedText.includes('copywriting') || combinedText.includes('content') || combinedText.includes('seo')) {
          cat = 'copywriting';
        } else if (combinedText.includes('landing') || combinedText.includes('page') || combinedText.includes('website')) {
          cat = 'landing-pages';
        } else if (combinedText.includes('twitter') || combinedText.includes('tweet') || combinedText.includes(' x ')) {
          cat = 'twitter-x';
        } else {
          cat = 'slideshow';
        }

        const result: DomainMetadata = {
          name: brandName,
          displayUrl: parsed.displayUrl,
          logo: liveLogo,
          headline: liveHeadline,
          description: liveDescription,
          suggestedCategory: cat
        };

        metadataCache.set(cleanUrl, result);
        return result;
      }
    }
  } catch (err) {
    // Network / abort error - gracefully fall back
  }

  return fallback;
}

// Auto-fetch & smart fallback metadata extractor when user enters domain
export function autoFetchDomainMetadata(inputUrl: string): DomainMetadata {
  const parsed = parseProductUrl(inputUrl);
  const domain = parsed.displayUrl.toLowerCase();
  const name = parsed.name;

  let headline = `High-converting ${name} growth & marketing breakdown`;
  let description = `${name} is competing on marketingdb.lol to showcase creative marketing and capture high-intent users.`;
  let suggestedCategory: Category = 'slideshow';

  if (domain.includes('focus') || domain.includes('insta') || domain.includes('social')) {
    headline = 'Turn Instagram Post Comments into Buyers with Automated DMs';
    description = `Create better content, turn comments into buyers, and deliver lead magnets on Instagram—all on autopilot.`;
    suggestedCategory = 'tiktok';
  } else if (domain.includes('ad') || domain.includes('meta') || domain.includes('roas')) {
    headline = '4.2x ROAS Meta direct-response ad creative & scaling funnel';
    description = `A comprehensive breakdown of top-performing video hooks and retargeting workflows driving profitable customer acquisition.`;
    suggestedCategory = 'meta-ads';
  } else if (domain.includes('lead') || domain.includes('mail') || domain.includes('cold') || domain.includes('email')) {
    headline = 'Cold email & inbound lead gen campaign engine';
    description = `High-response email sequences and automated lead enrichment workflows generating qualified pipeline on autopilot.`;
    suggestedCategory = 'email';
  } else if (domain.includes('youtube') || domain.includes('video')) {
    headline = 'YouTube high-converting organic video marketing framework';
    description = `Engaging video breakdowns engineered to build instant trust and drive long-term organic traffic.`;
    suggestedCategory = 'youtube';
  } else if (domain.includes('page') || domain.includes('site') || domain.includes('funnel') || domain.includes('landing')) {
    headline = 'High-converting landing page & checkout UX redesign';
    description = `Optimized value propositions, social proof hierarchy, and frictionless CTA placement engineered for maximum conversion velocity.`;
    suggestedCategory = 'landing-pages';
  } else if (domain.includes('x') || domain.includes('tweet') || domain.includes('post')) {
    headline = 'Viral X thread framework for founder distribution';
    description = `Strategic storytelling and engagement architecture that turned impressions into active inbound product users.`;
    suggestedCategory = 'twitter-x';
  } else {
    headline = `Scale customer acquisition with ${name}`;
    description = `Explore the high-converting marketing strategy, creative hooks, and customer conversion funnels powering ${name}.`;
    suggestedCategory = 'slideshow';
  }

  return {
    name,
    displayUrl: parsed.displayUrl,
    logo: parsed.logo,
    headline,
    description,
    suggestedCategory
  };
}

export const INITIAL_PRODUCTS: ProductItem[] = [];
export const INITIAL_ACTIVITIES: ActivityLog[] = [];
