import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, AlertTriangle, ChevronRight } from 'lucide-react'
import { FoundingFatherBadge } from '../components/ui/FoundingFatherBadge'
import { FOUNDING_FATHERS } from '../data/foundingFathers'
import { AgencyCard } from '../components/cards/AgencyCard'
import { SearchFilter } from '../components/ui/SearchFilter'
import { SpendingPieChart } from '../components/charts/SpendingPieChart'
import { CategoryDetailPanel } from '../components/ui/CategoryDetailPanel'
import { getAgencies, getAgencyCategories } from '../services/usaspending'
import { formatCurrency, formatPercent } from '../utils/formatters'
import spendingData from '../data/spendingCategories.json'
import type { Agency, SpendingFilter, SpendingCategory } from '../types'

const spending = spendingData as SpendingCategory[]

const totalFraud = spending.reduce((s, c) => s + (c.fraudEstimate?.amount ?? 0), 0)
const totalBudget = spending.reduce((s, c) => s + c.amount, 0)

function applyFilter(agencies: Agency[], filter: SpendingFilter): Agency[] {
  let result = [...agencies]
  if (filter.search) {
    const q = filter.search.toLowerCase()
    result = result.filter(
      a => a.name.toLowerCase().includes(q) || a.abbreviation.toLowerCase().includes(q) ||
           a.category.toLowerCase().includes(q) || a.description.toLowerCase().includes(q),
    )
  }
  if (filter.category) result = result.filter(a => a.category === filter.category)
  switch (filter.sortBy) {
    case 'amount_desc': result.sort((a, b) => b.budget - a.budget); break
    case 'amount_asc':  result.sort((a, b) => a.budget - b.budget); break
    case 'name_asc':    result.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'name_desc':   result.sort((a, b) => b.name.localeCompare(a.name)); break
  }
  return result
}

export function SpendingExplorer() {
  const allAgencies = getAgencies()
  const categories = getAgencyCategories()
  const [filter, setFilter] = useState<SpendingFilter>({ search: '', category: '', sortBy: 'amount_desc' })
  const [selectedCategory, setSelectedCategory] = useState<SpendingCategory | null>(null)
  const [activeTab, setActiveTab] = useState<'categories' | 'agencies'>('categories')

  const filtered = useMemo(() => applyFilter(allAgencies, filter), [filter])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f2' }}>
      <CategoryDetailPanel category={selectedCategory} onClose={() => setSelectedCategory(null)} />

      {/* Header */}
      <section className="hero-gradient stars-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h1 className="text-3xl font-bold font-serif">Spending Explorer</h1>
                </div>
                <p className="text-white/75 max-w-2xl mb-4">
                  All {spending.length} spending categories with subcategories, leadership, and fraud estimates.
                  Total FY 2023: <strong className="text-white">{formatCurrency(totalBudget, true)}</strong> ·
                  Est. fraud/waste: <strong className="text-red-300">{formatCurrency(totalFraud, true)}</strong>
                </p>
                <FoundingFatherBadge father={FOUNDING_FATHERS.spending} variant="compact" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fraud alert banner */}
      <div className="bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>Estimated annual fraud, waste & improper payments: {formatCurrency(totalFraud, true)}</strong>
            {' '}({formatPercent(totalFraud / totalBudget * 100)} of total spending) — per GAO, OMB, and agency Inspector General reports.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab toggle */}
        <div className="flex gap-2 mb-8">
          {(['categories', 'agencies'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-glory-blue text-white shadow-lg shadow-black/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {tab === 'categories' ? `Spending Categories (${spending.length})` : `Agencies (${allAgencies.length})`}
            </button>
          ))}
        </div>

        {activeTab === 'categories' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pie chart sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Budget by Category</h3>
                <p className="text-xs text-slate-500 mb-3">Click any slice to explore details</p>
                <SpendingPieChart
                  data={spending}
                  compact
                  onCategoryClick={id => {
                    const cat = spending.find(s => s.id === id)
                    if (cat) setSelectedCategory(cat)
                  }}
                />
              </div>
            </div>

            {/* Category list */}
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Click any category to see subcategories, leadership, and fraud estimates
              </p>
              {spending
                .slice()
                .sort((a, b) => b.amount - a.amount)
                .map((cat, i) => {
                  const fraudPct = cat.fraudEstimate ? cat.fraudEstimate.percentage : 0
                  const fraudAmt = cat.fraudEstimate ? cat.fraudEstimate.amount : 0
                  const hasFraud = fraudAmt > 0
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: cat.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                              {cat.name}
                            </h3>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(cat.amount, true)}</p>
                              <p className="text-xs text-slate-400">{formatPercent(cat.percentage)} of budget</p>
                            </div>
                          </div>

                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-1">{cat.description}</p>

                          {/* Budget bar */}
                          <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 mb-2 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${cat.percentage * 2.5}%`, backgroundColor: cat.color }}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {cat.lead && (
                                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                  {cat.leadTitle?.split(',')[0]}
                                </span>
                              )}
                              {hasFraud && (
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  fraudPct > 10
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                    : fraudPct > 5
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                                }`}>
                                  ~{formatCurrency(fraudAmt, true)} fraud est.
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 flex items-center gap-0.5 group-hover:text-blue-500 transition-colors">
                              {cat.subCategories?.length
                                ? `${cat.subCategories.length} subcategories`
                                : 'Details'}
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
            </div>
          </div>
        ) : (
          /* Agency tab */
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Filter by Category</h3>
                <div className="space-y-1">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setFilter(f => ({ ...f, category: f.category === c ? '' : c }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        filter.category === c
                          ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
              <SearchFilter filter={filter} categories={categories} onChange={setFilter} />
              <p className="text-sm text-slate-500">
                Showing <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> agencies
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((agency, i) => (
                  <AgencyCard key={agency.id} agency={agency} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
