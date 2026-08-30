import type { LongTailKeyword, SearchIntent, Category } from '../types';

const CATEGORIES: Category[] = [
  'meta-ads',
  'landing-pages',
  'ecom',
  'dropshipping',
  'twitter-x',
  'fb-pages',
  'slideshow',
  'tiktok',
  'youtube',
  'email',
  'copywriting'
];

const INTENT_TEMPLATES: Record<SearchIntent, { action: string[]; topic: string[]; suffix: string[] }> = {
  transactional: {
    action: [
      'where to submit', 'how to submit', 'free dofollow backlink for', 'instant directory listing for',
      'promote your', 'claim listing for', 'post campaign on', 'get backlinks for',
      'submit website to', 'free launch directory for', 'add startup to', 'rank your'
    ],
    topic: [
      'B2B SaaS startup', 'micro SaaS tool', 'DTC ecommerce brand', 'dropshipping product page',
      'Meta Facebook ad creative', 'TikTok UGC video hook', 'LinkedIn carousel PDF', 'Twitter X viral launch thread',
      'SaaS landing page', 'high converting email funnel', 'copywriting swipe file', 'YouTube video teardown'
    ],
    suffix: [
      'for dofollow SEO backlinks 2026', 'to get instant buyer traffic', 'on high DR marketing directory',
      'for free search indexing', 'without domain authority requirements', 'to boost organic domain rank',
      'for early adopter feedback', 'in live community leaderboard'
    ]
  },
  informational: {
    action: [
      'how to write', 'how to design', 'best practices for', 'step by step guide to',
      'how to optimize', 'proven playbooks for', 'framework for high converting', 'secret tactics for',
      'how to scale', 'how to audit', 'anatomy of top performing', 'how to structure'
    ],
    topic: [
      'Facebook Meta ad video hooks', 'high converting SaaS hero sections', 'TikTok UGC video scripts',
      'viral Twitter X build in public threads', 'ecommerce checkout conversion funnels', 'LinkedIn slide carousel graphics',
      'SaaS onboarding email sequences', 'direct response magnetic headline copy', 'YouTube sponsor breakdown videos',
      'dropshipping single product landing pages'
    ],
    suffix: [
      'first 3 seconds retention', 'above the fold conversion rate', 'for maximum click through rate CTR',
      'to lower cost per acquisition CPA', 'for B2B software marketing', 'with real case study numbers',
      'without expensive media buyers', 'for viral organic reach'
    ]
  },
  commercial: {
    action: [
      'top rated', 'best alternatives to', 'highest converting', 'most popular',
      'comparison of top', 'curated list of best', 'winning examples of', 'benchmark list of'
    ],
    topic: [
      'marketing database swipe files', 'SaaS landing page directories', 'Facebook Meta ad libraries',
      'TikTok ad hook inspiration boards', 'Twitter launch thread swipe files', 'ecommerce product video ads',
      'LinkedIn carousel teardown libraries', 'cold email onboarding template databases', 'copywriting hook archives'
    ],
    suffix: [
      'for growth marketers 2026', 'vs traditional ad spy tools', 'for bootstrapped indie hackers',
      'with real performance metrics', 'ranked by community votes', 'for agency media buyers',
      'for DTC store owners', 'filtered by conversion rate'
    ]
  },
  navigational: {
    action: [
      'MarketingDB', 'marketingdb.lol', 'official index of', 'live leaderboard for',
      'browse database of', 'directory index for', 'marketing database search for', 'top voted list of'
    ],
    topic: [
      'best Meta ads library examples', 'top SaaS homepage hero layouts', 'viral TikTok UGC hooks index',
      'Twitter growth teardown threads', 'high converting ecommerce product pages', 'LinkedIn PDF carousels',
      'email newsletter marketing funnels', 'copywriting headline swipe collection'
    ],
    suffix: [
      'on MarketingDB', 'community directory 2026', 'verified dofollow backlinks',
      'sorted by top daily votes', 'free breakdown library', 'open marketing hub'
    ]
  }
};

