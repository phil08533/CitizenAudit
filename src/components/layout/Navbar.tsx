import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tax-estimator', label: 'Tax Estimator' },
  { to: '/spending', label: 'Spending' },
  { to: '/representatives', label: 'Representatives' },
  { to: '/tax-history', label: 'Tax History' },
  { to: '/responsibility', label: 'Your Duty' },
  { to: '/contact', label: 'Take Action' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-glory-blue shadow-lg shadow-black/20">
      {/* Red stripe accent at top */}
      <div className="h-1 bg-glory-red" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/30 flex items-center justify-center text-white text-base">
              ★
            </div>
            <span className="text-white font-serif tracking-wide">
              Citizen<span className="text-amber-400">Audit</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.to
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-white/20 bg-glory-blue"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.to
                      ? 'bg-white/20 text-white font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
