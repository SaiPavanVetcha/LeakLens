# LeakLens

**Find where your money is leaking — and fix it.**

LeakLens is a decision-support platform for retail & e-commerce managers.  
It detects revenue leaks, explains the root cause, and recommends concrete actions.

---

## What’s Inside

| Folder | Description |
|--------|-------------|
| `data/` | 5 CSV datasets (customers, products, transactions, inventory, campaigns) |
| `models/` | 4 trained ML models (`.joblib`) |
| `notebooks/` | EDA + model training notebooks |
| `gui/` | Full Next.js web application (dashboard) |

---

## Key Findings (from real data)

| Leak Type | Impact | Evidence |
|-----------|--------|----------|
| Inverted Pricing | **$1,128,877** | 76 products where `unit_cost > list_price` |
| Returns + Cancellations | **$1,622,171** | 1,431 returns + 1,689 cancellations |
| Ghost Ad Spend | **$345,616** | 88 campaigns with `conversions > clicks` |
| Stockout Risk | 34 SKUs | 4 critical SKUs with < 7 days runway |

---

## Quick Start — Web Dashboard

```bash
cd gui
npm install --legacy-peer-deps
npm run dev
```

Open → **http://localhost:3000**

### Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Landing | `/` | Hero + live metrics |
| Dashboard | `/dashboard` | KPIs, alerts, charts |
| Returns | `/dashboard/returns` | Cancellations & returns analysis |
| Inventory | `/dashboard/inventory` | Stockout risk watchlist |
| Campaigns | `/dashboard/campaigns` | Reported vs return-adjusted ROAS |
| Actions | `/dashboard/actions` | Recommended actions (interactive) |

---

## Quick Start — Notebooks & Models

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
jupyter notebook
```

Open notebooks in order:

1. `notebooks/01_EDA.ipynb`
2. `notebooks/02_loss_risk_model.ipynb`
3. `notebooks/03_anomaly_detection.ipynb`
4. `notebooks/04_stockout_risk.ipynb`
5. `notebooks/05_campaign_efficiency.ipynb`

---

## Tech Stack

**Dashboard**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts + Lucide React
- Client-side CSV analysis (PapaParse)

**ML / Data**
- pandas, scikit-learn, joblib
- Models: Decision Tree, Isolation Forest, Logistic Regression, attribution logic

---

## Data Sources

All metrics in the dashboard are calculated **live** from the real CSV files:

- `data/products.csv` → 250 products
- `data/customers.csv` → 3,000 customers
- `data/transactions.csv` → 18,000 orders
- `data/inventory.csv` → 5,000 records
- `data/campaigns.csv` → 1,200 campaigns

No hardcoded fake numbers are used for the core KPIs.

---

## Project Structure

```
LeakLens/
├── data/                  # Source CSVs
├── models/                # Trained .joblib models
├── notebooks/             # Analysis & training
├── gui/                   # Next.js web app
│   ├── public/data/       # CSVs served to the browser
│   ├── src/
│   │   ├── app/           # Pages (landing + dashboard)
│   │   ├── components/    # UI components
│   │   ├── context/       # Data provider
│   │   ├── lib/           # analytics.ts, csvParser.ts
│   │   └── types/
│   └── README.md
├── requirements.txt
└── README.md
```

---

## How the Dashboard Works

1. Loads the 5 CSV files in the browser
2. Joins transactions with products
3. Calculates revenue, profit, leaks, return rates, stockout risk, and campaign efficiency
4. Surfaces the biggest problems with evidence
5. Gives concrete recommended actions with estimated weekly savings

---

## Team

**Team Delta**

---

## License

This project is for educational / demonstration purposes.
