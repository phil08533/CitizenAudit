import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, User, DollarSign, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import type { SpendingCategory, SubCategory } from '../../types'

interface Props {
  category: SpendingCategory | null
  onClose: () => void
}

function FraudBadge({ amount, pct }: { amount: number; pct: number }) {
  const severity = pct > 10 ? 'high' : pct > 5 ? 'medium' : 'low'
  const cls = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800',
  }[severity]
  if (amount === 0) return (
    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 border border-slate-200 dark:border-slate-600">
      No fraud risk
    </span>
  )
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cls}`}>
      ~{formatCurrency(amount, true)} fraud est. ({formatPercent(pct)})
    </span>
  )
}

function SubCategoryCard({ sub }: { sub: SubCategory }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{sub.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub.leadTitle}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-slate-900 dark:text-white text-sm">{formatCurrency(sub.amount, true)}</p>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{sub.description}</p>

      {sub.spendingItems.length > 0 && (
        <ul className="space-y-1 mb-3">
          {sub.spendingItems.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <ChevronRight className="w-3 h-3 shrink-0 mt-0.5 text-blue-400" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {sub.fraudEstimate && sub.fraudEstimate.amount > 0 && (
        <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-xs font-semibold text-red-700 dark:text-red-400">
              Fraud/Waste: ~{formatCurrency(sub.fraudEstimate.amount, true)} ({formatPercent(sub.fraudEstimate.percentage)})
            </span>
          </div>
          {sub.fraudEstimate.examples.map((ex, i) => (
            <p key={i} className="text-xs text-red-600 dark:text-red-400 ml-5 leading-snug">• {ex}</p>
          ))}
          <p className="text-xs text-slate-400 mt-1.5 ml-5">Source: {sub.fraudEstimate.source}</p>
        </div>
      )}
    </div>
  )
}

export function CategoryDetailPanel({ category, onClose }: Props) {
  return (
    <AnimatePresence>
      {category && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl z-50 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-5 border-b border-slate-200 dark:border-slate-700 shrink-0"
              style={{ borderLeftColor: category.color, borderLeftWidth: 4 }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: category.color }} />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">{category.name}</h2>
                </div>
                <p className="text-2xl font-bold" style={{ color: category.color }}>
                  {formatCurrency(category.amount, true)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{formatPercent(category.percentage)} of total federal budget · FY 2023</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{category.description}</p>

              {/* Leadership */}
              {category.lead && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{category.lead}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{category.leadTitle}</p>
                    {category.leadWebsite && (
                      <a
                        href={category.leadWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 mt-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Official Website
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* What it's spent on */}
              {category.spendingItems && category.spendingItems.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> What This Money Pays For
                  </h3>
                  <ul className="space-y-2">
                    {category.spendingItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fraud & Waste */}
              {category.fraudEstimate && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Fraud & Waste Estimates
                  </h3>
                  <div className={`rounded-xl border p-4 ${
                    category.fraudEstimate.amount === 0
                      ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <FraudBadge amount={category.fraudEstimate.amount} pct={category.fraudEstimate.percentage} />
                    </div>
                    {category.fraudEstimate.examples.length > 0 && (
                      <ul className="space-y-1.5 mb-3">
                        {category.fraudEstimate.examples.map((ex, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="text-red-400 shrink-0">•</span>
                            {ex}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-xs text-slate-400 italic">Source: {category.fraudEstimate.source}</p>
                  </div>
                </div>
              )}

              {/* Subcategories */}
              {category.subCategories && category.subCategories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                    Breakdown by Program
                  </h3>
                  <div className="space-y-3">
                    {category.subCategories.map(sub => (
                      <SubCategoryCard key={sub.id} sub={sub} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
