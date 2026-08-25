import { useEffect } from 'react';
import type { PageRoute } from '../types';

interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
}

const SEO_MAP: Record<PageRoute, SeoConfig> = {
  home: {
    title: 'MarketingDB — The #1 Marketing & SaaS Directory With Live Rankings',
    description: 'Discover, submit, and rank the internet\'s best marketing campaigns, SaaS tools, ad creatives, and landing pages on a live directory with free Dofollow backlinks.',
    canonical: 'https://marketingdb.lol/'
  },
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
    description: 'Put your SaaS, marketing tool, or agency in front of 50,000+ monthly founders, marketers, and growth creators on MarketingDB with direct Dofollow backlinks.',
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

export const usePageSeo = (currentRoute: PageRoute) => {
  useEffect(() => {
    const config = SEO_MAP[currentRoute] || SEO_MAP.home;

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
  }, [currentRoute]);
};
