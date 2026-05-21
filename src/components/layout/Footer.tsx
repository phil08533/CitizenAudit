import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const DATA_SOURCES = [
  { label: 'USA Spending', href: 'https://www.usaspending.gov' },
  { label: 'Fiscal Data Treasury', href: 'https://fiscaldata.treasury.gov' },
  { label: 'Congress.gov API', href: 'https://api.congress.gov' },
  { label: 'OMB Budget', href: 'https://www.whitehouse.gov/omb/budget' },
  { label: 'CBO Outlook', href: 'https://www.cbo.gov' },
  { label: 'GAO High Risk', href: 'https://www.gao.gov/highrisk' },
]

export function Footer() {
  return (
    <footer className="bg-glory-blue text-white">
      {/* Red stripe top */}
      <div className="h-1 bg-glory-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/30 flex items-center justify-center text-lg">
                ★
              </div>
              <span className="font-serif tracking-wide">
                Citizen<span className="text-amber-400">Audit</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              A civic transparency tool for understanding U.S. government spending and holding elected officials accountable.
            </p>
            <p className="text-xs text-white/40 mt-3 italic font-serif">
              "The price of liberty is eternal vigilance."
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/tax-estimator', label: 'Tax Estimator' },
                { to: '/spending', label: 'Spending Explorer' },
                { to: '/representatives', label: 'Representatives' },
                { to: '/tax-history', label: 'Tax History' },
                { to: '/contact', label: 'Take Action' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">Civic Duty</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/responsibility', label: 'Citizen Responsibility' },
                { to: '/about', label: 'About' },
                { to: '/sources', label: 'Sources & Methodology' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">Data Sources</h3>
            <ul className="space-y-2 text-sm">
              {DATA_SOURCES.map(s => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                  >
                    {s.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>Data sourced from official U.S. government APIs and public records. For informational purposes only.</p>
          <p>
            Built for civic transparency ·{' '}
            <a
              href="https://github.com/phil08533/CitizenAudit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Open Source on GitHub
            </a>
          </p>
        </div>
      </div>

      {/* Stars bottom bar */}
      <div className="bg-glory-red py-1.5 text-center text-white/80 text-xs tracking-[0.5em]">
        ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★
      </div>
    </footer>
  )
}
