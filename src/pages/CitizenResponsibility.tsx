import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle, AlertTriangle, Users, Vote, FileText, Phone, DollarSign, BookOpen, Scale, Shield } from 'lucide-react'
import { FoundingFatherBadge } from '../components/ui/FoundingFatherBadge'
import { FOUNDING_FATHERS } from '../data/foundingFathers'

interface ActionItem {
  title: string
  description: string
  steps: string[]
  impact: 'high' | 'medium' | 'foundational'
  timeframe: string
  resources?: string[]
}

interface ReasonSection {
  id: string
  icon: React.ReactNode
  title: string
  subtitle: string
  body: string
  quote?: string
  quoteAuthor?: string
  stat?: string
  statLabel?: string
}

const REASONS: ReasonSection[] = [
  {
    id: 'founders-intent',
    icon: <Scale className="w-6 h-6" />,
    title: 'The Founders Designed It That Way',
    subtitle: 'Self-government is not a spectator sport',
    body: 'The Constitution begins with "We the People" — not "We the Government." The Founders deliberately created a system that requires active citizen participation. They designed three co-equal branches, free elections, free speech, and the right to petition precisely because they knew government would grow and consolidate power if citizens stood back. Madison wrote that "the people are the only legitimate fountain of power" — and that fountain dries up when citizens disengage.',
    quote: 'If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary.',
    quoteAuthor: 'James Madison, Federalist No. 51',
    stat: '1787',
    statLabel: 'Year the Constitution placed sovereignty in citizens, not rulers',
  },
  {
    id: 'taxation-consent',
    icon: <DollarSign className="w-6 h-6" />,
    title: 'You Pay For It — You Own It',
    subtitle: 'Taxation without accountability is tyranny',
    body: 'The average American works from January 1 to approximately April 19 just to pay their federal, state, and local tax burden. That is roughly 110 days of your labor — surrendered to government. In return, you have not merely a right but a duty to scrutinize every dollar. The Boston Tea Party was not about the amount of the tax. It was about consent and accountability. Nothing has changed. $33.9 trillion in national debt was accumulated with your tax dollars and your children\'s future earnings. That was done in your name.',
    quote: 'The moment the idea is admitted into society that property is not as sacred as the law of God, and that there is not a force of law and public justice to protect it, anarchy and tyranny commence.',
    quoteAuthor: 'John Adams, A Defense of the Constitutions of Government, 1787',
    stat: '$127,000',
    statLabel: 'Your share of the national debt (every man, woman, and child)',
  },
  {
    id: 'information-power',
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Ignorance Is the Enemy of Liberty',
    subtitle: 'Governments grow in the dark',
    body: 'Every dollar of waste, fraud, and abuse in the federal budget exists partly because most citizens have no idea how their money is spent. The GAO estimates $175–$521 billion in improper payments annually. The Pentagon has failed its audit five years running — $800 billion in unaccounted transactions. This is not a secret. It is public record. But it persists because citizens do not read it, do not share it, and do not demand consequences. Transparency only works when people look.',
    quote: 'The liberties of a people never were, nor ever will be, secure when the transactions of their rulers may be concealed from them.',
    quoteAuthor: 'Patrick Henry, Virginia Ratifying Convention, 1788',
    stat: '$521B',
    statLabel: 'Estimated annual improper payments — GAO High Risk Report 2023',
  },
  {
    id: 'elections-matter',
    icon: <Vote className="w-6 h-6" />,
    title: 'Elections Are the Audit Mechanism',
    subtitle: 'Voting is accountability, not just participation',
    body: 'The primary check on government power is the ballot box. But voting alone is insufficient if voters do not know what their representatives have done. Congressmen vote on trillion-dollar budgets with almost no public scrutiny. Only 27% of Americans can name their U.S. Representative. Only 1 in 5 know which party controls the House. This information vacuum lets incumbents escape accountability for votes that directly affect your wallet, your healthcare, and your children\'s debt. Informed voting is the highest civic duty.',
    quote: 'Elections belong to the people. It is their decision. If they decide to turn their back on the fire and burn their behinds, then they will just have to sit on their blisters.',
    quoteAuthor: 'Abraham Lincoln',
    stat: '27%',
    statLabel: 'Americans who can name their U.S. Representative (Annenberg Survey)',
  },
  {
    id: 'contact-works',
    icon: <Phone className="w-6 h-6" />,
    title: 'Contacting Representatives Actually Works',
    subtitle: 'Congress responds to constituent pressure',
    body: 'Studies consistently show that constituent calls and letters influence congressional votes — especially in swing districts. During the 2017 ACA repeal debate, Senate offices reported being "flooded" with calls that shifted senator positions. The Capitol switchboard receives millions of calls during major legislative fights. Every Congressional office tracks constituent contacts as a metric. A single persistent constituent in a small district can shift staff priorities. You are not shouting into the void. You are the person they are trying to please.',
    quote: 'Let each citizen remember at the moment he is offering his vote... that he is executing one of the most solemn trusts in human society for which he is accountable to God and his country.',
    quoteAuthor: 'Samuel Adams, Boston Gazette, 1781',
    stat: '1 call',
    statLabel: 'From a constituent in a small district can shift a Congressional staffer\'s priority list',
  },
  {
    id: 'collective-action',
    icon: <Users className="w-6 h-6" />,
    title: 'The Minority Can Move the Majority',
    subtitle: 'Organized citizens outweigh passive millions',
    body: 'The Boston Tea Party involved 116 men. The Montgomery Bus Boycott was organized by a handful of community leaders. The Contract With America was drafted by a small team and signed by 367 candidates. History shows repeatedly that a small, organized, informed minority consistently reshapes policy against larger, disengaged majorities. The Founders knew this. Samuel Adams built a revolution from local committees of correspondence — essentially the original civic social network. The architecture still exists. It just needs users.',
    quote: 'It does not require a majority to prevail, but rather an irate, tireless minority keen to set brushfires in people\'s minds.',
    quoteAuthor: 'Samuel Adams',
    stat: '116',
    statLabel: 'Men who dumped 342 chests of tea — and triggered a revolution',
  },
  {
    id: 'debt-crisis',
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'The Debt Crisis Is a Moral Emergency',
    subtitle: 'Future generations cannot vote today',
    body: 'The United States owes $33.9 trillion — more than the entire GDP. Interest payments alone will exceed $1 trillion in 2024, surpassing defense spending. The CBO projects debt held by the public will reach 200% of GDP by 2050 if current trends continue. This is not an abstract economic problem. It is a generational transfer of obligation — your children will be born owing money to bondholders for spending decisions made before they could vote. No generation has the right to shackle the next. Reducing the debt requires citizens who care enough to demand it.',
    quote: 'The earth belongs to the living, not to the dead... No generation can contract debts greater than may be paid during the course of its own existence.',
    quoteAuthor: 'Thomas Jefferson, Letter to James Madison, September 6, 1789',
    stat: '$3.6M',
    statLabel: 'Added to national debt every minute — U.S. Debt Clock',
  },
  {
    id: 'local-power',
    icon: <Shield className="w-6 h-6" />,
    title: 'Local Government Is Where Your Power Is Greatest',
    subtitle: 'School boards, city councils, and county commissioners shape daily life',
    body: 'Your school board controls your children\'s curriculum. Your city council controls zoning, police, and local taxes. Your county commissioner controls property assessment, roads, and services. These officials are elected by hundreds or thousands of voters — not millions. A single organized neighborhood can flip a school board seat. Yet local election turnout averages 15–27%. The most powerful civic lever most Americans have is one they almost never pull. Federal outrage is understandable. Local action is transformative.',
    quote: 'The smallest actual good is better than the most magnificent promise of impossibilities.',
    quoteAuthor: 'Thomas Macaulay (admired by the Founders)',
    stat: '15%',
    statLabel: 'Average voter turnout in local elections — the elections you can most influence',
  },
]

