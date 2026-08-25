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

// Auto-fetch & smart metadata extractor when user enters domain
export function autoFetchDomainMetadata(inputUrl: string): DomainMetadata {
  const parsed = parseProductUrl(inputUrl);
  const domain = parsed.displayUrl.toLowerCase();
  const name = parsed.name;

  let headline = `High-converting ${name} marketing campaign breakdown`;
  let description = `${name} is competing on marketingdb.lol to capture high-intent growth traffic and community recognition.`;
  let suggestedCategory: Category = 'ugc';

  if (domain.includes('focus') || domain.includes('insta') || domain.includes('social')) {
    headline = 'Turn Instagram Post Comments into Buyers with Automated DMs';
    description = `Create better content, turn comments into buyers, and deliver lead magnets on Instagram—all on autopilot.`;
    suggestedCategory = 'tiktok';
  } else if (domain.includes('ad') || domain.includes('meta') || domain.includes('roas')) {
    headline = '4.2x ROAS Meta direct-response ad creative & scaling funnel';
    description = `A comprehensive breakdown of top-performing video hooks, UGC angles, and retargeting workflows driving profitable customer acquisition.`;
    suggestedCategory = 'meta-ads';
  } else if (domain.includes('lead') || domain.includes('mail') || domain.includes('cold')) {
    headline = 'Cold email & inbound lead gen campaign engine';
    description = `High-response email sequences and automated lead enrichment workflows generating qualified pipeline on autopilot.`;
    suggestedCategory = 'email';
  } else if (domain.includes('ugc') || domain.includes('video') || domain.includes('creator')) {
    headline = 'Viral direct-response UGC creator framework';
    description = `Authentic creator content framework engineered to stop scrolling, build instant trust, and maximize conversion rates.`;
    suggestedCategory = 'ugc';
  } else if (domain.includes('page') || domain.includes('site') || domain.includes('funnel')) {
    headline = 'High-converting landing page & checkout UX redesign';
    description = `Optimized value propositions, social proof hierarchy, and frictionless CTA placement engineered for maximum conversion velocity.`;
    suggestedCategory = 'landing-pages';
  } else if (domain.includes('x') || domain.includes('tweet') || domain.includes('post')) {
    headline = 'Viral X thread framework for founder distribution';
    description = `Strategic storytelling and engagement architecture that turned impressions into active inbound product users.`;
    suggestedCategory = 'twitter-x';
  } else {
    headline = `Next-gen ${name} creative & customer acquisition campaign`;
    description = `Deep dive into the messaging, creative assets, and distribution strategy driving rapid growth for ${name}.`;
    suggestedCategory = 'creative';
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
