export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000_000_000) return `$${(amount / 1_000_000_000_000).toFixed(1)}T`
    if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`
    return `$${amount.toFixed(0)}`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatLargeNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(num))
}

export function partyColor(party: string): string {
  if (party === 'D') return '#3b82f6'
  if (party === 'R') return '#ef4444'
  return '#8b5cf6'
}

export function partyLabel(party: string): string {
  if (party === 'D') return 'Democrat'
  if (party === 'R') return 'Republican'
  if (party === 'I') return 'Independent'
  return party
}

export function partyBadgeClass(party: string): string {
  if (party === 'D') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
  if (party === 'R') return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
  return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
}
