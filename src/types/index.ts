export interface FraudEstimate {
  amount: number
  percentage: number
  source: string
  examples: string[]
}

export interface SubCategory {
  id: string
  name: string
  amount: number
  lead: string
  leadTitle: string
  description: string
  spendingItems: string[]
  fraudEstimate?: FraudEstimate
}

export interface SpendingCategory {
  id: string
  name: string
  amount: number
  percentage: number
  color: string
  description: string
  lead?: string
  leadTitle?: string
  leadWebsite?: string
  spendingItems?: string[]
  fraudEstimate?: FraudEstimate
  subCategories?: SubCategory[]
}

export interface Agency {
  id: string
  name: string
  abbreviation: string
  category: string
  budget: number
  description: string
  website: string
  usasUrl?: string
  contracts?: Contract[]
  budgetHistory?: BudgetYear[]
}

export interface Contract {
  id: string
  recipient: string
  amount: number
  description: string
  year: number
  category: string
}

export interface BudgetYear {
  year: number
  amount: number
}

export interface Representative {
  name: string
  party: 'D' | 'R' | 'I' | string
  chamber: 'Senate' | 'House'
  state: string
  district?: string
  phone?: string
  website?: string
  email?: string
  address?: string
  photo?: string
  nextElection?: string
}

export interface TaxInputs {
  income: number
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household'
  state: string
  dependents: number
  mode: 'individual' | 'business'
  // Business-specific
  businessType?: 'sole_prop' | 's_corp' | 'c_corp' | 'partnership'
  businessNetIncome?: number
  ownerSalary?: number       // For S-corp: W-2 salary paid to self
  numEmployees?: number
  totalEmployeeWages?: number
}

export interface TaxAllocation {
  category: string
  percentage: number
  amount: number
  color: string
  description: string
  icon: string
}

export interface BusinessTaxResult {
  selfEmploymentTax: number
  employerPayrollTax: number
  futaTax: number
  businessIncomeTax: number
  totalTaxBurden: number
  effectiveBusinessRate: number
  breakdown: BusinessTaxLine[]
}

export interface BusinessTaxLine {
  label: string
  amount: number
  rate?: string
  note?: string
  color: string
}

export interface TaxResult {
  grossIncome: number
  federalTax: number
  effectiveRate: number
  marginalRate: number
  allocations: TaxAllocation[]
  business?: BusinessTaxResult
}

export interface DebtSnapshot {
  totalDebt: number
  debtPerCitizen: number
  annualInterest: number
  debtToGDP: number
  lastUpdated: string
}

export interface SpendingFilter {
  search: string
  category: string
  sortBy: 'amount_desc' | 'amount_asc' | 'name_asc' | 'name_desc'
  minAmount?: number
  maxAmount?: number
}

export type Theme = 'light' | 'dark'
