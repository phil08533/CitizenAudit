import type { TaxInputs, TaxResult, TaxAllocation, BusinessTaxResult, BusinessTaxLine } from '../types'

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

const SS_WAGE_BASE_2024 = 168600
const SE_TAX_RATE_SS = 0.124
const SE_TAX_RATE_MEDICARE = 0.029
const EMPLOYER_SS_RATE = 0.062
const EMPLOYER_MEDICARE_RATE = 0.0145
const FUTA_WAGE_BASE = 7000
const FUTA_NET_RATE = 0.006 // after state credit
const CORP_TAX_RATE = 0.21
const QUALIFIED_DIVIDEND_RATE = 0.20

const ALLOCATIONS: Omit<TaxAllocation, 'amount'>[] = [
  { category: 'Social Security', percentage: 22.1, color: '#3b82f6', description: 'Retirement, disability & survivor benefits', icon: '👴' },
  { category: 'Medicare', percentage: 13.8, color: '#10b981', description: 'Healthcare for seniors 65+', icon: '🏥' },
  { category: 'National Defense', percentage: 14.0, color: '#f59e0b', description: 'Military & national security', icon: '🛡️' },
  { category: 'Medicaid & CHIP', percentage: 10.0, color: '#06b6d4', description: 'Healthcare for low-income Americans', icon: '💊' },
  { category: 'Interest on Debt', percentage: 10.7, color: '#ef4444', description: 'Payments on the national debt', icon: '📉' },
  { category: 'Income Security', percentage: 10.1, color: '#8b5cf6', description: 'SNAP, housing aid, unemployment', icon: '🏠' },
  { category: "Veterans' Affairs", percentage: 4.9, color: '#f97316', description: 'Healthcare & benefits for veterans', icon: '🎖️' },
  { category: 'Education', percentage: 3.9, color: '#ec4899', description: 'Federal student aid & K-12 grants', icon: '📚' },
  { category: 'Transportation', percentage: 2.7, color: '#14b8a6', description: 'Highways, bridges & transit', icon: '🛣️' },
  { category: 'Health Research', percentage: 1.6, color: '#84cc16', description: 'NIH, CDC & public health programs', icon: '🔬' },
  { category: 'International Aid', percentage: 1.2, color: '#a855f7', description: 'Foreign aid & diplomacy', icon: '🌍' },
  { category: 'Homeland Security', percentage: 1.6, color: '#0ea5e9', description: 'Border, FEMA, TSA, Coast Guard', icon: '🛂' },
  { category: 'Housing & HUD', percentage: 1.1, color: '#f43f5e', description: 'Section 8 and community development', icon: '🏘️' },
  { category: 'Science & Space', percentage: 0.7, color: '#6366f1', description: 'NASA, NSF, NOAA research', icon: '🚀' },
  { category: 'Agriculture', percentage: 0.5, color: '#65a30d', description: 'Farm programs and food safety', icon: '🌾' },
  { category: 'Other Programs', percentage: 1.1, color: '#78716c', description: 'Justice, commerce, labor, interior, other', icon: '🏛️' },
]

function calcIncomeTax(taxableIncome: number, status: TaxInputs['filingStatus']): { tax: number; marginalRate: number } {
  const brackets = BRACKETS_2024[status]
  let tax = 0
  let marginalRate = 0
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min
    tax += taxable * bracket.rate
    marginalRate = bracket.rate
  }
  return { tax, marginalRate }
}

export function calculateTax(inputs: TaxInputs): TaxResult {
  if (inputs.mode === 'business') {
    return calculateBusinessTax(inputs)
  }

  const { income, filingStatus, dependents } = inputs
  const standardDeduction = STANDARD_DEDUCTIONS[filingStatus]
  const taxableIncome = Math.max(0, income - standardDeduction)
  const { tax: rawTax, marginalRate } = calcIncomeTax(taxableIncome, filingStatus)
  const ctc = Math.min(dependents * 2000, rawTax)
  const federalTax = Math.max(0, rawTax - ctc)
  const effectiveRate = income > 0 ? (federalTax / income) * 100 : 0

  const allocations: TaxAllocation[] = ALLOCATIONS.map(a => ({
    ...a,
    amount: (federalTax * a.percentage) / 100,
  }))

  return { grossIncome: income, federalTax, effectiveRate, marginalRate: marginalRate * 100, allocations }
}

