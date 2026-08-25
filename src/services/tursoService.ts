import { createClient } from '@libsql/client/web';
import type { ProductItem, ActivityLog } from '../types';

// DB 1: Primary Campaigns, Rankings & Activities
export const tursoDb1 = createClient({
  url: 'https://marketingdblol-1-mishratanmay222.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODc2MDI5NjUsImlkIjoiMDFhMDM1NzAtMzgwMS03NzhjLThkNTctYjBhNjljNTE5OTIzIiwia2lkIjoiV2pFcWJwd21sMTJHaXZoNDVabDVvRXZBblZBWWtvMjhwWTZsakY5UlNLVSIsInJpZCI6ImQ3NjUwNTU3LTgzYjktNDk3MS1iNGY1LTY0YTM1NDVkOGYxNSJ9.dckgmEv0LLhx7Nm0rN5y8FMh1OqhP1jZVCgApTx4Xm279Rj-xp4wPGqkmx6CccXIUnEg6OvErjSIfvhOVHoWDA'
});

// DB 2: Media Storage (Images, Videos & Creative Assets)
export const tursoDb2 = createClient({
  url: 'https://marketing-db-2-mishratanmay222.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODc2MDI5OTEsImlkIjoiMDFhMDM1NzAtZTcwMS03MzNlLThkMzYtYTI0MDI0YTA0ZjE1Iiwia2lkIjoiV2pFcWJwd21sMTJHaXZoNDVabDVvRXZBblZBWWtvMjhwWTZsakY5UlNLVSIsInJpZCI6ImE4ZjRhMzVjLTk4ODItNDY5ZC1iMjE4LTMzNmJhYjc2YmQ0NyJ9.wLCCgi48DRsB68ahw3zFAXvPqcbR8VFWFQESh2UICw0H_yXFqimqt3heaLbofm9GDrR-aUwHdS1kE7fUNjrUAg'
});

