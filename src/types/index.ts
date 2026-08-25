export type Category = 
  | 'all' 
  | 'slideshow'
  | 'meta-ads' 
  | 'tiktok' 
  | 'twitter-x' 
  | 'youtube' 
  | 'landing-pages' 
  | 'email' 
  | 'copywriting';

export interface Creator {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
}

export interface AssetMetrics {
  views?: string;
  likes?: string;
  impressions?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  displayUrl: string;
  logo: string;
  mediaType?: 'url' | 'image' | 'video';
  mediaData?: string;
  assetLink?: string;
  metrics?: AssetMetrics; // Auto-fetched likes, views, impressions from asset link
  tactic?: string;
  creator: Creator;
  category: Category;
  categories?: Category[]; // Support multi-category selection
  entryFee: number; // Legacy field, kept for DB compat
  votes: number; // Live community push-up count
  clicks: number;
  submittedAt: string;
  sponsorLink?: string;
}

export type Timeframe = 'top' | 'trending' | 'newest';
export type ViewMode = 'grid' | 'list';
export type PageRoute = 'home' | 'submit' | 'success' | 'advertise' | 'admin' | 'case-studies';

export interface ActivityLog {
  id: string;
  type: 'bid' | 'claim' | 'vote' | 'new_entry';
  message: string;
  timeAgo: string;
  avatar?: string;
  productName?: string;
  amount?: number;
  rank?: number;
}
