import { useEffect } from 'react';
import type { PageRoute, Category } from '../types';

interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
}

const CATEGORY_SEO_MAP: Record<Category, SeoConfig> = {
  all: {
    title: 'Promote & Rank Your Marketing Campaigns & SaaS Tools — MarketingDB Directory',
    description: 'Promote your website, SaaS tool, or creative campaigns for free. Earn a permanent high-authority Dofollow backlink, drive organic referral traffic, and compete for the daily #1 crown.',
    canonical: 'https://marketingdb.lol/'
  },
  'meta-ads': {
    title: 'Promote & Discover Top Meta & Facebook Ad Creatives — MarketingDB',
    description: 'Promote your best-performing Meta ad creatives and swipe high-ROAS video hooks, carousel designs, and UGC ad frameworks ranked daily by media buyers.',
    canonical: 'https://marketingdb.lol/?category=meta-ads'
  },
  'landing-pages': {
    title: 'Promote Landing Pages & Discover High-Converting SaaS Homepages — MarketingDB',
    description: 'Promote your landing page to thousands of founders and marketers. Get a direct Dofollow backlink while exploring top-converting CRO layouts, hero hooks, and pricing matrices.',
    canonical: 'https://marketingdb.lol/?category=landing-pages'
  },
  ecom: {
    title: 'Promote E-Commerce Stores & High-Converting Product Pages — MarketingDB',
    description: 'Promote your Shopify store, DTC brand campaigns, and e-commerce product pages. Gain instant SEO backlinks, buyer traffic, and rank your store against top brands.',
    canonical: 'https://marketingdb.lol/?category=ecom'
  },
  dropshipping: {
    title: 'Promote Dropshipping Stores & Winning Product Creatives — MarketingDB',
    description: 'Promote your dropshipping winning products, single-item landing pages, and viral video ads. Get permanent backlink power and showcase your highest-converting funnels.',
    canonical: 'https://marketingdb.lol/?category=dropshipping'
  },
  'twitter-x': {
    title: 'Promote X Posts, Viral Launch Threads & Growth Playbooks — MarketingDB',
    description: 'Promote your Twitter/X launch threads, viral breakdown tweets, and build-in-public milestones. Drive organic impressions, followers, and permanent backlinks to your profile.',
    canonical: 'https://marketingdb.lol/?category=twitter-x'
  },
  'fb-pages': {
    title: 'Promote Facebook Pages, Viral Posts & Brand Campaigns — MarketingDB',
    description: 'Promote your Facebook business pages, viral post creatives, and community campaigns. Index your brand on our live directory with direct Dofollow backlinks.',
    canonical: 'https://marketingdb.lol/?category=fb-pages'
  },
  slideshow: {
    title: 'Promote Marketing Slideshows & Carousel Decks Swipe File — MarketingDB',
    description: 'Promote your PDF slide decks, LinkedIn carousels, and visual breakdowns ranked by community saves and shares with a permanent backlink.',
    canonical: 'https://marketingdb.lol/?category=slideshow'
  },
  tiktok: {
    title: 'Promote Viral TikTok Ads & UGC Creative Playbooks — MarketingDB',
    description: 'Promote your organic-looking TikTok ad creatives, sound frameworks, and high-retention UGC ads that drove millions in views and sales.',
    canonical: 'https://marketingdb.lol/?category=tiktok'
  },
  youtube: {
    title: 'Promote YouTube Marketing & Video Teardowns — MarketingDB',
    description: 'Promote your long-form YouTube video breakdowns, sponsor integrations, and video sales letter (VSL) playbooks to thousands of marketers.',
    canonical: 'https://marketingdb.lol/?category=youtube'
  },
  email: {
    title: 'Promote Email Marketing & SaaS Onboarding Sequences — MarketingDB',
    description: 'Promote your SaaS welcome flows, retention newsletters, and cold email templates. Earn high-authority backlinks and subscriber traffic.',
    canonical: 'https://marketingdb.lol/?category=email'
  },
  copywriting: {
    title: 'Promote Copywriting & Headline Hook Swipe File — MarketingDB',
    description: 'Promote your magnetic headline hooks, benefit-driven value propositions, and objection-handling copy to growth copywriters worldwide.',
    canonical: 'https://marketingdb.lol/?category=copywriting'
  }
};

const ROUTE_SEO_MAP: Record<PageRoute, SeoConfig> = {
  home: CATEGORY_SEO_MAP.all,
  'case-studies': {
    title: 'Marketing Teardowns & Growth Breakdowns — MarketingDB Directory',
    description: 'Deep-dive marketing teardowns, viral ad analyses, and organic customer acquisition strategies that scaled real startups to millions in ARR.',
    canonical: 'https://marketingdb.lol/case-studies'
  },
  submit: {
    title: 'Submit Your Site / Campaign (100% Free Dofollow Backlink) — MarketingDB',
    description: 'Submit your SaaS tool, website, or marketing creative for free. Get indexed on our directory with a permanent Dofollow backlink and climb the live leaderboard.',
    canonical: 'https://marketingdb.lol/submit'
  },
  advertise: {
    title: 'Promote & Sponsor on MarketingDB — Premium Dofollow Sponsor Spots',
    description: 'Put your SaaS, marketing tool, or agency in the spotlight on MarketingDB with permanent Dofollow backlinks and community visibility.',
    canonical: 'https://marketingdb.lol/advertise'
  },
  success: {
    title: 'Submission Live! Get Your Featured Backlink Badge — MarketingDB',
    description: 'Your listing is live on MarketingDB. Grab your embeddable "Featured on MarketingDB" badge and share your link to climb to #1.',
    canonical: 'https://marketingdb.lol/success'
  },
  admin: {
    title: 'Admin Control Center — MarketingDB',
    description: 'Manage directory submissions, campaigns, and sponsorships.',
    canonical: 'https://marketingdb.lol/'
  }
};

export const usePageSeo = (currentRoute: PageRoute, activeCategory: Category = 'all') => {
  useEffect(() => {
    let config = ROUTE_SEO_MAP[currentRoute] || ROUTE_SEO_MAP.home;
    if (currentRoute === 'home' && activeCategory) {
      config = CATEGORY_SEO_MAP[activeCategory] || CATEGORY_SEO_MAP.all;
    }

    // Update document title
    document.title = config.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = config.description;

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.content = config.title;

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (ogDesc) ogDesc.content = config.description;

    let twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
    if (twitterTitle) twitterTitle.content = config.title;

    let twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
    if (twitterDesc) twitterDesc.content = config.description;

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = config.canonical;

    // Dynamically Inject/Update BreadcrumbList JSON-LD Schema
    const breadcrumbItems: { '@type': string; position: number; name: string; item: string }[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://marketingdb.lol/'
      }
    ];

    if (currentRoute === 'case-studies') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Articles & Teardowns',
        item: 'https://marketingdb.lol/case-studies'
      });
    } else if (currentRoute === 'submit') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Submit to Directory',
        item: 'https://marketingdb.lol/submit'
      });
    } else if (currentRoute === 'advertise') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Advertise & Sponsor',
        item: 'https://marketingdb.lol/advertise'
      });
    } else if (currentRoute === 'home' && activeCategory && activeCategory !== 'all') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: config.title.split('—')[0].trim(),
        item: config.canonical
      });
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };

    let breadcrumbScript = document.getElementById('breadcrumb-schema-jsonld') as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'breadcrumb-schema-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
  }, [currentRoute, activeCategory]);
};
