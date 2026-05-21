import type { TaxInputs, TaxResult, TaxAllocation } from '../types'

const BRACKETS_2024 = {
  single: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
  married_joint: [
    { rate: 0.10, min: 0, max: 23200 },
    { rate: 0.12, min: 23200, max: 94300 },
    { rate: 0.22, min: 94300, max: 201050 },
    { rate: 0.24, min: 201050, max: 383900 },
    { rate: 0.32, min: 383900, max: 487450 },
    { rate: 0.35, min: 487450, max: 731200 },
    { rate: 0.37, min: 731200, max: Infinity },
  ],
  married_separate: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 365600 },
    { rate: 0.37, min: 365600, max: Infinity },
  ],
  head_of_household: [
    { rate: 0.10, min: 0, max: 16550 },
    { rate: 0.12, min: 16550, max: 63100 },
    { rate: 0.22, min: 63100, max: 100500 },
    { rate: 0.24, min: 100500, max: 191950 },
    { rate: 0.32, min: 191950, max: 243700 },
    { rate: 0.35, min: 243700, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
}

const STANDARD_DEDUCTIONS = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
}

const CHILD_TAX_CREDIT = 2000

const ALLOCATIONS: Omit<TaxAllocation, 'amount'>[] = [
  { category: 'Social Security', percentage: 21.4, color: '#3b82f6', description: 'Retirement, disability & survivor benefits', icon: '👴' },
  { category: 'Medicare', percentage: 13.4, color: '#10b981', description: 'Healthcare for seniors 65+', icon: '🏥' },
  { category: 'National Defense', percentage: 13.6, color: '#f59e0b', description: 'Military & national security', icon: '🛡️' },
  { category: 'Medicaid & CHIP', percentage: 9.7, color: '#06b6d4', description: 'Healthcare for low-income Americans', icon: '💊' },
  { category: 'Interest on Debt', percentage: 10.4, color: '#ef4444', description: 'Payments on the national debt', icon: '📉' },
  { category: 'Income Security', percentage: 9.8, color: '#8b5cf6', description: 'SNAP, housing aid, unemployment', icon: '🏠' },
  { category: "Veterans' Affairs", percentage: 4.8, color: '#f97316', description: 'Healthcare & benefits for veterans', icon: '🎖️' },
  { category: 'Education', percentage: 3.8, color: '#ec4899', description: 'Federal student aid & K-12 grants', icon: '📚' },
  { category: 'Transportation', percentage: 2.6, color: '#14b8a6', description: 'Highways, bridges & transit', icon: '🛣️' },
  { category: 'Health Research', percentage: 1.5, color: '#84cc16', description: 'NIH, CDC & public health programs', icon: '🔬' },
  { category: 'International Aid', percentage: 1.1, color: '#a855f7', description: 'Foreign aid & diplomacy', icon: '🌍' },
  { category: 'All Other', percentage: 7.9, color: '#94a3b8', description: 'Science, energy, environment & more', icon: '🏛️' },
]

export function calculateTax(inputs: TaxInputs): TaxResult {
  const { income, filingStatus, dependents } = inputs

  const standardDeduction = STANDARD_DEDUCTIONS[filingStatus]
  const taxableIncome = Math.max(0, income - standardDeduction - dependents * CHILD_TAX_CREDIT)

  const brackets = BRACKETS_2024[filingStatus]
  let federalTax = 0
  let marginalRate = 0

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min
    federalTax += taxable * bracket.rate
    marginalRate = bracket.rate
  }

  federalTax = Math.max(0, federalTax - dependents * CHILD_TAX_CREDIT)
  const effectiveRate = income > 0 ? (federalTax / income) * 100 : 0

  const allocations: TaxAllocation[] = ALLOCATIONS.map(a => ({
    ...a,
    amount: (federalTax * a.percentage) / 100,
  }))

  return {
    grossIncome: income,
    federalTax,
    effectiveRate,
    marginalRate: marginalRate * 100,
    allocations,
  }
}
