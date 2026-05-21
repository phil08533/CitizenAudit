import { motion } from 'framer-motion'
import { ExternalLink, Database, AlertCircle } from 'lucide-react'
import { FoundingFatherBadge } from '../components/ui/FoundingFatherBadge'
import { FOUNDING_FATHERS } from '../data/foundingFathers'

const SOURCES = [
  {
    category: 'Federal Budget & Spending',
    items: [
      {
        name: 'USASpending.gov API',
        url: 'https://api.usaspending.gov',
        desc: 'Official federal spending data including contracts, grants, and agency outlays.',
        used: 'Agency budgets, contracts, spending categories',
      },
      {
        name: 'Fiscal Data Treasury API',
        url: 'https://fiscaldata.treasury.gov/api-documentation/',
        desc: 'U.S. Treasury financial data including the national debt and interest payments.',
        used: 'National debt, debt per citizen, annual interest payments',
      },
      {
        name: 'OMB Budget of the U.S. Government',
        url: 'https://www.whitehouse.gov/omb/budget/',
        desc: 'The official White House Office of Management and Budget annual budget documents.',
        used: 'Budget category percentages, agency allocations',
      },
      {
        name: 'Congressional Budget Office',
        url: 'https://www.cbo.gov',
        desc: 'Independent nonpartisan analysis of the federal budget and economic outlook.',
        used: 'Budget projections, spending trend analysis',
      },
    ],
  },
  {
    category: 'Tax Information',
    items: [
      {
        name: 'IRS Rev. Proc. 2023-34',
        url: 'https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024',
        desc: 'Official IRS 2024 tax bracket adjustments for inflation.',
        used: '2024 federal income tax brackets, standard deductions',
      },
      {
        name: 'IRS Publication 17',
        url: 'https://www.irs.gov/pub/irs-pdf/p17.pdf',
        desc: 'Comprehensive guide to federal income tax rules.',
        used: 'Child tax credit rules, filing status definitions',
      },
    ],
  },
  {
    category: 'Congress & Representatives',
    items: [
      {
        name: 'Congress.gov API',
        url: 'https://api.congress.gov',
        desc: 'Official Library of Congress API for congressional data.',
        used: 'Legislation, member information',
      },
      {
        name: 'Google Civic Information API',
        url: 'https://developers.google.com/civic-information',
        desc: 'Provides representative lookup by address/ZIP code.',
        used: 'ZIP-to-representative lookup (requires API key)',
      },
    ],
  },
]

const METHODOLOGY_NOTES = [
  {
    title: 'Tax Calculation Methodology',
    content:
      'Federal income tax is estimated using 2024 tax brackets and standard deductions. We apply the standard deduction (not itemized) and a simplified child tax credit calculation. The result is an estimate — actual liability depends on many additional factors including FICA taxes, state taxes, AMT, and itemized deductions. For authoritative calculations, consult a tax professional or use IRS Free File.',
  },
  {
    title: 'Spending Category Allocations',
    content:
      'Percentage allocations are based on OMB FY 2023 Actual Outlays. Numbers are rounded and may not sum to exactly 100% due to rounding. "Interest on Debt" refers to net interest payments. All figures are in nominal dollars.',
  },
  {
    title: 'Agency Budget Figures',
    content:
      'Agency budgets represent total outlays (not appropriations) for FY 2023 where available from USASpending.gov. Some figures include mandatory spending (like Social Security benefit payments) which far exceeds discretionary appropriations. This is intentional — it reflects total cost, not just the discretionary portion Congress controls each year.',
  },
  {
    title: 'National Debt',
    content:
      'The national debt figure represents total public debt outstanding as reported by the U.S. Treasury. "Debt per citizen" is calculated by dividing total debt by the current U.S. population estimate. This is a simplified metric — the actual per-taxpayer burden differs significantly.',
  },
  {
    title: 'Representative Data',
    content:
      'Live representative lookup uses the Google Civic Information API when an API key is configured. Without a key, demo/sample data is shown. Official contact information changes — always verify current details on congress.gov or the official .gov website.',
  },
]

export function Sources() {
  return (
    <div className="min-h-screen bg-[#f8f7f2] dark:bg-slate-950">
      {/* Header */}
      <section className="hero-gradient stars-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <h1 className="text-3xl font-bold font-serif">Sources & Methodology</h1>
                </div>
                <p className="text-white/75 max-w-xl mb-4">
                  Every number on this site comes from official U.S. government data. Here's exactly where each piece of information originates.
                </p>
                <FoundingFatherBadge father={FOUNDING_FATHERS.sources} variant="compact" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Data Sources */}
        {SOURCES.map((group, gi) => (
          <motion.section
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.05 }}
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map(item => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 text-sm"
                      >
                        {item.name}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Used for:</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{item.used}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Methodology Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Methodology Notes</h2>
          <div className="space-y-4">
            {METHODOLOGY_NOTES.map(note => (
              <details
                key={note.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <summary className="px-5 py-4 font-semibold text-slate-900 dark:text-white cursor-pointer text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  {note.title}
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                  {note.content}
                </div>
              </details>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 p-6 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Disclaimer</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Citizen Audit is an educational and civic engagement tool. All tax calculations are estimates for illustrative purposes only and should not be used for actual tax filing. Government spending figures represent best available public data and may not reflect real-time changes. For official information, always consult the primary government source directly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
