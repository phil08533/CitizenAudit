import type { Agency } from '../types'
import agenciesData from '../data/agencies.json'

const BASE = 'https://api.usaspending.gov/api/v2'

export async function fetchAgenciesFromAPI(): Promise<Agency[] | null> {
  try {
    const res = await fetch(`${BASE}/references/agency/list/`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    // Transform API response if needed
    return null // Use mock data for now
  } catch {
    return null
  }
}

export function getAgencies(): Agency[] {
  return agenciesData as Agency[]
}

export function getAgencyById(id: string): Agency | undefined {
  return (agenciesData as Agency[]).find(a => a.id === id)
}

export function searchAgencies(query: string): Agency[] {
  const q = query.toLowerCase()
  return (agenciesData as Agency[]).filter(
    a =>
      a.name.toLowerCase().includes(q) ||
      a.abbreviation.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q),
  )
}

export function getAgencyCategories(): string[] {
  const cats = new Set((agenciesData as Agency[]).map(a => a.category))
  return Array.from(cats).sort()
}
