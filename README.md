# Citizen Audit — Follow the Money

A free, open-source civic transparency web app that makes U.S. government spending understandable to everyone.

**Live site:** https://phil08533.github.io/CitizenAudit/

## Features

- **Tax Estimator** — Enter your income, filing status, and dependents to see a personalized breakdown of where your federal taxes go
- **Spending Explorer** — Browse all federal agencies, their budgets, and major contracts with search and filtering
- **Agency Detail Pages** — In-depth view with budget history charts and contract data
- **Representative Lookup** — Find your senators and House member by ZIP code (live API or demo mode)
- **Contact Action Center** — Pre-written email templates for reaching your elected officials
- **Dark/Light Mode** — System-aware theme with manual toggle
- **100% Static** — No server, no database, no login required

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| TailwindCSS v4 | Styling |
| Recharts | Charts & data visualization |
| Framer Motion | Animations |
| React Router v7 | Client-side routing |
| Lucide React | Icons |

## Data Sources

All data comes from official U.S. government sources:

- [USASpending.gov API](https://api.usaspending.gov) — Agency spending, contracts
- [Fiscal Data Treasury](https://fiscaldata.treasury.gov) — National debt, interest payments
- [OMB Budget](https://www.whitehouse.gov/omb/budget/) — Budget category allocations
- [IRS 2024 Tax Brackets](https://www.irs.gov) — Tax calculations
- [Google Civic Information API](https://developers.google.com/civic-information) — Representative lookup

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173/CitizenAudit/

## Build & Deploy to GitHub Pages

### 1. Build

```bash
npm run build
```

This outputs a static site to `dist/`.

### 2. GitHub Pages Setup

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. The included `.github/workflows/deploy.yml` will automatically build and deploy on every push to `main`

Your site will be live at `https://<your-username>.github.io/CitizenAudit/`

### 3. (Optional) Google Civic API

For live representative lookups, create a `.env.local` file:

```env
VITE_GOOGLE_CIVIC_API_KEY=your_api_key_here
```

Get a free key at: https://developers.google.com/civic-information

Without a key, the app shows demo representative data.

## Project Structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── charts/      # Pie, Bar, Area charts
│   ├── cards/       # AgencyCard, RepresentativeCard
│   ├── ui/          # StatCard, SearchFilter, LoadingSkeleton
│   └── forms/       # TaxCalculator
├── pages/           # All 8 pages
├── services/        # API integration layer
├── data/            # Static JSON mock data
├── hooks/           # useTheme, useLocalStorage
├── types/           # TypeScript interfaces
└── utils/           # Tax calculator, formatters
```

## License

MIT — Free to use, fork, and improve.
