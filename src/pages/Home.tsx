import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, DollarSign, Users, BarChart3, FileText,
  TrendingUp, AlertTriangle, ExternalLink,
} from 'lucide-react'
import { SpendingPieChart } from '../components/charts/SpendingPieChart'
import { StatCard } from '../components/ui/StatCard'
import { formatCurrency } from '../utils/formatters'
import spendingData from '../data/spendingCategories.json'
import debtData from '../data/debtSnapshot.json'
import type { SpendingCategory } from '../types'

const spending = spendingData as SpendingCategory[]

const FEATURES = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: 'Tax Estimator',
    desc: 'See exactly where your federal income tax goes — down to the dollar.',
    to: '/tax-estimator',
    color: '#3b82f6',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Spending Explorer',
    desc: 'Browse all federal agencies, contracts, and budget breakdowns.',
    to: '/spending',
    color: '#8b5cf6',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Find Representatives',
    desc: 'Look up your senators and House members by ZIP code.',
    to: '/representatives',
    color: '#10b981',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Contact Action',
    desc: 'Use pre-written templates to reach your elected officials.',
    to: '/contact',
    color: '#f59e0b',
  },
]

export function Home() {
  const totalBudget = spending.reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24 lg:py-32">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgb(59 130 246 / 0.3) 1px, transparent 1px), linear-gradient(90deg, rgb(59 130 246 / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              FY 2023 Data · Publicly Available Sources
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              See Where Your{' '}
              <span className="text-gradient">Tax Dollars Go</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Citizen Audit makes U.S. government spending transparent and understandable.
              Explore {formatCurrency(totalBudget, true)} in annual federal spending — and hold your government accountable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tax-estimator"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors shadow-lg shadow-blue-500/30"
              >
                Calculate My Share
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/spending"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 transition-colors"
              >
                Explore All Spending
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Federal Spending"
            value={formatCurrency(totalBudget, true)}
            subValue="FY 2023"
            icon={<DollarSign className="w-4 h-4" />}
            color="#3b82f6"
            delay={0}
          />
          <StatCard
            label="National Debt"
            value={formatCurrency(debtData.totalDebt, true)}
            subValue={`${(debtData.debtToGDP * 100).toFixed(0)}% of GDP`}
            icon={<AlertTriangle className="w-4 h-4" />}
            color="#ef4444"
            delay={0.1}
          />
          <StatCard
            label="Debt Per Citizen"
            value={formatCurrency(debtData.debtPerCitizen)}
            subValue="Your share of the national debt"
            icon={<Users className="w-4 h-4" />}
            color="#f59e0b"
            delay={0.2}
          />
          <StatCard
            label="Annual Interest"
            value={formatCurrency(debtData.annualInterest, true)}
            subValue="Paid on national debt annually"
            icon={<TrendingUp className="w-4 h-4" />}
            color="#8b5cf6"
            delay={0.3}
          />
        </div>
      </section>

      {/* Spending Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Where Does the Money Go?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The U.S. federal government spent over {formatCurrency(totalBudget, true)} in FY 2023. Social safety net programs,
              defense, and debt interest make up the majority of spending.
            </p>

            <div className="space-y-3">
              {spending.slice(0, 6).map(cat => (
                <div key={cat.id} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(cat.amount, true)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 w-10 text-right">{cat.percentage}%</span>
                </div>
              ))}
            </div>

            <Link
              to="/spending"
              className="inline-flex items-center gap-2 mt-6 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              View all spending categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4"
          >
            <SpendingPieChart data={spending} />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Tools for Civic Transparency
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Everything you need to understand and engage with your government.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={f.to}
                  className="block card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 h-full group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${f.color}20`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* National Debt Alert */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                The National Debt: {formatCurrency(debtData.totalDebt, true)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                The U.S. national debt has more than tripled since 2000. At {formatCurrency(debtData.annualInterest, true)} per year,
                interest payments now exceed the entire defense budget. Every citizen's share: {formatCurrency(debtData.debtPerCitizen)}.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 font-medium"
                >
                  View Live Debt Clock
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  to="/spending"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium"
                >
                  Explore Spending Data
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
          <p className="text-blue-100 mb-8">
            Understanding the budget is the first step. Contact your representatives and demand accountability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/representatives"
              className="px-7 py-3.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              Find My Representatives
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl bg-white/15 text-white font-semibold border border-white/30 hover:bg-white/25 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
