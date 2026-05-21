import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { AgencyCard } from '../components/cards/AgencyCard'
import { SearchFilter } from '../components/ui/SearchFilter'
import { SpendingPieChart } from '../components/charts/SpendingPieChart'
import { getAgencies, getAgencyCategories } from '../services/usaspending'
import { formatCurrency } from '../utils/formatters'
import spendingData from '../data/spendingCategories.json'
import type { Agency, SpendingFilter, SpendingCategory } from '../types'

const spending = spendingData as SpendingCategory[]

function applyFilter(agencies: Agency[], filter: SpendingFilter): Agency[] {
  let result = [...agencies]

  if (filter.search) {
    const q = filter.search.toLowerCase()
    result = result.filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.abbreviation.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    )
  }

  if (filter.category) {
    result = result.filter(a => a.category === filter.category)
  }

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
  const [filter, setFilter] = useState<SpendingFilter>({
    search: '',
    category: '',
    sortBy: 'amount_desc',
  })

  const filtered = useMemo(() => applyFilter(allAgencies, filter), [filter])

  const totalSpending = spending.reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold">Spending Explorer</h1>
            </div>
            <p className="text-purple-100 max-w-xl">
              Browse federal agencies, their budgets, and major contracts. Total FY 2023 spending:{' '}
              <strong className="text-white">{formatCurrency(totalSpending, true)}</strong>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar: chart */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Budget by Category
                </h3>
                <p className="text-xs text-slate-500 mb-3">Hover a slice for details</p>
                <SpendingPieChart data={spending} compact />
              </motion.div>

              {/* Category breakdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">
                  All Categories
                </h3>
                <div className="space-y-2">
                  {spending.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setFilter(f => ({ ...f, category: f.category === s.name ? '' : s.name }))}
                      className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg text-xs transition-colors ${
                        filter.category === s.name
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="flex-1 text-slate-700 dark:text-slate-300">{s.name}</span>
                      <span className="text-slate-400">{formatCurrency(s.amount, true)}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main: agency list */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchFilter filter={filter} categories={categories} onChange={setFilter} />
            </motion.div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> of {allAgencies.length} agencies
              </p>
              {filter.search || filter.category ? (
                <button
                  onClick={() => setFilter({ search: '', category: '', sortBy: 'amount_desc' })}
                  className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <BarChart3 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">No agencies match your search.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((agency, i) => (
                  <AgencyCard key={agency.id} agency={agency} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