export async function initTursoDatabases() {
  try {
    // Init DB 1 (Campaigns and Activities)
    await tursoDb1.execute(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT,
        description TEXT,
        url TEXT NOT NULL,
        displayUrl TEXT NOT NULL,
        logo TEXT,
        mediaType TEXT,
        assetLink TEXT,
        creatorName TEXT,
        creatorHandle TEXT,
        category TEXT,
        categories TEXT,
        metricsViews TEXT,
        metricsLikes TEXT,
        metricsImpressions TEXT,
        entryFee REAL DEFAULT 5,
        votes INTEGER DEFAULT 1,
        clicks INTEGER DEFAULT 0,
        submittedAt TEXT,
        createdAt INTEGER
      )
    `);

    await tursoDb1.execute(`
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        type TEXT,
        message TEXT,
        timeAgo TEXT,
        avatar TEXT,
        productName TEXT,
        rank INTEGER,
        createdAt INTEGER
      )
    `);

    // Init DB 2 (Media Storage, Pro Waitlist & Sponsor Orders)
    await tursoDb2.execute(`
      CREATE TABLE IF NOT EXISTS creative_media (
        id TEXT PRIMARY KEY,
        campaignId TEXT,
        mediaType TEXT,
        fileName TEXT,
        fileSizeBytes INTEGER,
        mediaData TEXT,
        createdAt INTEGER
      )
    `);

    await tursoDb2.execute(`
      CREATE TABLE IF NOT EXISTS pro_waitlist (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        source TEXT DEFAULT 'pro_access_section',
        createdAt INTEGER NOT NULL
      )
    `);

    await tursoDb2.execute(`
      CREATE TABLE IF NOT EXISTS sponsors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT,
        url TEXT NOT NULL,
        logo TEXT,
        email TEXT,
        paidStatus TEXT DEFAULT 'pending',
        createdAt INTEGER NOT NULL
      )
    `);

    // Init DB 1 (Campaigns, Activities & Votes & Sponsors)
    await tursoDb1.execute(`
      CREATE TABLE IF NOT EXISTS campaign_votes (
        campaignId TEXT NOT NULL,
        voterId TEXT NOT NULL,
        votedAt INTEGER NOT NULL,
        PRIMARY KEY (campaignId, voterId)
      )
    `);

    await tursoDb1.execute(`
      CREATE TABLE IF NOT EXISTS sponsors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT,
        url TEXT NOT NULL,
        logo TEXT,
        email TEXT,
        paidStatus TEXT DEFAULT 'pending',
        createdAt INTEGER NOT NULL
      )
    `);

    console.log('✅ Turso DB 1 and DB 2 initialized successfully!');
  } catch (err) {
    console.warn('Turso DB init warning:', err);
  }
}

// Fetch all campaigns from DB 1
export async function fetchCampaignsFromTurso(): Promise<ProductItem[]> {
  try {
    const res = await tursoDb1.execute(`SELECT * FROM campaigns ORDER BY votes DESC, clicks DESC`);
    if (!res || !res.rows || res.rows.length === 0) return [];

    return res.rows.map((row: any) => {
      let parsedCategories: string[] = [];
      try {
        parsedCategories = row.categories ? JSON.parse(row.categories) : [row.category];
      } catch {
        parsedCategories = [row.category];
      }

      return {
        id: row.id,
        name: row.name,
        tagline: row.tagline || '',
        description: row.description || '',
        url: row.url,
        displayUrl: row.displayUrl,
        logo: row.logo,
        mediaType: row.mediaType || 'url',
        assetLink: row.assetLink || row.url,
        creator: {
          name: row.creatorName || row.name,
          handle: row.creatorHandle || `@${row.name.toLowerCase()}`,
          avatar: row.logo,
          verified: false
        },
        category: row.category,
        categories: parsedCategories as any,
        metrics: row.metricsViews ? {
          views: row.metricsViews,
          likes: row.metricsLikes,
          impressions: row.metricsImpressions
        } : undefined,
        entryFee: Number(row.entryFee) || 5,
        votes: Number(row.votes) || 1,
        clicks: Number(row.clicks) || 0,
        submittedAt: row.submittedAt || 'Recently'
      };
    });
  } catch (err) {
    console.warn('Error fetching from Turso DB 1:', err);
    return [];
  }
}

// Fetch activities from DB 1
export async function fetchActivitiesFromTurso(): Promise<ActivityLog[]> {
  try {
    const res = await tursoDb1.execute(`SELECT * FROM activities ORDER BY createdAt DESC LIMIT 20`);
    if (!res || !res.rows || res.rows.length === 0) return [];

    return res.rows.map((row: any) => ({
      id: row.id,
      type: row.type as any,
      message: row.message,
      timeAgo: row.timeAgo || 'Just now',
      avatar: row.avatar,
      productName: row.productName,
      rank: Number(row.rank) || undefined
    }));
  } catch (err) {
    console.warn('Error fetching activities from Turso:', err);
    return [];
  }
}

// Voter ID / IP Tracking
let cachedVoterId = '';

export async function getVoterId(): Promise<string> {
  if (cachedVoterId) return cachedVoterId;
  try {
    const saved = localStorage.getItem('marketingdb_voter_id');
    if (saved) {
      cachedVoterId = saved;
      return saved;
    }
  } catch {}

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();
    if (data && data.ip) {
      cachedVoterId = 'ip_' + data.ip;
      try { localStorage.setItem('marketingdb_voter_id', cachedVoterId); } catch {}
      return cachedVoterId;
    }
  } catch {}

  const randomId = 'client_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  cachedVoterId = randomId;
  try { localStorage.setItem('marketingdb_voter_id', randomId); } catch {}
  return randomId;
}

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

// Record vote with 24-hour per IP enforcement
export async function recordVote24hInTurso(campaignId: string, voterId: string): Promise<{ success: boolean; alreadyVoted?: boolean; nextVoteAt?: number }> {
  try {
    const now = Date.now();
    // Check existing vote
    const checkRes = await tursoDb1.execute({
      sql: `SELECT votedAt FROM campaign_votes WHERE campaignId = ? AND voterId = ?`,
      args: [campaignId, voterId]
    });

    if (checkRes.rows && checkRes.rows.length > 0) {
      const lastVotedAt = Number(checkRes.rows[0].votedAt) || 0;
      if (now - lastVotedAt < TWENTY_FOUR_HOURS_MS) {
        return { success: false, alreadyVoted: true, nextVoteAt: lastVotedAt + TWENTY_FOUR_HOURS_MS };
      }
    }

    // Insert or update vote timestamp
    await tursoDb1.execute({
      sql: `
        INSERT INTO campaign_votes (campaignId, voterId, votedAt) 
        VALUES (?, ?, ?)
        ON CONFLICT(campaignId, voterId) DO UPDATE SET votedAt = excluded.votedAt
      `,
      args: [campaignId, voterId, now]
    });

    // Increment votes count in campaigns table
    await tursoDb1.execute({
      sql: `UPDATE campaigns SET votes = votes + 1 WHERE id = ?`,
      args: [campaignId]
    });

    return { success: true };
  } catch (err) {
    console.warn('Error recording 24h vote in Turso:', err);
    return { success: false };
  }
}

// Fetch all votes made by this voter
export async function fetchUserVotes24hFromTurso(voterId: string): Promise<Record<string, number>> {
  try {
    const res = await tursoDb1.execute({
      sql: `SELECT campaignId, votedAt FROM campaign_votes WHERE voterId = ?`,
      args: [voterId]
    });
    if (!res || !res.rows) return {};
    const map: Record<string, number> = {};
    for (const row of res.rows) {
      map[String(row.campaignId)] = Number(row.votedAt) || 0;
    }
    return map;
  } catch {
    return {};
  }
}

// Upload Media Asset to DB 2 & Campaign Record to DB 1
export async function saveCampaignToTurso(
  campaign: ProductItem,
  mediaData?: string,
  mediaFileName?: string
) {
  try {
    const categoriesJson = JSON.stringify(campaign.categories || [campaign.category]);
    
    // 1. Insert Campaign into DB 1
    await tursoDb1.execute({
      sql: `
        INSERT INTO campaigns (
          id, name, tagline, description, url, displayUrl, logo, mediaType, assetLink,
          creatorName, creatorHandle, category, categories,
          metricsViews, metricsLikes, metricsImpressions,
          entryFee, votes, clicks, submittedAt, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        campaign.id,
        campaign.name,
        campaign.tagline,
        campaign.description,
        campaign.url,
        campaign.displayUrl,
        campaign.logo || '',
        campaign.mediaType || 'url',
        campaign.assetLink || campaign.url,
        campaign.creator?.name || campaign.name,
        campaign.creator?.handle || `@${campaign.name.toLowerCase()}`,
        campaign.category,
        categoriesJson,
        campaign.metrics?.views || '',
        campaign.metrics?.likes || '',
        campaign.metrics?.impressions || '',
        campaign.entryFee,
        campaign.votes,
        campaign.clicks,
        campaign.submittedAt || 'Just now',
        Date.now()
      ]
    });

    // 2. Insert Media Blob into DB 2 if exists
    if (mediaData && mediaData.startsWith('data:')) {
      const fileSizeBytes = Math.round((mediaData.length * 3) / 4);
      await tursoDb2.execute({
        sql: `
          INSERT INTO creative_media (
            id, campaignId, mediaType, fileName, fileSizeBytes, mediaData, createdAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          `media-${campaign.id}`,
          campaign.id,
          campaign.mediaType || 'image',
          mediaFileName || `${campaign.name}-asset`,
          fileSizeBytes,
          mediaData,
          Date.now()
        ]
      });
      console.log(`✅ Saved creative asset to Turso DB 2 for campaign ${campaign.name}`);
    }

    console.log(`✅ Saved campaign ${campaign.name} to Turso DB 1`);
  } catch (err) {
    console.error('Error saving to Turso databases:', err);
  }
}

// Push Up vote in DB 1 (fallback direct increment)
export async function upvoteInTurso(campaignId: string, newVotes: number) {
  try {
    await tursoDb1.execute({
      sql: `UPDATE campaigns SET votes = ? WHERE id = ?`,
      args: [newVotes, campaignId]
    });
  } catch (err) {
    console.warn('Error upvoting in Turso:', err);
  }
}

// Record click view in DB 1
export async function recordClickInTurso(campaignId: string, newClicks: number) {
  try {
    await tursoDb1.execute({
      sql: `UPDATE campaigns SET clicks = ? WHERE id = ?`,
      args: [newClicks, campaignId]
    });
  } catch (err) {
    console.warn('Error updating clicks in Turso:', err);
  }
}

// Save activity to DB 1
export async function saveActivityToTurso(activity: ActivityLog) {
  try {
    await tursoDb1.execute({
      sql: `
        INSERT INTO activities (id, type, message, timeAgo, avatar, productName, rank, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        activity.id,
        activity.type,
        activity.message,
        activity.timeAgo,
        activity.avatar || '',
        activity.productName || '',
        activity.rank || 0,
        Date.now()
      ]
    });
  } catch (err) {
    console.warn('Error saving activity to Turso:', err);
  }
}

