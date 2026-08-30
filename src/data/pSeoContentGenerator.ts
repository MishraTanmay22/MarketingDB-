import type { LongTailKeyword, SearchIntent, Category } from '../types';
import { LONG_TAIL_KEYWORDS } from './longTailKeywords';

export interface PSeoPageContent {
  keyword: string;
  slug: string;
  intent: SearchIntent;
  category: Category;
  h1: string;
  subheading: string;
  contentParagraph: string;
  takeaways: string[];
  faqs: { question: string; answer: string }[];
  relatedKeywords: { keyword: string; slug: string }[];
  author: {
    name: string;
    handle: string;
    avatar: string;
    role: string;
  };
  lastUpdated: string;
  readTime: string;
}

const CATEGORY_NAMES: Record<Category, string> = {
  'all': 'Marketing & SaaS Directory',
  'meta-ads': 'Meta & Facebook Ad Creatives',
  'landing-pages': 'SaaS Landing Pages & CRO',
  'ecom': 'E-Commerce & Shopify Brands',
  'dropshipping': 'Dropshipping Winning Products',
  'twitter-x': 'Twitter/X Growth & Launch Threads',
  'fb-pages': 'Facebook Business Pages & Video Posts',
  'slideshow': 'PDF Slideshows & LinkedIn Carousels',
  'tiktok': 'TikTok Video Ads & UGC Scripts',
  'youtube': 'YouTube Marketing & Video Sales Letters',
  'email': 'Email Marketing & SaaS Onboarding Sequences',
  'copywriting': 'Direct Response Copywriting & Headline Hooks'
};

const INTENT_COPY: Record<SearchIntent, { introLead: string; strategyLead: string; CTA: string }> = {
  transactional: {
    introLead: 'Looking for the best strategy to submit your product, earn high-authority Dofollow SEO backlinks, and acquire active buyer traffic?',
    strategyLead: 'By indexing your website on MarketingDB, you gain an instant permanent Dofollow backlink, indexation on major search engines, and direct exposure to a community of founders and media buyers.',
    CTA: 'Submit your website or campaign below for free to claim your spot on today\'s live leaderboard.'
  },
  informational: {
    introLead: 'Searching for proven playbooks, conversion rate benchmarks, and breakdown teardowns for your marketing campaigns?',
    strategyLead: 'Our breakdown library analyzes top-performing creative hooks, hero section copywriting, retention mechanics, and media buying frameworks that scale startups.',
    CTA: 'Explore community-voted campaign examples below or submit your own breakdown for instant feedback.'
  },
  commercial: {
    introLead: 'Comparing top-rated marketing databases, ad creative swipe files, and SaaS directory tools?',
    strategyLead: 'MarketingDB offers an open, community-voted index where growth marketers compare high-ROAS ad creatives, conversion-focused homepages, and viral acquisition funnels in real time.',
    CTA: 'Review top-voted entries below or submit your tool to compete against the best in the industry.'
  },
  navigational: {
    introLead: 'Searching for official MarketingDB campaign listings, ad swipe collections, and live leaderboard rankings?',
    strategyLead: 'You have reached the official MarketingDB category index for top-voted marketing assets, verified backlink profiles, and startup launches.',
    CTA: 'Browse the ranked entries below or submit your project to gain instant community traction.'
  }
};

export const generatePSeoContent = (kw: LongTailKeyword): PSeoPageContent => {
  const formattedKw = kw.keyword.charAt(0).toUpperCase() + kw.keyword.slice(1);
  const categoryName = CATEGORY_NAMES[kw.category] || CATEGORY_NAMES.all;
  const intentCopy = INTENT_COPY[kw.intent];

  // Dynamic H1
  const h1 = formattedKw;

  // Dynamic Subheading
  const subheading = `${intentCopy.introLead} MarketingDB provides a free, high-authority directory platform to rank your campaigns and claim permanent Dofollow SEO backlinks.`;

  // Custom 120+ word SEO content paragraph
  const contentParagraph = `Welcome to the definitive breakdown for "${kw.keyword}". ${intentCopy.strategyLead} In today's digital landscape, ranking for targeted long-tail search intent terms like "${kw.keyword}" requires combining high-authority backlink signals with conversion-focused landing page copy. MarketingDB provides a streamlined community platform where SaaS tools, DTC e-commerce brands, Meta ad creatives, and TikTok video hooks receive real-time engagement and dofollow indexation. ${intentCopy.CTA}`;

  // 3 Strategic Takeaways tailored to domain
  const takeaways = [
    `Permanent Dofollow Backlink: Claim direct SEO link equity to boost domain authority for "${kw.keyword}".`,
    `Search Intent Indexation: Gain instant visibility across Google, Bing, and AI search engines (Perplexity, ChatGPT) for ${categoryName}.`,
    `Community Leaderboard Voting: Earn daily referral traffic and push-up votes from verified marketers and founders.`
  ];

  // Dynamic FAQs
  const faqs = [
    {
      question: `How does submitting for "${kw.keyword}" improve my Google SEO ranking?`,
      answer: `Submitting your website or campaign to MarketingDB creates a permanent, high-authority Dofollow backlink with optimized anchor text. Search crawlers index your listing directly under the "${kw.keyword}" category, passing domain authority and organic search signals.`
    },
    {
      question: `Is it free to list my SaaS tool or marketing campaign under "${kw.keyword}"?`,
      answer: `Yes, 100% free forever! Standard submissions and daily leaderboard ranking on MarketingDB require no payment or hidden fees.`
    },
    {
      question: `How fast will my campaign appear on the leaderboard for "${kw.keyword}"?`,
      answer: `Your listing goes live instantly upon submission! You can immediately share your permalink to gather community upvotes and climb to the #1 spot.`
    }
  ];

  // Get 6 related keywords in same intent/category for internal linking
  const related = LONG_TAIL_KEYWORDS
    .filter((k) => k.id !== kw.id && (k.intent === kw.intent || k.category === kw.category))
    .slice(0, 6)
    .map((k) => ({ keyword: k.keyword, slug: k.slug }));

  return {
    keyword: kw.keyword,
    slug: kw.slug,
    intent: kw.intent,
    category: kw.category,
    h1,
    subheading,
    contentParagraph,
    takeaways,
    faqs,
    relatedKeywords: related,
    author: {
      name: 'Tanmay Mishra',
      handle: '@whataleast',
      avatar: '/logo.png',
      role: 'Head of Growth & SEO Engineering'
    },
    lastUpdated: 'August 30, 2026',
    readTime: '2 min read'
  };
};
