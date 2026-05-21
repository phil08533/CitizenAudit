import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, DollarSign, Users, BarChart3, FileText,
  TrendingUp, AlertTriangle, Scroll, Shield,
} from 'lucide-react'
import { SpendingPieChart } from '../components/charts/SpendingPieChart'
import { StatCard } from '../components/ui/StatCard'
import { FOUNDING_FATHERS } from '../data/foundingFathers'
import { formatCurrency } from '../utils/formatters'
import spendingData from '../data/spendingCategories.json'
import debtData from '../data/debtSnapshot.json'
import type { SpendingCategory } from '../types'

const spending = spendingData as SpendingCategory[]
const FEATURES = [
  { icon: <DollarSign className="w-5 h-5" />, title: 'Tax Estimator', desc: 'See where every dollar of your federal tax goes — individual or business.', to: '/tax-estimator', color: '#B22234' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Spending Explorer', desc: 'Browse all categories with subcategories, leadership, and fraud estimates.', to: '/spending', color: '#1E2864' },
  { icon: <Scroll className="w-5 h-5" />, title: 'Tax History', desc: 'From the Boston Tea Party to the 16th Amendment to today.', to: '/tax-history', color: '#6B4226' },
  { icon: <Shield className="w-5 h-5" />, title: 'Citizen Duty', desc: "Why you're responsible — and the specific steps to make change.", to: '/responsibility', color: '#1a6b3a' },
  { icon: <Users className="w-5 h-5" />, title: 'Find Representatives', desc: 'Your senators and House members by ZIP code, with contact info.', to: '/representatives', color: '#7B2D8B' },
  { icon: <FileText className="w-5 h-5" />, title: 'Contact Action', desc: 'Pre-written templates to reach your elected officials today.', to: '/contact', color: '#B26A00' },
]

// 13 stars for the original colonies
const STARS = Array.from({ length: 13 })

export function Home() {
  const totalBudget = spending.reduce((s, c) => s + c.amount, 0)
  const ff = FOUNDING_FATHERS.home

  return (
    <div className="min-h-screen bg-[#f8f7f2] dark:bg-[#0d1117]">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-gradient text-white min-h-[88vh] flex items-center">

        {/* Washington portrait — full background, faded */}
        <div className="absolute inset-0 z-0">
          <img
            src={ff.image}
            alt="George Washington"
            className="w-full h-full object-cover object-center opacity-10 sepia-[0.5]"
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b3e]/95 via-[#0d1b3e]/80 to-[#0d1b3e]/60" />
        </div>

        {/* Stars pattern */}
        <div className="absolute inset-0 z-0 stars-bg opacity-40" />

        {/* Red stripe top accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B22234] via-white to-[#B22234] z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            {/* Left: copy */}
            <div className="lg:col-span-3">
              {/* 13-star badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="flex gap-1">
                  {STARS.map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
                <span className="text-amber-300/80 text-xs font-mono uppercase tracking-widest">
                  Est. 1776 · We the People
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                See Where Your
                <br />
                <span className="text-gradient-patriot">Tax Dollars Go</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-300 max-w-xl mb-4 leading-relaxed font-sans-ui"
              >
                Citizen Audit puts <strong className="text-white">{formatCurrency(totalBudget, true)}</strong> in annual
                federal spending at your fingertips — because an informed citizenry is the bedrock of democracy.
              </motion.p>

              {/* Washington quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mb-10 pl-4 border-l-2 border-amber-400/60"
              >
                <p className="text-amber-200/90 italic text-sm leading-relaxed">
                  "{ff.quote}"
                </p>
                <p className="text-amber-400/70 text-xs mt-1">— George Washington, {ff.years}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/tax-estimator"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#B22234] hover:bg-[#8B1A28] text-white font-bold transition-colors shadow-lg shadow-red-900/40 text-base"
                >
                  Calculate My Share <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/spending"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/25 transition-colors"
                >
                  Explore All Spending
                </Link>
                <Link
                  to="/tax-history"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/30 transition-colors"
                >
                  <Scroll className="w-4 h-4" /> Tax History
                </Link>
              </motion.div>
            </div>

            {/* Right: Washington portrait card */}
            <div className="lg:col-span-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-amber-400/50 shadow-2xl shadow-black/60">
                  <img
                    src={ff.image}
                    alt="George Washington"
                    className="w-full h-full object-cover object-top sepia-[0.2]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e]/70 via-transparent to-transparent" />
                </div>
                {/* Name plate */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <p className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    George Washington
                  </p>
                  <p className="text-amber-300 text-xs">1st President · 1732–1799</p>
                </div>
                {/* Decorative stars */}
                <div className="absolute -top-4 -right-4 text-amber-400 text-3xl">★</div>
                <div className="absolute -bottom-3 -left-3 text-amber-400 text-lg">★★★</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Red/white stripe bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 flex h-2 z-10">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: i % 2 === 0 ? '#B22234' : '#FFFFFF' }} />
          ))}
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Federal Spending" value={formatCurrency(totalBudget, true)} subValue="FY 2023" icon={<DollarSign className="w-4 h-4" />} color="#B22234" delay={0} />
          <StatCard label="National Debt" value={formatCurrency(debtData.totalDebt, true)} subValue={`${(debtData.debtToGDP * 100).toFixed(0)}% of GDP`} icon={<AlertTriangle className="w-4 h-4" />} color="#ef4444" delay={0.1} />
          <StatCard label="Debt Per Citizen" value={formatCurrency(debtData.debtPerCitizen)} subValue="Your share of the national debt" icon={<Users className="w-4 h-4" />} color="#1E2864" delay={0.2} />
          <StatCard label="Annual Debt Interest" value={formatCurrency(debtData.annualInterest, true)} subValue="Paid to bondholders every year" icon={<TrendingUp className="w-4 h-4" />} color="#D4AF37" delay={0.3} />
        </div>
      </section>

      {/* ── SPENDING PIE ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#B22234] rounded-full" />
              <div className="w-4 h-1 bg-white rounded-full" />
              <div className="w-8 h-1 bg-[#1E2864] rounded-full" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Where Does the Money Go?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-sans-ui">
              The federal government spent over {formatCurrency(totalBudget, true)} in FY 2023. Social Security,
              defense, and debt interest alone consume over half. Click any slice to see the full breakdown.
            </p>
            <div className="space-y-3">
              {spending.slice(0, 7).sort((a, b) => b.amount - a.amount).map(cat => (
                <div key={cat.id} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-300 font-sans-ui">{cat.name}</span>
                      <span className="font-bold text-slate-900 dark:text-white font-sans-ui">{formatCurrency(cat.amount, true)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.percentage * 2.2}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 w-9 text-right shrink-0 font-sans-ui">{cat.percentage}%</span>
                </div>
              ))}
            </div>
            <Link to="/spending" className="inline-flex items-center gap-2 mt-6 text-[#B22234] dark:text-red-400 hover:text-[#8B1A28] font-semibold text-sm transition-colors font-sans-ui">
              View all {spending.length} spending categories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-xl">
            <SpendingPieChart data={spending} />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="bg-[#1E2864] dark:bg-[#0a0f2e] py-20 relative overflow-hidden">
        <div className="absolute inset-0 stars-bg" />
        <div className="absolute top-0 left-0 right-0 flex h-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: i % 2 === 0 ? '#B22234' : '#FFFFFF' }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              {STARS.map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
            </div>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Tools for an Informed Citizenry
            </h2>
            <p className="text-blue-200 max-w-xl mx-auto font-sans-ui">
              Every American has the right — and the duty — to understand how their government spends their money.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Link to={f.to} className="block glass-patriot rounded-2xl p-6 h-full group hover:bg-white/12 transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}30`, color: f.color === '#1E2864' ? '#7B9BF8' : f.color }}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2 group-hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>{f.title}</h3>
                  <p className="text-sm text-blue-200 font-sans-ui">{f.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity font-sans-ui">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: i % 2 === 0 ? '#B22234' : '#FFFFFF' }} />
          ))}
        </div>
      </section>

      {/* ── DEBT ALERT ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#B22234]/10 flex items-center justify-center shrink-0 text-3xl">🏛️</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                The National Debt: {formatCurrency(debtData.totalDebt, true)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-sans-ui">
                The Founders specifically warned against burdening future generations with debt they did not incur.
                Today, every citizen owes <strong className="text-slate-900 dark:text-white">{formatCurrency(debtData.debtPerCitizen)}</strong>.
                Annual interest payments of <strong className="text-[#B22234]">{formatCurrency(debtData.annualInterest, true)}</strong> now
                exceed the entire national defense budget — money that will never build a school, a bridge, or protect a single American.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/tax-history" className="inline-flex items-center gap-1.5 text-sm text-[#B22234] dark:text-red-400 hover:text-[#8B1A28] font-semibold font-sans-ui">
                  <Scroll className="w-4 h-4" /> How We Got Here
                </Link>
                <Link to="/responsibility" className="inline-flex items-center gap-1.5 text-sm text-[#1E2864] dark:text-blue-400 hover:text-blue-800 font-semibold font-sans-ui">
                  <Shield className="w-4 h-4" /> What We Can Do
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#B22234] via-[#8B1A28] to-[#1E2864] py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 stars-bg" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="flex justify-center gap-1 mb-4">
            {STARS.map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Make Your Voice Heard
          </h2>
          <p className="text-red-100 mb-8 font-sans-ui leading-relaxed">
            The Founders gave us the tools: the vote, the right to petition, the freedom of speech.
            Understanding where the money goes is the first step to demanding it be spent wisely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/representatives" className="px-7 py-3.5 rounded-xl bg-white text-[#1E2864] font-bold hover:bg-amber-50 transition-colors font-sans-ui">
              Find My Representatives
            </Link>
            <Link to="/contact" className="px-7 py-3.5 rounded-xl bg-white/15 text-white font-semibold border border-white/30 hover:bg-white/25 transition-colors font-sans-ui">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