// Save Pro Waitlist Email to DB 2
export async function saveProWaitlistEmailToTurso(email: string): Promise<{ success: boolean }> {
  try {
    const id = 'pro-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    await tursoDb2.execute({
      sql: `
        INSERT INTO pro_waitlist (id, email, source, createdAt)
        VALUES (?, ?, 'pro_access_section', ?)
        ON CONFLICT(email) DO UPDATE SET createdAt = excluded.createdAt
      `,
      args: [id, email.trim().toLowerCase(), Date.now()]
    });
    console.log(`✅ Saved Pro waitlist email to Turso DB 2: ${email}`);
    return { success: true };
  } catch (err) {
    console.warn('Error saving waitlist email to Turso DB 2:', err);
    return { success: false };
  }
}

// Save Sponsor submission to DB 2 & DB 1
export async function saveSponsorToTurso(sponsor: {
  name: string;
  tagline?: string;
  url: string;
  logo?: string;
  email?: string;
}): Promise<{ success: boolean }> {
  try {
    const id = 'sponsor-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const now = Date.now();

    // 1. Save all details to DB 2 (Media & Storage Database)
    try {
      await tursoDb2.execute({
        sql: `
          INSERT INTO sponsors (id, name, tagline, url, logo, email, paidStatus, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
        `,
        args: [
          id,
          sponsor.name,
          sponsor.tagline || '',
          sponsor.url,
          sponsor.logo || '',
          sponsor.email || '',
          now
        ]
      });
      console.log(`✅ Saved Sponsor details to Turso DB 2: ${sponsor.name}`);
    } catch (err2) {
      console.warn('Error saving sponsor to DB 2:', err2);
    }

    // 2. Also save to DB 1 (Primary Database)
    try {
      await tursoDb1.execute({
        sql: `
          INSERT INTO sponsors (id, name, tagline, url, logo, email, paidStatus, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
        `,
        args: [
          id,
          sponsor.name,
          sponsor.tagline || '',
          sponsor.url,
          sponsor.logo || '',
          sponsor.email || '',
          now
        ]
      });
      console.log(`✅ Saved Sponsor details to Turso DB 1: ${sponsor.name}`);
    } catch (err1) {
      console.warn('Error saving sponsor to DB 1:', err1);
    }

    return { success: true };
  } catch (err) {
    console.warn('Error saving sponsor to databases:', err);
    return { success: false };
  }
}
