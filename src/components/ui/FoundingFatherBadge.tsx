import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FoundingFather } from '../../data/foundingFathers'

interface Props {
  father: FoundingFather
  variant?: 'hero' | 'sidebar' | 'compact'
}

function PortraitImg({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [errored, setErrored] = useState(false)
  const initials = alt.split(' ').map(w => w[0]).join('').slice(0, 2)
  if (errored) {
    return (
      <div className={`${className} flex items-center justify-center bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-bold text-lg`}>
        {initials}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}

export function FoundingFatherBadge({ father, variant = 'sidebar' }: Props) {
  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
        <PortraitImg
          src={father.image}
          alt={father.name}
          className="w-12 h-12 rounded-full object-cover object-top border-2 border-amber-400/60 shrink-0"
        />
        <div className="min-w-0">
          <p className="text-amber-300 italic text-xs leading-relaxed line-clamp-2">"{father.quote}"</p>
          <p className="text-white/70 text-xs mt-1">— {father.name}</p>
        </div>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative hidden lg:flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-44 h-52 rounded-2xl overflow-hidden border-4 border-amber-400/60 shadow-2xl shadow-black/50">
            <PortraitImg
              src={father.image}
              alt={father.name}
              className="w-full h-full object-cover object-top sepia-[0.2] brightness-95"
            />
          </div>
          <div className="absolute inset-0 rounded-2xl ring-2 ring-amber-300/30 ring-offset-2 ring-offset-transparent pointer-events-none" />
          <div className="absolute -top-3 -right-3 text-amber-400 text-xl">★</div>
          <div className="absolute -bottom-3 -left-3 text-amber-400 text-sm">★★</div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-white font-bold text-base">{father.name}</p>
          <p className="text-amber-300 text-xs">{father.years}</p>
          <p className="text-white/60 text-xs mt-0.5">{father.title.split(',')[0]}</p>
        </div>
      </motion.div>
    )
  }

  // sidebar variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl overflow-hidden border border-amber-200 dark:border-slate-600 bg-amber-50 dark:bg-slate-800"
    >
      <div className="flex items-center gap-4 p-4 border-b border-amber-200 dark:border-slate-600">
        <PortraitImg
          src={father.image}
          alt={father.name}
          className="w-16 h-20 rounded-xl object-cover object-top border-2 border-amber-400/50 shadow-md sepia-[0.15]"
        />
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">{father.name}</p>
          <p className="text-amber-700 dark:text-amber-400 text-xs mt-0.5">{father.title.split(',')[0]}</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs">{father.years}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-slate-800 dark:text-slate-100 italic text-sm leading-relaxed mb-2">
          "{father.quote}"
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-xs">— {father.quoteSource}</p>
        {father.relevance && (
          <p className="mt-3 text-xs text-slate-700 dark:text-slate-300 border-t border-amber-200 dark:border-slate-600 pt-3">
            {father.relevance}
          </p>
        )}
      </div>
    </motion.div>
  )
}