const ACTIONS: ActionItem[] = [
  {
    title: 'Know Your Representatives',
    description: 'You cannot hold accountable what you cannot name. Start with the basics.',
    steps: [
      'Find your U.S. Representative at house.gov/representatives/find-your-representative',
      'Find both your U.S. Senators at senate.gov',
      'Find your state legislators at ncsl.org/research/about-state-legislatures/state-legislative-websites.aspx',
      'Find your local officials (school board, city council, county commission) at your county or city website',
      'Save all their phone numbers and email addresses in your contacts',
    ],
    impact: 'foundational',
    timeframe: '30 minutes',
  },
  {
    title: 'Read the Federal Budget',
    description: 'The full federal budget is public. You paid for it. Read it.',
    steps: [
      'Visit fiscaldata.treasury.gov for the actual spending data',
      'Visit usaspending.gov for agency-by-agency breakdowns',
      'Read the GAO High Risk List (gao.gov/highrisk) — the government\'s own list of waste-prone programs',
      'Follow the CBO (cbo.gov) for nonpartisan budget projections',
      'Set a monthly calendar reminder to check your representative\'s voting record',
    ],
    impact: 'foundational',
    timeframe: '2 hours to start, 30 min/month to maintain',
    resources: ['fiscaldata.treasury.gov', 'usaspending.gov', 'gao.gov/highrisk', 'cbo.gov'],
  },
  {
    title: 'Contact Your Representatives Regularly',
    description: 'Phone calls are more effective than emails. Show up in person when possible.',
    steps: [
      'Call the U.S. Capitol switchboard: (202) 224-3121 — they will connect you to any member',
      'Be specific: name the bill, vote, or issue; give your zip code so they know you\'re a constituent',
      'Call district offices (not just DC) — local staff have more direct access to the member',
      'Follow up in writing to create a paper trail',
      'Organize neighbors to call on the same issue on the same day — volume matters',
    ],
    impact: 'high',
    timeframe: '5–15 minutes per call',
  },
  {
    title: 'Attend Town Halls and Public Hearings',
    description: 'Representatives must answer questions in person. Show up.',
    steps: [
      'Sign up for your representative\'s email newsletter — they announce town halls there',
      'Check your city/county website calendar for public hearings on budget, zoning, and policy',
      'Prepare a specific, factual question — not a speech, a question',
      'Bring a neighbor — visible constituent presence multiplies impact',
      'Record the exchange (legally, in public settings) and share it',
    ],
    impact: 'high',
    timeframe: '1–3 hours per event',
  },
  {
    title: 'Vote in Every Election — Including Local',
    description: 'Local elections determine most of daily life and are decided by tiny margins.',
    steps: [
      'Register at vote.gov — takes 5 minutes',
      'Request mail ballot or find your polling place at vote.gov',
      'Vote in primaries — this is where most districts are actually decided',
      'Research candidates for school board, city council, and county offices',
      'Bring one person with you who would not otherwise vote',
    ],
    impact: 'high',
    timeframe: '1–2 hours every election cycle',
  },
  {
    title: 'File a FOIA Request',
    description: 'The Freedom of Information Act gives you the legal right to see government records.',
    steps: [
      'Identify the agency you want records from',
      'Submit a request at foia.gov — the portal for all federal agencies',
      'Be specific: name the program, office, date range, and type of records',
      'Agencies must respond within 20 business days (often longer in practice — follow up)',
      'If denied, appeal — appeals are often successful and cost nothing',
    ],
    impact: 'medium',
    timeframe: '1–2 hours to file; weeks to months for response',
    resources: ['foia.gov'],
  },
  {
    title: 'Report Fraud, Waste, and Abuse',
    description: 'Every major federal agency has an Inspector General hotline. Use it.',
    steps: [
      'Medicare fraud: 1-800-HHS-TIPS (1-800-447-8477) or oig.hhs.gov',
      'Defense fraud: defense.gov/Contact/Hotline or (800) 424-9098',
      'Tax fraud: IRS Whistleblower Office at irs.gov/compliance/whistleblower',
      'General federal fraud: ignet.gov lists all Inspector General offices',
      'GAO FraudNET: gao.gov/about/what-gao-does/fraudnet — (800) 424-5454',
    ],
    impact: 'high',
    timeframe: '30–60 minutes per report',
    resources: ['ignet.gov', 'gao.gov/about/what-gao-does/fraudnet'],
  },
  {
    title: 'Join or Form a Civic Organization',
    description: 'Organized citizens have permanent presence; individuals fade.',
    steps: [
      'Find your local League of Women Voters chapter (lwv.org) — nonpartisan, powerful',
      'Attend a city council or school board meeting and stay after to meet regulars',
      'Start a neighborhood civic group: monthly meetings, shared research, coordinated calls',
      'Connect with local journalists — they amplify citizen findings',
      'Run for local office yourself — school boards are decided by hundreds of votes',
    ],
    impact: 'high',
    timeframe: 'Ongoing — 2–4 hours/month minimum',
  },
  {
    title: 'Teach Civic Literacy to Your Children and Community',
    description: 'The next generation of voters is formed now.',
    steps: [
      'Review your school board\'s civics curriculum — attend a board meeting if it\'s inadequate',
      'Talk about government spending, taxes, and debt at the dinner table',
      'Show children this site and explain where tax money goes',
      'Share civic information on social media — accuracy over outrage',
      'Mentor a young voter through their first election cycle',
    ],
    impact: 'foundational',
    timeframe: 'Ongoing',
  },
]

