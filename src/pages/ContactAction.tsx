import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Mail, Copy, CheckCheck, FileText, ChevronDown } from 'lucide-react'
import { FoundingFatherBadge } from '../components/ui/FoundingFatherBadge'
import { FOUNDING_FATHERS } from '../data/foundingFathers'
import type { Representative } from '../types'

interface Template {
  id: string
  label: string
  subject: string
  body: (repName: string, senderName: string) => string
  category: 'budget' | 'defense' | 'healthcare' | 'education' | 'general'
  tone: 'support' | 'opposition' | 'inquiry'
}

const TEMPLATES: Template[] = [
  {
    id: 'debt_concern',
    label: 'National Debt Concern',
    subject: 'Urgent: Federal Fiscal Responsibility',
    category: 'budget',
    tone: 'inquiry',
    body: (rep, sender) => `Dear ${rep},

I am writing as a concerned constituent to express my serious concern about the growing national debt, which has now surpassed $33.9 trillion.

As your constituent, I urge you to:
1. Support balanced budget amendments that require fiscal discipline
2. Conduct meaningful audits of all federal agency spending
3. Reduce wasteful spending while protecting essential social programs
4. Work across the aisle on long-term debt reduction strategies

The annual interest payment on our national debt has now exceeded $659 billion — money that could otherwise fund schools, infrastructure, or reduce the tax burden on working Americans.

I look forward to your response on this critical issue.

Sincerely,
${sender}`,
  },
  {
    id: 'defense_audit',
    label: 'Defense Spending Audit',
    subject: 'Request: Pentagon Budget Accountability',
    category: 'defense',
    tone: 'inquiry',
    body: (rep, sender) => `Dear ${rep},

I am contacting you about accountability in our defense budget. The Department of Defense has spent over $858 billion in FY 2023 — yet has never passed a comprehensive financial audit.

As your constituent, I urge you to:
1. Support legislation requiring full DoD financial audits
2. Eliminate duplicate defense contracts and no-bid awards
3. Ensure oversight of contractor performance and cost overruns
4. Redirect savings toward veterans' care and domestic priorities

Fiscal accountability in defense is not about weakening national security — it's about ensuring taxpayer dollars are spent wisely.

Thank you for your service and attention to this matter.

Sincerely,
${sender}`,
  },
  {
    id: 'healthcare_funding',
    label: 'Healthcare Funding Support',
    subject: 'Support for Medicare and Medicaid Funding',
    category: 'healthcare',
    tone: 'support',
    body: (rep, sender) => `Dear ${rep},

I am writing to urge you to protect and strengthen Medicare and Medicaid funding in the upcoming budget discussions.

Together, Medicare and Medicaid serve over 140 million Americans, including seniors, people with disabilities, children, and low-income families. Any cuts to these programs would have severe consequences for the most vulnerable in our communities.

I urge you to:
1. Oppose any cuts to Medicare or Medicaid benefits
2. Support negotiations to lower prescription drug prices
3. Ensure full funding for community health centers
4. Protect Medicaid expansion in all states

Please stand with your constituents and protect these vital programs.

Sincerely,
${sender}`,
  },
  {
    id: 'education_funding',
    label: 'Education Funding Request',
    subject: 'Investing in American Education',
    category: 'education',
    tone: 'support',
    body: (rep, sender) => `Dear ${rep},

I am writing to urge you to prioritize federal education funding in this year's budget. Strong public education is the foundation of American opportunity and economic competitiveness.

Specifically, I ask that you:
1. Maintain or increase Title I funding for schools serving low-income students
2. Support Pell Grant expansion to make college more affordable
3. Fund early childhood education programs like Head Start
4. Invest in STEM education and vocational training

Education funding today is an investment in economic growth, reduced inequality, and a stronger democracy tomorrow.

Thank you for your consideration.

Sincerely,
${sender}`,
  },
  {
    id: 'budget_transparency',
    label: 'Budget Transparency Request',
    subject: 'Request for Greater Budget Transparency',
    category: 'general',
    tone: 'inquiry',
    body: (rep, sender) => `Dear ${rep},

As a constituent who cares deeply about government accountability, I am writing to ask you to support greater transparency in the federal budget process.

I ask that you champion:
1. Plain-language budget summaries accessible to all citizens
2. Real-time spending dashboards on government websites
3. Mandatory public hearings on all major budget proposals
4. Stronger whistleblower protections for those who expose waste

An informed citizenry is essential to democracy. When people understand where their tax dollars go, they can make better decisions about who represents them.

I trust you will consider this important request.

Sincerely,
${sender}`,
  },
  {
    id: 'veterans_care',
    label: 'Veterans Affairs Funding',
    subject: 'Protect Veterans Benefits and Healthcare',
    category: 'general',
    tone: 'support',
    body: (rep, sender) => `Dear ${rep},

I am writing to urge you to fully fund and protect the Department of Veterans Affairs and all programs that serve our veterans.

Those who have served our country deserve:
1. Timely access to quality healthcare through the VA system
2. Full disability benefits without bureaucratic delays
3. Robust mental health services to address veteran suicide
4. Housing assistance to combat veteran homelessness
5. Education benefits that fulfill our promise to veterans

Please ensure that our commitment to veterans is reflected in the federal budget.

With respect,
${sender}`,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  budget: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  defense: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  healthcare: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  education: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  general: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
}

export function ContactAction() {
  const location = useLocation()
  const incomingRep = location.state?.rep as Representative | undefined

  const [repName, setRepName] = useState(incomingRep ? incomingRep.name : 'Senator/Representative [Name]')
  const [senderName, setSenderName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0])
  const [copied, setCopied] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    if (incomingRep) {
      setRepName(incomingRep.name)
    }
  }, [incomingRep])

  const emailBody = selectedTemplate.body(repName, senderName || '[Your Name]')
  const mailtoLink = `mailto:?subject=${encodeURIComponent(selectedTemplate.subject)}&body=${encodeURIComponent(emailBody)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredTemplates = filterCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === filterCategory)

  return (
    <div className="min-h-screen bg-[#f8f7f2] dark:bg-slate-950">
      {/* Header */}
      <section className="hero-gradient stars-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h1 className="text-3xl font-bold font-serif">Contact Action Center</h1>
                </div>
                <p className="text-white/75 max-w-xl mb-4">
                  Use pre-written templates to contact your elected officials about budget priorities and government accountability. Congress responds to constituent pressure — your call matters.
                </p>
                <FoundingFatherBadge father={FOUNDING_FATHERS.contact} variant="compact" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template picker */}
          <div className="lg:col-span-1 space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
            >
              <h2 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                Choose a Template
              </h2>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['all', 'budget', 'defense', 'healthcare', 'education', 'general'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors capitalize ${
                      filterCategory === cat
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredTemplates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedTemplate.id === t.id
                        ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{t.label}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${CATEGORY_COLORS[t.category]}`}>
                        {t.tone}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{t.subject}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Personalization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
            >
              <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Personalize</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Representative's Name
                  </label>
                  <input
                    type="text"
                    value={repName}
                    onChange={e => setRepName(e.target.value)}
                    placeholder="Senator/Representative Name"
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Email preview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
            >
              {/* Email header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Subject</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedTemplate.subject}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <a
                      href={mailtoLink}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Open in Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Email body */}
              <div className="p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {emailBody}
                </pre>
              </div>

              {/* Disclosure */}
              <div className="px-6 pb-5">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <p>
                    This is a template — review and customize it before sending. All views expressed in templates are sample civic engagement language and do not represent official positions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Tips for Effective Contact</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
                {[
                  { icon: '📞', tip: 'Phone calls have the highest impact — staffers tally calls daily.' },
                  { icon: '✍️', tip: 'Personalize the template with your specific local concerns.' },
                  { icon: '📮', tip: 'Physical letters from constituents are taken very seriously.' },
                  { icon: '🔄', tip: 'Follow up — consistent contact shows strong constituent interest.' },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-base shrink-0">{t.icon}</span>
                    <p className="text-xs">{t.tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
