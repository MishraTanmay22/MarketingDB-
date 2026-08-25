# 🚀 MarketingDB (`marketingdb.lol`)

> **The community-curated leaderboard and library of the best high-converting marketing campaigns, ads, UGC hooks, copywriting angles, and growth playbooks.**

[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20with-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://marketingdb.pages.dev)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turso DB](https://img.shields.io/badge/Database-Turso%20LibSQL-4FF8D2?style=for-the-badge&logo=sqlite&logoColor=black)](https://turso.tech)
[![Vite](https://img.shields.io/badge/Bundler-Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

---

## 🌟 Overview

**MarketingDB** is a lightweight, high-performance community leaderboard built for indie founders, performance marketers, growth hackers, and content creators. 

Instead of scouring Twitter threads, TikTok feeds, and Facebook Ad Libraries for marketing inspiration, MarketingDB curates top-performing marketing angles in one real-time, interactive leaderboard.

### Key Highlights:
- 🏆 **Community Push-Up Leaderboard:** Upvote the sharpest marketing campaigns, TikTok creatives, UGC hooks, and email flows.
- ⚡ **Instant Metadata Auto-Sync:** Type any website domain or campaign link; brand favicons, titles, and pitches are automatically extracted.
- 🎬 **Multi-Format Creative Preview:** Supports full-screen modal previews for videos, slides, Twitter breakdowns, and landing page case studies.
- 🔍 **Real-Time Category Filtering & Search:** Filter by UGC, Meta Ads, TikTok, Tweets/X, YouTube, Email, Copywriting, Branding, and Organic tactics.
- 🛡️ **24-Hour IP Vote Protection:** Fair community voting mechanism powered by distributed Turso LibSQL databases.
- ☕ **Independent Side Project Model:** No corporate paywalls, tracking spam, or bloated subscription plans. Supported directly by community coffee sponsorships.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Custom Modern CSS Tokens (Glassmorphism, Light/Dark Modes, Responsive Grid, Micro-animations)
- **Icons:** [Lucide React](https://lucide.dev)
- **Database / Backend:** [Turso](https://turso.tech) (LibSQL Distributed SQLite on the Edge)
- **Bundler:** Vite 8
- **Hosting & CI/CD:** Cloudflare Pages

---

## 🚀 Quick Start

### Prerequisites
- Node.js `18.x` or later
- npm or pnpm / yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MishraTanmay22/MarketingDB-.git
cd MarketingDB-

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

---

## 📁 Project Structure

```
marketingdb/
├── public/                 # Static assets, logos, and creative media
├── src/
│   ├── assets/             # Vector icons & imagery
│   ├── components/         # Modular React UI components
│   │   ├── Navbar.tsx             # Header, quick filters & theme switcher
│   │   ├── LiveStatsBar.tsx       # Real-time campaign stats ticker
│   │   ├── LeaderboardList.tsx    # Upvotable ranked cards
│   │   ├── ProductGridView.tsx    # Grid display view
│   │   ├── SubmissionPage.tsx     # 100% Free campaign submitter
│   │   ├── AdvertisePage.tsx      # Sponsor spotlight & Buy Me a Coffee flow
│   │   ├── AdvertiseSection.tsx   # Sidebar sponsor slots
│   │   ├── ProAccessSection.tsx   # Curated marketing vault & waitlist
│   │   ├── ProductPreviewModal.tsx# Creative breakdown modal
│   │   ├── HowItWorksModal.tsx    # Platform mechanics guide
│   │   ├── LegalModal.tsx         # Privacy, Terms & Contact
│   │   └── Footer.tsx             # Footer links & community badges
│   ├── context/
│   │   └── ProductContext.tsx     # Global state management & caching
│   ├── services/
│   │   └── tursoService.ts        # Turso LibSQL client & database operations
│   ├── types/
│   │   └── index.ts               # TypeScript schemas & interfaces
│   ├── utils/
│   │   ├── productHelper.ts       # Domain parser & auto-fetch metadata
│   │   └── sound.ts               # Web Audio API audio feedback
│   ├── App.tsx                    # Root routing & layout view
│   ├── index.css                  # Design system tokens & animations
│   └── main.tsx                   # React app entry point
├── package.json
└── vite.config.ts
```

---

## 🤝 Contributing & Submitting

Want to share a high-performing ad, UGC hook, or breakdown? Check out [CONTRIBUTING.md](CONTRIBUTING.md).

For upcoming features and roadmap, see [ROADMAP.md](ROADMAP.md).  
For technical architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
