# LeakLens — Revenue Leak Detection & Diagnostic Platform

LeakLens is an enterprise decision-support tool designed for retail and e-commerce managers to:
1. **Detect revenue leaks** across catalog pricing, marketing channels, and inventory logistics.
2. **Understand the root cause** using explainable machine learning models (Decision Trees, Isolation Forests, Velocity Estimation).
3. **Execute concrete recommended actions** with quantified weekly dollar recovery and confidence ratings.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ (tested on Node.js v20 / v22 / v24)
- **npm** or **pnpm** or **yarn**

### 1. Navigate to the `gui/` directory
```bash
cd gui
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be live at: **[http://localhost:3000](http://localhost:3000)**

---

## 📊 Key Findings from Dataset & Machine Learning Models

LeakLens performs client-side analysis across 18,000 retail transactions, 250 catalog SKUs, 5,000 inventory balance records, and 1,200 campaign ad sets:

| Vulnerability | Measured Business Impact | Root Cause & Evidence | Prescribed Playbook |
| :--- | :--- | :--- | :--- |
| **Inverted Unit Pricing** | **$1,128,877 lost** | **76 of 250 products** have `unit_cost > list_price`. Drives 93% of all store margin losses. | Establish hard catalog price floors (+18% min gross margin). |
| **Ghost Marketing Spend** | **$345,616 wasted** | **88 campaigns** report impossible attribution (`conversions > clicks`), skewing ROAS. | Pause corrupt ad sets and reallocate to verified channels. |
| **Returns & Cancellations** | **$1,622,171 uncaptured** | **1,431 returns ($760K)** and **1,689 cancellations ($862K)**, concentrated in App & Web. | Pre-dispatch phone/SMS verification and sizing guide overhaul. |
| **Stockout Risk (< 7 Days)** | **4 critical SKUs** | PR0039, PR0113, PR0201, and PR0242 have $< 7$ days of stock runway with 14d supplier lead times. | Expedite air freight purchase orders. |

---

## 🖥️ Screen Architecture

1. **Landing Page (`/`)**:
   - Modern SaaS design with Linear/Vercel aesthetics.
   - Headline: *"Find where your money is leaking — and fix it"*.
   - Live audit ticker showing real-time metrics computed directly from transactions.
   - 3-step diagnostic pipeline walkthrough and model card previews.

2. **Executive Overview Dashboard (`/dashboard`)**:
   - Critical P0 Alert Banner for catalog cost-inversion leaks.
   - 4 KPI cards: 30-Day Revenue ($577K), Active Leaks ($1.21M), Return Rate (8.0%), Stockout Exposure (34 SKUs).
   - Monthly Revenue vs Margin Bleed AreaChart with interactive curve filters.
   - Category Margin Breakdown & Root Cause Donut.

3. **Cancellations & Returns Intelligence (`/dashboard/returns`)**:
   - Ranked problems ordered by dollar impact.
   - Omnichannel comparison: App ($305K return loss) vs Web ($332K return loss) vs Store.
   - Filterable category return vulnerability table with search.

4. **Inventory & Stockout Runway (`/dashboard/inventory`)**:
   - 7-Day critical stockout watchlist for fast-moving items.
   - Daily demand velocity, days remaining, supplier delay risk.
   - Filterable inventory ledger with risk badges.

5. **Campaign Efficiency & True ROAS (`/dashboard/campaigns`)**:
   - Reported Gross ROAS vs True Return-Adjusted ROAS.
   - Flagged list of 88 ghost attribution campaigns ($345K wasted spend).
   - Category ad return comparison highlighting Beauty vertical underperformance.

6. **Recommended Remediation Playbooks (`/dashboard/actions`)**:
   - Actionable cards with Category, Urgency, ML Confidence %, and "Why Flagged" evidence.
   - Interactive **"Execute Playbook"** toggle buttons.
   - Real-time weekly pipeline savings meter persisted in `localStorage`.

---

## 🛠️ Tech Stack & Design System

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism and cyan glow tokens
- **Data Engine**: PapaParse for instant client-side CSV parsing from `/public/data/`
- **Charts**: Recharts (ResponsiveContainer, AreaChart, BarChart, PieChart)
- **Icons**: Lucide React
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (financial numbers)

---

## 📂 Source Code Layout

```
gui/
├── public/
│   └── data/               # 5 CSV datasets (products, customers, transactions, inventory, campaigns)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout + DataProvider
│   │   ├── page.tsx        # Screen 1: Landing Page
│   │   ├── globals.css     # Dark glassmorphism theme & glow utilities
│   │   └── dashboard/
│   │       ├── layout.tsx  # Dashboard layout with sidebar
│   │       ├── page.tsx    # Screen 2: Executive Overview
│   │       ├── returns/    # Screen 3: Cancellations & Returns
│   │       ├── inventory/  # Screen 4: Inventory Risk
│   │       ├── campaigns/  # Screen 5: Campaign Efficiency
│   │       └── actions/    # Screen 6: Recommended Actions
│   ├── components/
│   │   ├── shared/         # Navbar, Status beacon
│   │   └── dashboard/      # KPI cards, Alert banner, Charts
│   ├── context/
│   │   └── DataContext.tsx # Global state, CSV ingestion, localStorage sync
│   ├── lib/
│   │   ├── analytics.ts    # Financial & ML calculation algorithms
│   │   ├── csvParser.ts    # PapaParse async loader
│   │   └── utils.ts        # Currency, percent, and class formatters
│   └── types/
│       └── index.ts        # Typed TypeScript schemas
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
