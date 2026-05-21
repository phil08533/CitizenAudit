import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Building2, DollarSign, FileText } from 'lucide-react'
import { BudgetHistoryChart } from '../components/charts/BudgetHistoryChart'
import { getAgencyById } from '../services/usaspending'
import { formatCurrency } from '../utils/formatters'

export function AgencyDetail() {
  const { id } = useParams<{ id: string }>()
  const agency = id ? getAgencyById(id) : undefined

  if (!agency) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-4 p-8">
        <Building2 className="w-16 h-16 text-slate-300 dark:text-slate-600" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Agency Not Found</h1>
        <p className="text-slate-500">This agency doesn't exist in our database yet.</p>
        <Link to="/spending" className="text-blue-500 hover:text-blue-600 font-medium">
          ← Back to Spending Explorer
        </Link>
      </div>
    )
  }

  const latestBudget = agency.budgetHistory?.[agency.budgetHistory.length - 1]
  const prevBudget = agency.budgetHistory?.[agency.budgetHistory.length - 2]
  const budgetChange = latestBudget && prevBudget
    ? ((latestBudget.amount - prevBudget.amount) / prevBudget.amount) * 100
    : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/spending"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Spending Explorer
            </Link>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-white/15 text-slate-300">
                    {agency.abbreviation}
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                    {agency.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold">{agency.name}</h1>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
            >
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Agency Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{agency.description}</p>
            </motion.div>

            {/* Budget History */}
            {agency.budgetHistory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Budget History</h2>
                  {budgetChange !== null && (
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${
                      budgetChange > 0
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                    }`}>
                      {budgetChange > 0 ? '+' : ''}{budgetChange.toFixed(1)}% YoY
                    </span>
                  )}
                </div>
                <BudgetHistoryChart data={agency.budgetHistory} />
              </motion.div>
            )}

            {/* Contracts */}
            {agency.contracts && agency.contracts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
              >
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Major Contracts</h2>
                <div className="space-y-3">
                  {agency.contracts.map(c => (
                    <div
                      key={c.id}
                      className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{c.recipient}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{c.description}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                            {c.category}
                          </span>
                          <span className="text-xs text-slate-400">FY {c.year}</span>
                        </div>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white shrink-0">
                        {formatCurrency(c.amount, true)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget stat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">FY 2023 Budget</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(agency.budget, true)}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {formatCurrency(agency.budget)} total
              </p>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Official Links</h3>
              </div>
              <div className="space-y-2">
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm text-slate-700 dark:text-slate-300"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  Official Website
                </a>
                {agency.usasUrl && (
                  <a
                    href={agency.usasUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm text-slate-700 dark:text-slate-300"
                  >
                    <ExternalLink className="w-4 h-4 text-green-500" />
                    USASpending.gov Profile
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
