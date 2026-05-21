import { Phone, Globe, Mail, MapPin, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { partyLabel, partyBadgeClass } from '../../utils/formatters'
import type { Representative } from '../../types'

interface Props {
  rep: Representative
  index?: number
  onContact?: (rep: Representative) => void
}

export function RepresentativeCard({ rep, index = 0, onContact }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center shrink-0">
          <User className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate">{rep.name}</h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${partyBadgeClass(rep.party)}`}>
              {partyLabel(rep.party)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
              {rep.chamber}
            </span>
            {rep.district && (
              <span className="text-xs text-slate-500 dark:text-slate-400">{rep.district}</span>
            )}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-2 mb-5">
        {rep.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a href={`tel:${rep.phone}`} className="hover:text-blue-500 transition-colors">
              {rep.phone}
            </a>
          </div>
        )}
        {rep.address && (
          <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-xs leading-relaxed">{rep.address}</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        {rep.phone && (
          <a
            href={`tel:${rep.phone}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Office
          </a>
        )}
        {rep.website && (
          <a
            href={rep.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Website
          </a>
        )}
        {onContact && (
          <button
            onClick={() => onContact(rep)}
            className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Email Representative
          </button>
        )}
      </div>
    </motion.div>
  )
}
