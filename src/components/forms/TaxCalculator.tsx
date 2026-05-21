import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ChevronRight } from 'lucide-react'
import { calculateTax } from '../../utils/taxCalculator'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import { SpendingPieChart } from '../charts/SpendingPieChart'
import { SpendingBarChart } from '../charts/SpendingBarChart'
import type { TaxInputs, TaxResult } from '../../types'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
  'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
  'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

interface Props {
  compact?: boolean
  onResult?: (result: TaxResult) => void
}

export function TaxCalculator({ compact = false, onResult }: Props) {
  const [inputs, setInputs] = useState<TaxInputs>({
    income: 65000,
    filingStatus: 'single',
    state: 'CA',
    dependents: 0,
  })
  const [result, setResult] = useState<TaxResult | null>(null)
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie')

  const handleCalculate = () => {
    const r = calculateTax(inputs)
    setResult(r)
    onResult?.(r)
  }

  const pieData = result?.allocations.map(a => ({
    id: a.category.toLowerCase().replace(/\s+/g, '_'),
    name: a.category,
    amount: a.amount,
    percentage: a.percentage,
    color: a.color,
    description: a.description,
  })) ?? []

  return (
    <div className={compact ? '' : ''}>
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Annual Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input
              type="number"
              min={0}
              max={10000000}
              value={inputs.income}
              onChange={e => setInputs({ ...inputs, income: Number(e.target.value) })}
              className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Filing Status
          </label>
          <select
            value={inputs.filingStatus}
            onChange={e => setInputs({ ...inputs, filingStatus: e.target.value as TaxInputs['filingStatus'] })}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="single">Single</option>
            <option value="married_joint">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
            <option value="head_of_household">Head of Household</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            State
          </label>
          <select
            value={inputs.state}
            onChange={e => setInputs({ ...inputs, state: e.target.value })}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Dependents
          </label>
          <input
            type="number"
            min={0}
            max={10}
            value={inputs.dependents}
            onChange={e => setInputs({ ...inputs, dependents: Number(e.target.value) })}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
      >
        <Calculator className="w-4 h-4" />
        Calculate My Tax Allocation
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Est. Federal Tax</p>
              <p className="font-bold text-slate-900 dark:text-white text-lg">
                {formatCurrency(result.federalTax)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Effective Rate</p>
              <p className="font-bold text-blue-500 text-lg">
                {formatPercent(result.effectiveRate)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Marginal Rate</p>
              <p className="font-bold text-purple-500 text-lg">
                {formatPercent(result.marginalRate)}
              </p>
            </div>
          </div>

          {/* Chart toggle */}
          <div className="flex gap-2 mb-4">
            {(['pie', 'bar'] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveChart(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeChart === t
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {t === 'pie' ? 'Pie Chart' : 'Bar Chart'}
              </button>
            ))}
          </div>

          {activeChart === 'pie' ? (
            <SpendingPieChart data={pieData} compact />
          ) : (
            <SpendingBarChart allocations={result.allocations} compact />
          )}

          {/* Top allocations */}
          <div className="mt-4 space-y-2">
            {result.allocations
              .sort((a, b) => b.amount - a.amount)
              .slice(0, compact ? 5 : 12)
              .map(a => (
                <div key={a.category} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs text-slate-700 dark:text-slate-300 truncate">{a.category}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white ml-2 shrink-0">
                        {formatCurrency(a.amount)}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${a.percentage}%`, backgroundColor: a.color }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 w-8 text-right shrink-0">
                    {formatPercent(a.percentage, 0)}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
