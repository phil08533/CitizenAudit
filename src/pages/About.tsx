import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart3, Shield, Globe, Heart, ArrowRight } from 'lucide-react'

const PRINCIPLES = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Open & Transparent',
    desc: 'All data comes from official U.S. government sources. Every number is linked to its source so you can verify it yourself.',
    color: '#3b82f6',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'No Tracking',
    desc: 'We don\'t collect personal data, require login, or track your activity. Your civic curiosity is private.',
    color: '#10b981',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Non-Partisan',
    desc: 'We present government data without political spin. Republicans, Democrats, and Independents all deserve the same facts.',
    color: '#8b5cf6',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Civic Empowerment',
    desc: 'Understanding how your money is spent is the first step to making your voice heard. We make that easy.',
    color: '#ef4444',
  },
]

export function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold mb-3">About Citizen Audit</h1>
            <p className="text-slate-300 max-w-xl text-lg">
              A free, open-source civic transparency tool that puts government spending data in your hands.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Citizen Audit was built on a simple belief: <strong className="text-slate-900 dark:text-white">democracy works better when citizens understand where their money goes.</strong>
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The federal government spends over $6.5 trillion annually — that's roughly $19,700 for every man, woman, and child in the country. Yet most Americans have little idea how that money is allocated, which agencies receive it, or how efficiently it's spent.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We built this tool to change that. By combining public API data with clear visualizations and simple language, we help ordinary citizens understand the federal budget, find their representatives, and take action.
          </p>
        </motion.section>

        {/* Principles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Principles</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  {p.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technology</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Citizen Audit is a fully static web app — no server, no database, no authentication. It runs entirely in your browser.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'React', 'TypeScript', 'Vite', 'TailwindCSS', 'Recharts',
              'Framer Motion', 'React Router', 'GitHub Pages',
            ].map(tech => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Start Exploring</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Dive into the data and make your voice heard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/tax-estimator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
            >
              Try the Tax Estimator
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/spending"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Explore Spending Data
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
