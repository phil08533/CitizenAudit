import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronRight, User, Briefcase, Info } from 'lucide-react'
import { calculateTax } from '../../utils/taxCalculator'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import { SpendingPieChart } from '../charts/SpendingPieChart'
import { SpendingBarChart } from '../charts/SpendingBarChart'
import type { TaxInputs, TaxResult, SpendingCategory } from '../../types'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
  'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
  'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

const BUSINESS_TYPES = [
  { value: 'sole_prop', label: 'Sole Proprietor / Single-Member LLC', desc: 'Self-employment tax (both employee + employer share)' },
  { value: 's_corp', label: 'S-Corporation', desc: 'Pay yourself a salary; pass-through profit avoids SE tax' },
  { value: 'c_corp', label: 'C-Corporation', desc: '21% flat corporate rate + dividend tax (double taxation)' },
  { value: 'partnership', label: 'Partnership / Multi-Member LLC', desc: 'Pass-through similar to sole proprietor' },
]

interface Props {
  compact?: boolean
  onResult?: (result: TaxResult) => void
}

function CurrencyInput({ label, value, onChange, note }: { label: string; value: number; onChange: (v: number) => void; note?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      {note && <p className="text-xs text-slate-400 mb-1.5">{note}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
        <input
          type="number"
          min={0}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </div>
  )
}

export function TaxCalculator({ compact = false, onResult }: Props) {
  const [mode, setMode] = useState<'individual' | 'business'>('individual')
  const [inputs, setInputs] = useState<TaxInputs>({
    income: 65000,
    filingStatus: 'single',
    state: 'CA',
    dependents: 0,
    mode: 'individual',
    businessType: 'sole_prop',
    businessNetIncome: 80000,
    ownerSalary: 40000,
    numEmployees: 2,
    totalEmployeeWages: 80000,
  })
  const [result, setResult] = useState<TaxResult | null>(null)
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie')

  const update = (patch: Partial<TaxInputs>) => setInputs(prev => ({ ...prev, ...patch }))

  const handleCalculate = () => {
    const r = calculateTax({ ...inputs, mode })
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
    <div>
      {/* Mode toggle */}
      <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
        {(['individual', 'business'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(null) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === m
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {m === 'individual' ? <User className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            {m === 'individual' ? 'Individual / W-2' : 'Business Owner'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode === 'individual' ? (
          <motion.div key="individual" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
            <IndividualInputs inputs={inputs} update={update} />
          </motion.div>
        ) : (
          <motion.div key="business" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <BusinessInputs inputs={inputs} update={update} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
      >
        <Calculator className="w-4 h-4" />
        {mode === 'individual' ? 'Calculate My Tax Allocation' : 'Calculate Business Tax Burden'}
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-8">
          {mode === 'business' && result.business ? (
            <BusinessResults result={result} compact={compact} />
          ) : (
            <IndividualResults result={result} pieData={pieData} activeChart={activeChart} setActiveChart={setActiveChart} compact={compact} />
          )}
        </motion.div>
      )}
    </div>
  )
}

function IndividualInputs({ inputs, update }: { inputs: TaxInputs; update: (p: Partial<TaxInputs>) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CurrencyInput label="Annual W-2 / Gross Income" value={inputs.income} onChange={v => update({ income: v })} />
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Filing Status</label>
        <select value={inputs.filingStatus} onChange={e => update({ filingStatus: e.target.value as TaxInputs['filingStatus'] })}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="single">Single</option>
          <option value="married_joint">Married Filing Jointly</option>
          <option value="married_separate">Married Filing Separately</option>
          <option value="head_of_household">Head of Household</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">State</label>
        <select value={inputs.state} onChange={e => update({ state: e.target.value })}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Dependents</label>
        <input type="number" min={0} max={10} value={inputs.dependents} onChange={e => update({ dependents: Number(e.target.value) })}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
      </div>
    </div>
  )
}

function BusinessInputs({ inputs, update }: { inputs: TaxInputs; update: (p: Partial<TaxInputs>) => void }) {
  const btype = inputs.businessType ?? 'sole_prop'
  return (
    <div className="space-y-5">
      {/* Business type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Business Structure</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {BUSINESS_TYPES.map(bt => (
            <button
              key={bt.value}
              onClick={() => update({ businessType: bt.value as TaxInputs['businessType'] })}
              className={`text-left p-3 rounded-xl border text-sm transition-all ${
                btype === bt.value
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <p className="font-semibold text-slate-900 dark:text-white text-xs">{bt.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{bt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <CurrencyInput
          label="Net Business Income"
          value={inputs.businessNetIncome ?? 0}
          onChange={v => update({ businessNetIncome: v })}
          note="After business expenses, before taxes"
        />

        {btype === 's_corp' && (
          <CurrencyInput
            label="Your W-2 Salary (from business)"
            value={inputs.ownerSalary ?? 0}
            onChange={v => update({ ownerSalary: v })}
            note="Must be 'reasonable compensation'"
          />
        )}

        {btype === 'c_corp' && (
          <CurrencyInput
            label="Dividends Paid to You"
            value={inputs.ownerSalary ?? 0}
            onChange={v => update({ ownerSalary: v })}
            note="Distributed corporate profits"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Filing Status</label>
          <select value={inputs.filingStatus} onChange={e => update({ filingStatus: e.target.value as TaxInputs['filingStatus'] })}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="single">Single</option>
            <option value="married_joint">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
            <option value="head_of_household">Head of Household</option>
          </select>
        </div>
      </div>

      {/* Employee payroll section */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-orange-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Employer Payroll Taxes (Optional)</h3>
        </div>
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
          <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            As an employer, you pay 7.65% of each employee's wages in payroll taxes — a cost your employees never see on their paycheck.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Number of Employees</label>
            <input type="number" min={0} value={inputs.numEmployees ?? 0} onChange={e => update({ numEmployees: Number(e.target.value) })}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <CurrencyInput
            label="Total Annual Employee Wages"
            value={inputs.totalEmployeeWages ?? 0}
            onChange={v => update({ totalEmployeeWages: v })}
          />
        </div>
      </div>
    </div>
  )
}

function BusinessResults({ result, compact }: { result: TaxResult; compact: boolean }) {
  const b = result.business!
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 p-4 col-span-2 sm:col-span-1 sm:row-span-1">
          <p className="text-xs text-slate-500 mb-1">Total Tax Burden</p>
          <p className="font-bold text-red-600 dark:text-red-400 text-2xl">{formatCurrency(b.totalTaxBurden)}</p>
          <p className="text-xs text-slate-400 mt-0.5">All federal taxes combined</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <p className="text-xs text-slate-500 mb-1">Effective Tax Rate</p>
          <p className="font-bold text-slate-900 dark:text-white text-xl">{formatPercent(b.effectiveBusinessRate)}</p>
          <p className="text-xs text-slate-400 mt-0.5">Of net business income</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <p className="text-xs text-slate-500 mb-1">SE / Payroll Tax</p>
          <p className="font-bold text-amber-600 dark:text-amber-400 text-xl">
            {formatCurrency(b.selfEmploymentTax + b.employerPayrollTax + b.futaTax)}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">FICA + FUTA taxes</p>
        </div>
      </div>

      {/* Line-by-line breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Tax-by-Tax Breakdown</h3>
        <div className="space-y-2">
          {b.breakdown.map((line, i) => (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: line.color }} />
                  <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{line.label}</p>
                </div>
                <p className="font-bold text-slate-900 dark:text-white shrink-0">{formatCurrency(line.amount)}</p>
              </div>
              {line.rate && (
                <p className="text-xs text-slate-400 ml-4.5 pl-4">{line.rate}</p>
              )}
              {line.note && (
                <p className="text-xs text-blue-500 mt-1 ml-4 pl-0.5">{line.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Invisible employer taxes callout */}
      {(b.employerPayrollTax + b.futaTax) > 0 && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4">
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">💡 The Hidden Payroll Tax</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your employees see their FICA withholding on their paystub — but you pay an equal amount on top of their wages that they never see.
            That's <strong className="text-amber-600 dark:text-amber-400">{formatCurrency(b.employerPayrollTax + b.futaTax)}/year</strong> in
            taxes that effectively comes out of what you could otherwise pay your employees.
          </p>
        </div>
      )}

      {/* Where it goes */}
      {!compact && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Where Your Business Taxes Go</h3>
          <div className="space-y-2">
            {result.allocations.sort((a, b) => b.amount - a.amount).slice(0, 8).map(a => (
              <div key={a.category} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-slate-600 dark:text-slate-400 truncate">{a.category}</span>
                    <span className="font-semibold text-slate-900 dark:text-white ml-2 shrink-0">{formatCurrency(a.amount)}</span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full rounded-full" style={{ width: `${a.percentage}%`, backgroundColor: a.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function IndividualResults({
  result, pieData, activeChart, setActiveChart, compact,
}: {
  result: TaxResult
  pieData: ReturnType<typeof result.allocations.map>
  activeChart: 'pie' | 'bar'
  setActiveChart: (c: 'pie' | 'bar') => void
  compact: boolean
}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Est. Federal Tax</p>
          <p className="font-bold text-slate-900 dark:text-white text-lg">{formatCurrency(result.federalTax)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Effective Rate</p>
          <p className="font-bold text-blue-500 text-lg">{formatPercent(result.effectiveRate)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Marginal Rate</p>
          <p className="font-bold text-purple-500 text-lg">{formatPercent(result.marginalRate)}</p>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {(['pie', 'bar'] as const).map(t => (
          <button key={t} onClick={() => setActiveChart(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeChart === t ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
            {t === 'pie' ? 'Pie Chart' : 'Bar Chart'}
          </button>
        ))}
      </div>
      {activeChart === 'pie'
        ? <SpendingPieChart data={pieData as SpendingCategory[]} compact />
        : <SpendingBarChart allocations={result.allocations} compact />
      }
      <div className="mt-4 space-y-2">
        {result.allocations.sort((a, b) => b.amount - a.amount).slice(0, compact ? 5 : 16).map(a => (
          <div key={a.category} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-xs text-slate-700 dark:text-slate-300 truncate">{a.category}</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white ml-2 shrink-0">{formatCurrency(a.amount)}</span>
              </div>
              <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${a.percentage}%`, backgroundColor: a.color }} />
              </div>
            </div>
            <span className="text-xs text-slate-400 w-8 text-right shrink-0">{formatPercent(a.percentage, 0)}</span>
          </div>
        ))}
      </div>
    </>
  )
}
