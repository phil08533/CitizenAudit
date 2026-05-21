import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  label: string
  value: string
  subValue?: string
  icon?: ReactNode
  color?: string
  delay?: number
}

export function StatCard({ label, value, subValue, icon, color = '#3b82f6', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
        {icon && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      {subValue && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subValue}</p>}
    </motion.div>
  )
}