function calculateBusinessTax(inputs: TaxInputs): TaxResult {
  const {
    income,
    filingStatus,
    dependents,
    businessType = 'sole_prop',
    businessNetIncome = 0,
    ownerSalary = 0,
    numEmployees = 0,
    totalEmployeeWages = 0,
  } = inputs

  const breakdown: BusinessTaxLine[] = []
  let selfEmploymentTax = 0
  let employerPayrollTax = 0
  let futaTax = 0
  let businessIncomeTax = 0

  // ── Self-employment / payroll taxes ──────────────────────────────────────
  if (businessType === 'sole_prop' || businessType === 'partnership') {
    // SE tax applies to 92.35% of net self-employment income
    const seNet = businessNetIncome * 0.9235
    const ssWages = Math.min(seNet, SS_WAGE_BASE_2024)
    const seTaxSS = ssWages * SE_TAX_RATE_SS
    const seTaxMedicare = seNet * SE_TAX_RATE_MEDICARE
    selfEmploymentTax = seTaxSS + seTaxMedicare

    breakdown.push({
      label: 'Self-Employment Tax (Social Security)',
      amount: seTaxSS,
      rate: '12.4% on first $168,600',
      note: 'You pay both employee & employer share',
      color: '#3b82f6',
    })
    breakdown.push({
      label: 'Self-Employment Tax (Medicare)',
      amount: seTaxMedicare,
      rate: '2.9% on all net income',
      color: '#10b981',
    })
  }

  if (businessType === 's_corp') {
    // W-2 salary portion: employer pays half of FICA
    const ssWages = Math.min(ownerSalary, SS_WAGE_BASE_2024)
    const employerSS = ssWages * EMPLOYER_SS_RATE
    const employerMed = ownerSalary * EMPLOYER_MEDICARE_RATE
    selfEmploymentTax = employerSS + employerMed // employer share only

    breakdown.push({
      label: 'Employer FICA on Your Salary',
      amount: employerSS + employerMed,
      rate: '7.65% employer share on W-2 salary',
      note: 'Pass-through profit avoids SE tax — key S-corp benefit',
      color: '#3b82f6',
    })
  }

  // ── Employer payroll taxes on employees ──────────────────────────────────
  if (numEmployees > 0 && totalEmployeeWages > 0) {
    const avgWage = totalEmployeeWages / numEmployees
    let totalEmpSS = 0
    let totalEmpMed = 0

    for (let i = 0; i < numEmployees; i++) {
      const w = avgWage
      totalEmpSS += Math.min(w, SS_WAGE_BASE_2024) * EMPLOYER_SS_RATE
      totalEmpMed += w * EMPLOYER_MEDICARE_RATE
    }

    employerPayrollTax = totalEmpSS + totalEmpMed
    futaTax = Math.min(totalEmployeeWages, FUTA_WAGE_BASE * numEmployees) * FUTA_NET_RATE

    breakdown.push({
      label: `Employer Social Security (${numEmployees} employees)`,
      amount: totalEmpSS,
      rate: '6.2% per employee up to $168,600',
      note: 'This cost is invisible to employees — it comes out of your revenue',
      color: '#f59e0b',
    })
    breakdown.push({
      label: `Employer Medicare (${numEmployees} employees)`,
      amount: totalEmpMed,
      rate: '1.45% on all wages, no cap',
      color: '#f97316',
    })
    breakdown.push({
      label: `FUTA — Federal Unemployment (${numEmployees} employees)`,
      amount: futaTax,
      rate: '0.6% on first $7,000/employee',
      note: 'After 5.4% state credit',
      color: '#8b5cf6',
    })
  }

  // ── Business income tax ───────────────────────────────────────────────────
  if (businessType === 'c_corp') {
    businessIncomeTax = businessNetIncome * CORP_TAX_RATE
    const dividendTax = ownerSalary * QUALIFIED_DIVIDEND_RATE
    breakdown.push({
      label: 'Corporate Income Tax (C-Corp)',
      amount: businessIncomeTax,
      rate: '21% flat rate on net corporate income',
      note: 'Plus dividend tax when profits distributed to you — double taxation',
      color: '#ef4444',
    })
    if (ownerSalary > 0) {
      breakdown.push({
        label: 'Qualified Dividend Tax (Personal)',
        amount: dividendTax,
        rate: '20% on dividends distributed to you',
        color: '#dc2626',
      })
      businessIncomeTax += dividendTax
    }
  } else {
    // Pass-through: business income flows to personal return
    // QBI deduction: 20% deduction for pass-through income (simplified)
    const passThrough = businessType === 's_corp' ? businessNetIncome - ownerSalary : businessNetIncome
    const qbiDeduction = passThrough * 0.20
    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus]
    const seDeduction = selfEmploymentTax / 2 // half of SE tax deductible
    const personalIncome = (income || 0) + passThrough + (businessType === 's_corp' ? ownerSalary : 0)
    const taxableIncome = Math.max(0, personalIncome - standardDeduction - seDeduction - qbiDeduction - dependents * 2000)
    const { tax, marginalRate: mr } = calcIncomeTax(taxableIncome, filingStatus)
    businessIncomeTax = Math.max(0, tax)

    breakdown.push({
      label: 'Federal Income Tax (Pass-Through Income)',
      amount: businessIncomeTax,
      rate: `${(mr * 100).toFixed(0)}% marginal bracket`,
      note: `Includes 20% QBI deduction saving ~${((passThrough * 0.2 * mr)).toFixed(0) === 'NaN' ? '$0' : '$' + Math.round(passThrough * 0.2 * mr).toLocaleString()}`,
      color: '#6366f1',
    })
  }

  const totalTaxBurden = selfEmploymentTax + employerPayrollTax + futaTax + businessIncomeTax
  const totalRevenue = businessNetIncome + totalEmployeeWages + (businessType === 's_corp' ? ownerSalary : 0)
  const effectiveBusinessRate = totalRevenue > 0 ? (totalTaxBurden / totalRevenue) * 100 : 0

  const businessResult: BusinessTaxResult = {
    selfEmploymentTax,
    employerPayrollTax,
    futaTax,
    businessIncomeTax,
    totalTaxBurden,
    effectiveBusinessRate,
    breakdown,
  }

  // Allocations based on total business tax paid
  const allocations: TaxAllocation[] = ALLOCATIONS.map(a => ({
    ...a,
    amount: (totalTaxBurden * a.percentage) / 100,
  }))

  return {
    grossIncome: businessNetIncome,
    federalTax: totalTaxBurden,
    effectiveRate: effectiveBusinessRate,
    marginalRate: 0,
    allocations,
    business: businessResult,
  }
}