const VOLUMES = ['3.4K/mo', '2.8K/mo', '1.9K/mo', '1.4K/mo', '980/mo', '750/mo', '520/mo', '410/mo', '320/mo'];
const DIFFICULTIES: Array<'Easy' | 'Medium' | 'Low'> = ['Easy', 'Low', 'Medium'];

function generateKeywords(): LongTailKeyword[] {
  const keywords: LongTailKeyword[] = [];
  const intents: SearchIntent[] = ['transactional', 'informational', 'commercial', 'navigational'];
  let idCount = 1;

  for (const intent of intents) {
    const tmpl = INTENT_TEMPLATES[intent];
    let categoryIdx = 0;
    let intentCount = 0;

    for (let a = 0; a < tmpl.action.length; a++) {
      for (let t = 0; t < tmpl.topic.length; t++) {
        for (let s = 0; s < tmpl.suffix.length; s++) {
          if (intentCount >= 250) break;

          const action = tmpl.action[a];
          const topic = tmpl.topic[t];
          const suffix = tmpl.suffix[s];
          const cat = CATEGORIES[categoryIdx % CATEGORIES.length];
          categoryIdx++;

          const kwString = `${action} ${topic} ${suffix}`.toLowerCase().replace(/\s+/g, ' ').trim();
          const slug = kwString.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

          keywords.push({
            id: `kw-${idCount++}`,
            keyword: kwString,
            intent: intent,
            category: cat,
            searchVolume: VOLUMES[(idCount + a + t + s) % VOLUMES.length],
            difficulty: DIFFICULTIES[(idCount + s) % DIFFICULTIES.length],
            slug: slug
          });
          intentCount++;
        }
        if (intentCount >= 250) break;
      }
      if (intentCount >= 250) break;
    }
  }

  return keywords;
}

export const LONG_TAIL_KEYWORDS: LongTailKeyword[] = generateKeywords();

export const INTENT_DESCRIPTIONS: Record<SearchIntent, { label: string; badgeColor: string; description: string }> = {
  transactional: {
    label: 'Transactional (Action)',
    badgeColor: '#10b981',
    description: 'High-converting queries from founders ready to submit sites, claim backlinks, and acquire traffic.'
  },
  informational: {
    label: 'Informational (Learn)',
    badgeColor: '#3b82f6',
    description: 'Searchers looking for guides, ad hook formulas, CRO frameworks, and copywriting teardowns.'
  },
  commercial: {
    label: 'Commercial (Investigate)',
    badgeColor: '#8b5cf6',
    description: 'Marketers evaluating top directories, swipe files, ad spy tools, and campaign benchmarks.'
  },
  navigational: {
    label: 'Navigational (Brand)',
    badgeColor: '#f59e0b',
    description: 'Direct queries targeting MarketingDB categories, leaderboard listings, and swipe collections.'
  }
};

export const searchKeywords = (
  query: string,
  intent?: SearchIntent | 'all',
  category?: Category | 'all'
): LongTailKeyword[] => {
  const cleanQ = query.toLowerCase().trim();
  return LONG_TAIL_KEYWORDS.filter((item) => {
    const matchesQuery = !cleanQ || item.keyword.includes(cleanQ) || item.category.includes(cleanQ);
    const matchesIntent = !intent || intent === 'all' || item.intent === intent;
    const matchesCat = !category || category === 'all' || item.category === category;
    return matchesQuery && matchesIntent && matchesCat;
  });
};

export const getKeywordBySlug = (slug: string): LongTailKeyword | undefined => {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  return LONG_TAIL_KEYWORDS.find(
    (kw) => kw.slug === cleanSlug || kw.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug
  );
};

export const getKeywordByQuery = (query: string): LongTailKeyword | undefined => {
  if (!query) return undefined;
  const cleanQ = query.toLowerCase().trim();
  return LONG_TAIL_KEYWORDS.find(
    (kw) => kw.keyword.toLowerCase() === cleanQ || kw.slug === cleanQ
  );
};

