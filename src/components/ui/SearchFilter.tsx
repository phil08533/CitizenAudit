import { Search, SlidersHorizontal } from 'lucide-react'
import type { SpendingFilter } from '../../types'

interface Props {
  filter: SpendingFilter
  categories: string[]
  onChange: (filter: SpendingFilter) => void
}

export function SearchFilter({ filter, categories, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search agencies..."
          value={filter.search}
          onChange={e => onChange({ ...filter, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
        <select
          value={filter.category}
          onChange={e => onChange({ ...filter, category: e.target.value })}
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filter.sortBy}
          onChange={e => onChange({ ...filter, sortBy: e.target.value as SpendingFilter['sortBy'] })}
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="amount_desc">Highest Budget</option>
          <option value="amount_asc">Lowest Budget</option>
          <option value="name_asc">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
        </select>
      </div>
    </div>
  )
}
