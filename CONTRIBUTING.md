# 🤝 Contributing to MarketingDB

Thank you for your interest in contributing to **MarketingDB**! Whether you want to submit a great marketing campaign, report an issue, or improve the codebase, this guide explains how.

---

## 🚀 1. How to Submit a Marketing Campaign

MarketingDB is built around community submissions of real, high-converting marketing campaigns, ad creatives, and growth tactics.

### Submission Guidelines:
1. **100% Free:** Anyone can submit a campaign directly from the website by clicking **"Submit Campaign — Free"** in the top navigation.
2. **Auto-Metadata Extraction:** Enter your website or campaign URL (e.g. `getseoo.com`). The platform will automatically pull your favicon, brand name, and suggested headline.
3. **Format & Category:** Select the appropriate marketing channel (UGC, Meta Ads, TikTok, X/Twitter, Landing Pages, Email, Copywriting, etc.).
4. **Direct Creative Asset Link:** Provide a link to the live creative asset (e.g. tweet URL, TikTok video URL, or YouTube breakdown).
5. **Clear Value Proposition:** Write a 1-sentence hook explaining what made the tactic successful (e.g. *“Turn Instagram Post Comments into Buyers with Automated DMs”*).

---

## 💻 2. Contributing to the Codebase

### Development Workflow
1. **Fork the repository** on GitHub.
2. **Clone your fork:**
   ```bash
   git clone https://github.com/<your-username>/MarketingDB-.git
   cd MarketingDB-
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a feature branch:**
   ```bash
   git checkout -b feature/my-new-feature
   ```
5. **Test locally:**
   ```bash
   npm run dev
   ```
6. **Verify build before pushing:**
   ```bash
   npm run build
   ```
7. **Commit & Push:**
   ```bash
   git commit -m "feat: add support for new marketing creative preview format"
   git push origin feature/my-new-feature
   ```
8. **Open a Pull Request** against the `main` branch.

---

## 🎨 Code Style & Quality
- **React & TypeScript:** Ensure strict typing for all new components and context methods in `src/types/index.ts`.
- **Styling:** Use CSS variables defined in `src/index.css` to maintain consistent design tokens across both Light and Dark modes.
- **Zero Heavy External Dependencies:** Prefer vanilla CSS and lightweight packages. Avoid bloated frameworks.

---

## 💬 Questions & Support
Have ideas or need assistance? Open a GitHub Issue or reach out via email at `contact@marketingdb.lol`.
