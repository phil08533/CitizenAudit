import { Link } from 'react-router-dom'
import { BarChart3, ExternalLink } from 'lucide-react'

const DATA_SOURCES = [
  { label: 'USA Spending', href: 'https://www.usaspending.gov' },
  { label: 'Fiscal Data Treasury', href: 'https://fiscaldata.treasury.gov' },
  { label: 'Congress.gov API', href: 'https://api.congress.gov' },
  { label: 'OMB Budget', href: 'https://www.whitehouse.gov/omb/budget' },
  { label: 'CBO Outlook', href: 'https://www.cbo.gov' },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-900 dark:text-white">
                Citizen<span className="text-blue-500">Audit</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A civic transparency tool for understanding U.S. government spending and holding elected officials accountable.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/tax-estimator', label: 'Tax Estimator' },
                { to: '/spending', label: 'Spending Explorer' },
                { to: '/representatives', label: 'Representatives' },
                { to: '/contact', label: 'Contact Action' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Info
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/about', label: 'About' },
                { to: '/sources', label: 'Sources & Methodology' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Data Sources
            </h3>
            <ul className="space-y-2 text-sm">
              {DATA_SOURCES.map(s => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {s.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>
            Data sourced from official U.S. government APIs and public records. For informational purposes only.
          </p>
          <p>
            Built with ❤️ for civic transparency ·{' '}
            <a
              href="https://github.com/phil08533/CitizenAudit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Open Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
