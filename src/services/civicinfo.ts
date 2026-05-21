import type { Representative } from '../types'

// Google Civic Information API — key required; demo mode falls back to mock data
const CIVIC_API = 'https://www.googleapis.com/civicinfo/v2'
const API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY || ''

interface GoogleOfficial {
  name: string
  party?: string
  phones?: string[]
  urls?: string[]
  emails?: string[]
  address?: Array<{ line1?: string; city?: string; state?: string; zip?: string }>
  photoUrl?: string
}

interface GoogleOffice {
  name: string
  levels?: string[]
  roles?: string[]
  officialIndices?: number[]
}

export async function lookupRepsByZip(zip: string): Promise<Representative[] | null> {
  if (!API_KEY) return null

  try {
    const url = `${CIVIC_API}/representatives?address=${encodeURIComponent(zip)}&levels=country&key=${API_KEY}`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null

    const data = await res.json() as {
      offices: GoogleOffice[]
      officials: GoogleOfficial[]
    }

    const reps: Representative[] = []

    for (const office of data.offices) {
      const isFederal = office.levels?.includes('country')
      if (!isFederal) continue

      const isSenate = office.name.toLowerCase().includes('senator')
      const chamber: Representative['chamber'] = isSenate ? 'Senate' : 'House'

      for (const idx of office.officialIndices ?? []) {
        const o = data.officials[idx]
        if (!o) continue
        const addr = o.address?.[0]
        reps.push({
          name: o.name,
          party: o.party?.charAt(0) ?? 'I',
          chamber,
          state: zip.slice(0, 2),
          phone: o.phones?.[0],
          website: o.urls?.[0],
          email: o.emails?.[0],
          address: addr ? `${addr.line1 ?? ''}, ${addr.city ?? ''}, ${addr.state ?? ''} ${addr.zip ?? ''}`.trim() : undefined,
          photo: o.photoUrl,
        })
      }
    }

    return reps
  } catch {
    return null
  }
}

export function getMockReps(state: string): Representative[] {
  const demos: Representative[] = [
    {
      name: 'Senator Jane Smith',
      party: 'D',
      chamber: 'Senate',
      state,
      phone: '(202) 224-0000',
      website: 'https://www.senate.gov',
      address: '100 Hart Senate Office Building, Washington, DC 20510',
    },
    {
      name: 'Senator John Doe',
      party: 'R',
      chamber: 'Senate',
      state,
      phone: '(202) 224-1111',
      website: 'https://www.senate.gov',
      address: '200 Russell Senate Office Building, Washington, DC 20510',
    },
    {
      name: 'Rep. Maria Johnson',
      party: 'D',
      chamber: 'House',
      state,
      district: '5th District',
      phone: '(202) 225-0000',
      website: 'https://www.house.gov',
      address: '300 Cannon House Office Building, Washington, DC 20515',
    },
  ]
  return demos
}
