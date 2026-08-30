import fs from 'fs';
import path from 'path';
import { LONG_TAIL_KEYWORDS } from '../src/data/longTailKeywords.ts';

const BASE_URL = 'https://marketingdb.lol';
const TODAY = new Date().toISOString().split('T')[0];

const CATEGORIES = [
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

function generateSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Main Pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/case-studies', changefreq: 'weekly', priority: '0.9' },
    { url: '/submit', changefreq: 'monthly', priority: '0.9' },
    { url: '/advertise', changefreq: 'monthly', priority: '0.8' }
  ];

  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Category Pages
  for (const cat of CATEGORIES) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/?category=${cat}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  // Programmatic SEO Keywords
  for (const kw of LONG_TAIL_KEYWORDS) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/?kw=${kw.slug}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.75</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

const sitemapContent = generateSitemapXml();
const targetPath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(targetPath, sitemapContent, 'utf8');

console.log(`Successfully updated sitemap at ${targetPath} with ${4 + CATEGORIES.length + LONG_TAIL_KEYWORDS.length} URLs (lastmod: ${TODAY}).`);
