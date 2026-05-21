import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Info, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { RepresentativeCard } from '../components/cards/RepresentativeCard'
import { lookupRepsByZip, getMockReps } from '../services/civicinfo'
import type { Representative } from '../types'

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'Washington D.C.',
}

export function Representatives() {
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false)
  const [reps, setReps] = useState<Representative[] | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLookup = async () => {
    const trimmed = zip.trim()
    if (!/^\d{5}$/.test(trimmed)) {
      setError('Please enter a valid 5-digit ZIP code')
      return
    }
    setError('')
    setLoading(true)
    setReps(null)

    try {
      const live = await lookupRepsByZip(trimmed)
      if (live && live.length > 0) {
        setReps(live)
        setIsDemo(false)
      } else {
        // Fall back to demo data
        const state = trimmed.startsWith('9') ? 'CA' : trimmed.startsWith('7') ? 'TX' : 'NY'
        setReps(getMockReps(state))
        setIsDemo(true)
      }
    } catch {
      const state = 'CA'
      setReps(getMockReps(state))
      setIsDemo(true)
    } finally {
      setLoading(false)
    }
  }

  const handleContact = (rep: Representative) => {
    navigate('/contact', { state: { rep } })
  }

  const senators = reps?.filter(r => r.chamber === 'Senate') ?? []
  const houseMembers = reps?.filter(r => r.chamber === 'House') ?? []

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold">Find Your Representatives</h1>
            </div>
            <p className="text-green-100 max-w-xl">
              Enter your ZIP code to find your U.S. senators and House representative, with contact information.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ZIP lookup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto mb-12"
        >
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-500" />
              <h2 className="font-bold text-slate-900 dark:text-white">ZIP Code Lookup</h2>
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Enter ZIP code..."
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && handleLookup()}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <button
                onClick={handleLookup}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Looking up…' : 'Search'}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}

            {isDemo && reps && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Showing demo data. Connect a Google Civic Information API key for real results — see the{' '}
                  <a href="https://developers.google.com/civic-information" target="_blank" rel="noopener noreferrer" className="underline">
                    API docs
                  </a>.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results */}
        {reps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {senators.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  U.S. Senators
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {senators.map((rep, i) => (
                    <RepresentativeCard key={`${rep.name}-${i}`} rep={rep} index={i} onContact={handleContact} />
                  ))}
                </div>
              </div>
            )}

            {houseMembers.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏠</span>
                  U.S. House Representatives
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {houseMembers.map((rep, i) => (
                    <RepresentativeCard key={`${rep.name}-${i}`} rep={rep} index={i} onContact={handleContact} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Info panel when no results */}
        {!reps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid sm:grid-cols-3 gap-6 mt-4"
          >
            {[
              { icon: '📞', title: 'Call Your Senator', desc: 'Phone calls are the most effective way to influence your senators on legislation.' },
              { icon: '✉️', title: 'Email Your Rep', desc: 'Use our templates to quickly send a professional message about issues you care about.' },
              { icon: '🗳️', title: 'Voter Information', desc: 'Find out about upcoming elections, primaries, and deadlines in your area.' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* State name lookup reference */}
        {!reps && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
          >
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer text-sm">
              Browse by State
            </summary>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(STATE_NAMES).map(([abbr, name]) => (
                <button
                  key={abbr}
                  onClick={() => {
                    setReps(getMockReps(abbr))
                    setIsDemo(true)
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
                  title={name}
                >
                  {abbr}
                </button>
              ))}
            </div>
          </motion.details>
        )}
      </div>
    </div>
  )
}
