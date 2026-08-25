# 🏗️ MarketingDB Architecture

This document provides a technical deep-dive into the architectural design, data flow, state management, and infrastructure powering **MarketingDB**.

---

## 📐 System Architecture Diagram

```
+-------------------------------------------------------------+
|                      Client Browser                         |
|  (React 19 + TypeScript + Vite SPA on Cloudflare Edge)       |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
+-----------------------+             +-----------------------+
|     Turso DB 1        |             |     Turso DB 2        |
| (Primary SQL Database)|             | (Creative & Pro Data) |
|                       |             |                       |
| - campaigns           |             | - creative_media      |
| - campaign_votes      |             | - pro_waitlist        |
| - activities          |             |                       |
| - sponsors            |             |                       |
+-----------------------+             +-----------------------+
```

---

## 🧩 Key Architectural Layers

### 1. Presentation Layer (React 19 + TypeScript)
- **Component Model:** Fully modular components located in `src/components/`, including leaderboard listings, live statistic tickers, modal viewers, and submission engines.
- **Styling Architecture:** Implemented with pure CSS design tokens (`src/index.css`) supporting dynamic theme variables (Dark/Light mode) without the runtime overhead of heavy CSS-in-JS frameworks.
- **Audio Micro-Interactions:** Custom Web Audio API synthesizer (`src/utils/sound.ts`) providing subtle auditory feedback on upvotes and interactions.

### 2. State & Context Layer (`ProductContext.tsx`)
- Centralized state orchestrator providing:
  - Optimistic UI updates for instant push-up increments.
  - Category filtering and search query parsing.
  - Active modal dispatchers (preview, submission, outbid, and legal views).
  - Synchronized database polling and local storage caching.

### 3. Edge Database Layer (Turso LibSQL)
- **Database 1 (Primary Hub):**
  - `campaigns`: Core campaign records, URLs, logos, metrics, and aggregated vote scores.
  - `campaign_votes`: Composite primary key `(campaignId, voterId)` enforcing 24-hour rate limiting per voter IP.
  - `activities`: Live audit trail of community upvotes and new submissions.
  - `sponsors`: Featured partner slots and direct dofollow backlinks.
- **Database 2 (Media & Pro Vault):**
  - `creative_media`: Base64 / binary media assets and video previews.
  - `pro_waitlist`: High-intent user waitlist for pro marketing breakdowns.

### 4. Metadata Engine (`productHelper.ts`)
- Client-side heuristic parser extracting:
  - Clean brand names from raw URLs.
  - Favicon URLs via Google's high-resolution favicon service.
  - Category classification and default tags.

### 5. Deployment & Edge Hosting (Cloudflare Pages)
- Continuous deployment pipeline triggered on pushes to the `main` branch.
- Instant global distribution via Cloudflare's 300+ edge data centers.
- Ultra-low latency static asset delivery.