const impactColors = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  foundational: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
}

const impactLabels = {
  high: 'High Impact',
  medium: 'Medium Impact',
  foundational: 'Foundational',
}

function ReasonCard({ reason }: { reason: ReasonSection }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div
      layout
      className="parchment-card rounded-2xl overflow-hidden card-hover cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-glory-red/10 dark:bg-glory-red/20 flex items-center justify-center text-glory-red shrink-0">
            {reason.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{reason.title}</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">{reason.subtitle}</p>
              </div>
              {reason.stat && (
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-glory-red">{reason.stat}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[140px] text-right leading-tight">{reason.statLabel}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 ml-16">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {expanded ? 'Click to collapse' : 'Click to read more'}
          </span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <div className="border-t border-amber-200/50 dark:border-amber-800/30 pt-5">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{reason.body}</p>
              {reason.quote && (
                <blockquote className="mt-5 border-l-4 border-glory-red pl-4">
                  <p className="text-slate-600 dark:text-slate-400 italic text-sm leading-relaxed">"{reason.quote}"</p>
                  <footer className="text-xs text-slate-400 mt-1">— {reason.quoteAuthor}</footer>
                </blockquote>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ActionCard({ action }: { action: ActionItem }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div
      layout
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden"
    >
      <div
        className="p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-slate-900 dark:text-white">{action.title}</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${impactColors[action.impact]}`}>
                {impactLabels[action.impact]}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{action.description}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Time: {action.timeframe}</p>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-1">
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Steps to Take</h4>
              <ul className="space-y-2">
                {action.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              {action.resources && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    {action.resources.map(r => (
                      <span key={r} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded font-mono">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function CitizenResponsibility() {
  const father = FOUNDING_FATHERS.responsibility

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Hero */}
      <section className="hero-gradient stars-bg relative overflow-hidden">
        <div className="absolute inset-0 stripe-accent opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-white/90 text-sm font-medium">Citizen Duty</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Why You Are{' '}
                <span className="text-gradient-patriot">Responsible</span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-6">
                The $33.9 trillion national debt, the $521 billion in annual improper payments, the Pentagon failing five consecutive audits — none of this happened despite democracy. It happened <em>through</em> democracy. Through citizens who trusted that someone else was watching.
              </p>
              <p className="text-white/60 text-base leading-relaxed max-w-2xl">
                This page explains why civic engagement is not optional, and gives you specific, actionable steps to exercise the power the Founders built for you.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { value: '$33.9T', label: 'National Debt' },
                  { value: '$521B', label: 'Annual Fraud Est.' },
                  { value: '5', label: 'Pentagon Audit Failures' },
                ].map(stat => (
                  <div key={stat.label} className="glass-patriot rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <FoundingFatherBadge father={father} variant="hero" />
          </div>
        </div>
      </section>

      {/* The Oath Section */}
      <section className="bg-glory-red py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/90 text-lg font-serif italic leading-relaxed">
            "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America."
          </p>
          <p className="text-white/60 text-sm mt-3">— Preamble to the United States Constitution, 1787</p>
          <p className="text-white font-semibold mt-4">We the People. That means you.</p>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 bg-f8f7f2 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main content */}
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Eight Reasons Citizens Are Responsible
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Not rhetorical reasons. Constitutional, historical, and mathematical reasons.
                </p>
              </div>
              <div className="space-y-4">
                {REASONS.map((reason, i) => (
                  <motion.div
                    key={reason.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <ReasonCard reason={reason} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              <FoundingFatherBadge father={father} variant="sidebar" />

              {/* Key facts */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-glory-red" />
                  The Numbers Don't Lie
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: 'National debt', value: '$33.9 trillion' },
                    { label: 'Interest in 2024', value: '$1.0 trillion' },
                    { label: 'Your share of debt', value: '~$127,000' },
                    { label: 'Annual improper payments', value: '$175–521B (GAO)' },
                    { label: 'Pentagon audit failures', value: '5 consecutive years' },
                    { label: 'Debt-to-GDP ratio', value: '~123%' },
                    { label: 'Projected debt by 2050', value: '200% of GDP (CBO)' },
                    { label: 'Avg voter turnout, local elections', value: '~21%' },
                  ].map(item => (
                    <li key={item.label} className="flex justify-between gap-2">
                      <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                      <span className="font-medium text-slate-900 dark:text-white text-right">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote block */}
              <div className="rounded-2xl bg-glory-blue text-white p-5">
                <p className="italic text-sm leading-relaxed text-white/90">
                  "The price of liberty is eternal vigilance."
                </p>
                <p className="text-white/60 text-xs mt-2">— Attributed to Thomas Jefferson &amp; John Philpot Curran</p>
                <div className="mt-4 border-t border-white/20 pt-4">
                  <p className="text-white/80 text-xs leading-relaxed">
                    Vigilance is not passive. It means reading the budget, calling your representative, showing up to vote, and demanding answers. Every generation must do this work anew.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Nine Specific Actions You Can Take
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Not vague aspirations — concrete steps with time estimates. Pick one and start today.
            </p>
          </div>

          {/* Impact legend */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {Object.entries(impactColors).map(([key, cls]) => (
              <span key={key} className={`text-xs font-medium px-3 py-1 rounded-full border ${cls}`}>
                {impactLabels[key as keyof typeof impactLabels]}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {ACTIONS.map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <ActionCard action={action} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="hero-gradient stars-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">★★★</div>
          <h2 className="text-3xl font-bold text-white mb-4">The Republic Needs You</h2>
          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The Founders did not build a system that runs itself. They built a system that requires citizens. Not heroes — citizens. People who show up, pay attention, and hold power accountable. That's you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: '📞', label: 'Call your rep', sub: '(202) 224-3121' },
              { icon: '🗳️', label: 'Register to vote', sub: 'vote.gov' },
              { icon: '📋', label: 'File a FOIA', sub: 'foia.gov' },
            ].map(item => (
              <div key={item.label} className="glass-patriot rounded-xl p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-white/60 text-xs mt-0.5 font-mono">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
