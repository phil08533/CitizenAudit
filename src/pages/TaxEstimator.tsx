import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, ExternalLink } from 'lucide-react'
import { TaxCalculator } from '../components/forms/TaxCalculator'
import { formatCurrency } from '../utils/formatters'
import type { TaxResult } from '../types'

export function TaxEstimator() {
  const [result, setResult] = useState<TaxResult | null>(null)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold">Tax Estimator</h1>
            </div>
            <p className="text-blue-100 max-w-xl">
              Enter your income details to see an estimated breakdown of how your federal taxes are spent across government programs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 lg:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Your Tax Calculator
              </h2>
              <TaxCalculator onResult={setResult} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Context card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">How This Works</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We calculate your estimated federal income tax using 2024 tax brackets and standard deductions, then allocate it proportionally based on the FY 2023 federal budget breakdown.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                This is an estimate for educational purposes. Actual tax liability may vary.
              </p>
            </motion.div>

            {/* Result highlight */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">
                  Your Biggest Contributions
                </h3>
                <div className="space-y-3">
                  {result.allocations
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 4)
                    .map(a => (
                      <div key={a.category} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{a.icon}</span>
                          <span className="text-sm text-slate-700 dark:text-slate-300">{a.category}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {formatCurrency(a.amount)}
                        </span>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Data source */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Data Sources</h3>
              <ul className="space-y-2">
                {[
                  { label: 'IRS Tax Brackets', href: 'https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024' },
                  { label: 'OMB FY2023 Budget', href: 'https://www.whitehouse.gov/omb/budget/' },
                  { label: 'CBO Budget Outlook', href: 'https://www.cbo.gov/publication/59238' },
                ].map(s => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
