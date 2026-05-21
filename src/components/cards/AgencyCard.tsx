import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatters'
import type { Agency } from '../../types'

interface Props {
  agency: Agency
  index?: number
}

export function AgencyCard({ agency, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false)

  const budgetPct = agency.budget / 6500000000000 * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight truncate">
                {agency.name}
              </h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 mt-1 inline-block">
                {agency.category}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-slate-900 dark:text-white">
              {formatCurrency(agency.budget, true)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">FY 2023</p>
          </div>
        </div>

        {/* Budget bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Share of federal budget</span>
            <span>{budgetPct.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(budgetPct * 3, 100)}%` }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-2">
          {agency.description}
        </p>

        <div className="flex items-center gap-2 mt-4">
          <Link
            to={`/agency/${agency.id}`}
            className="flex-1 text-center py-2 px-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            View Details
          </Link>
          <a
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Official website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Expand details"
          >
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-700 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Top Contracts
              </h4>
              <div className="space-y-2">
                {agency.contracts?.slice(0, 3).map(c => (
                  <div key={c.id} className="flex justify-between items-start gap-2 text-sm">
                    <span className="text-slate-600 dark:text-slate-400 truncate">{c.recipient}</span>
                    <span className="font-medium text-slate-900 dark:text-white shrink-0">
                      {formatCurrency(c.amount, true)}
                    </span>
                  </div>
                ))}
              </div>
              {agency.usasUrl && (
                <a
                  href={agency.usasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on USASpending.gov
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
