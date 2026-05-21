import { useState } from 'react'
import { motion } from 'framer-motion'
import { FoundingFatherBadge } from '../components/ui/FoundingFatherBadge'
import { FOUNDING_FATHERS } from '../data/foundingFathers'
import { Scroll, ChevronDown } from 'lucide-react'

interface Event {
  year: string
  era: string
  title: string
  description: string
  significance: string
  taxDetail?: string
  quote?: { text: string; attribution: string }
  type: 'colonial' | 'revolution' | 'founding' | 'expansion' | 'modern' | 'crisis'
}

const HISTORY: Event[] = [
  {
    year: '1651',
    era: 'Colonial Era',
    title: 'Navigation Acts — First British Tax Grip',
    type: 'colonial',
    description: 'England passes the first Navigation Acts, requiring all colonial trade to flow through British ships and ports, imposing hidden economic taxes through enforced monopolies.',
    significance: 'Colonists are forced to sell tobacco, cotton, and indigo only to England — at prices England dictates. This "taxation by trade restriction" plants the first seeds of resentment.',
    taxDetail: 'No direct tax, but economic coercion forced colonists to accept below-market prices for their goods, effectively transferring wealth to Britain.',
    quote: { text: 'The foundation of our empire was not laid in the gloomy age of ignorance and superstition; but at an epoch when the rights of mankind were better understood.', attribution: 'George Washington' },
  },
  {
    year: '1733',
    era: 'Colonial Era',
    title: 'The Molasses Act',
    type: 'colonial',
    description: 'Britain imposes a 6-pence-per-gallon tax on non-British molasses imported to the colonies — strangling the rum trade that was the backbone of the New England economy.',
    significance: 'Colonists respond by smuggling on a massive scale. The act is widely ignored, teaching colonists that unjust laws need not be obeyed — a lesson with profound future consequences.',
    taxDetail: '6 pence per gallon on French and Dutch molasses. New England distillers needed cheap molasses to make rum — the most traded commodity of the era.',
  },
  {
    year: '1764',
    era: 'Road to Revolution',
    title: 'The Sugar Act — First Enforced Tax',
    type: 'revolution',
    description: 'Britain, broke after the Seven Years\' War, reduces the molasses tax to 3 pence but actually begins enforcing it. Adds strict regulations on lumber, iron, skins, and other colonial exports.',
    significance: 'For the first time, Britain says: "We will actually collect this money." Colonial merchants erupt. The phrase "no taxation without representation" begins circulating in Boston pamphlets.',
    taxDetail: '3¢/gallon on foreign molasses, plus new duties on foreign wine, cloth, coffee, and sugar. Revenue targeted at paying for British troops stationed in the colonies.',
    quote: { text: 'It is inseparably essential to the freedom of a people, and the undoubted right of Englishmen, that no taxes be imposed on them but with their own consent.', attribution: 'Stamp Act Congress, 1765' },
  },
  {
    year: '1765',
    era: 'Road to Revolution',
    title: 'The Stamp Act — "Taxation Without Representation"',
    type: 'revolution',
    description: 'Parliament imposes the first direct tax on the colonies: a tax on all printed materials — newspapers, legal documents, pamphlets, dice, even playing cards — requiring an official British stamp.',
    significance: 'Colonial fury is unprecedented. The Stamp Act Congress convenes — the first unified colonial protest. Sons of Liberty form. Stamp tax collectors are tarred and feathered. The phrase "no taxation without representation" becomes a rallying cry heard from Boston to Savannah.',
    taxDetail: 'Ranged from ½ penny on newspapers to £10 on diplomas. All legal documents without a stamp were declared void. Revenue intended to fund 10,000 British troops in America.',
    quote: { text: 'I am not a Virginian, but an American.', attribution: 'Patrick Henry, Stamp Act Speech, 1765' },
  },
  {
    year: '1767',
    era: 'Road to Revolution',
    title: 'The Townshend Acts — Duties on Everything',
    type: 'revolution',
    description: 'Parliament imposes new import duties on glass, paper, paint, lead, and tea. Simultaneously, it suspends the New York legislature for refusing to quarter British troops.',
    significance: 'Colonial boycotts of British goods become widespread. The Boston Non-Importation Agreement cuts British imports by 50%. Samuel Adams begins organizing the Committees of Correspondence to coordinate resistance across the colonies.',
    taxDetail: 'Import duties of 3 pence/pound on tea, plus duties on glass, lead, painter\'s colors, and paper. Revenue used to pay colonial governors and judges directly — making them independent of colonial legislatures.',
    quote: { text: 'If taxes are laid upon us without our having a legal representation where they are laid, are we not reduced to the miserable state of tributary slaves?', attribution: 'Samuel Adams, 1768' },
  },
  {
    year: '1770',
    era: 'Road to Revolution',
    title: 'The Boston Massacre — Tension Reaches the Street',
    type: 'revolution',
    description: 'British soldiers fire into an angry mob outside the Boston Custom House, killing five colonists including Crispus Attucks. The event is immediately seized upon by Samuel Adams and Paul Revere as a propaganda tool.',
    significance: 'What began as a tax dispute has become a matter of life and death. The massacre crystallizes colonial understanding that Britain\'s tax enforcement is backed by military force. Paul Revere\'s engraving makes the event famous throughout the colonies.',
    quote: { text: 'Give me liberty or give me death!', attribution: 'Patrick Henry, March 23, 1775' },
  },
  {
    year: '1773',
    era: 'Road to Revolution',
    title: '🍵 The Boston Tea Party — December 16, 1773',
    type: 'revolution',
    description: 'In the most famous tax protest in American history, 116 members of the Sons of Liberty, disguised as Mohawk Indians, board three ships in Boston Harbor and dump 342 chests of East India Company tea into the water. The tea is worth £10,000 — about $1.7 million in today\'s dollars.',
    significance: 'This was not a mob riot — it was a precisely planned, disciplined operation. Not a single person was injured. Not a single item other than tea was destroyed. Samuel Adams had spent weeks organizing and selected participants who pledged to destroy only the tea. It was a deliberate political statement: we will not accept taxation without our consent, regardless of cost.',
    taxDetail: 'The Tea Act of 1773 actually lowered the price of tea — but it gave the East India Company a monopoly, cutting out colonial merchants. The tax itself was 3 pence per pound. Colonists refused not because tea was expensive, but because accepting it meant accepting Parliament\'s right to tax them.',
    quote: { text: 'This meeting can do nothing more to save the country. Tonight\'s work will be history — do not let it be said we had a chance and let it pass.', attribution: 'Samuel Adams, December 16, 1773' },
  },
  {
    year: '1774',
    era: 'Road to Revolution',
    title: 'The Intolerable Acts — Britain\'s Fatal Mistake',
    type: 'revolution',
    description: 'Parliament responds to the Tea Party with the Coercive Acts: closing Boston Harbor until the tea is paid for, revoking Massachusetts self-government, requiring colonists to house British troops, and extending Canada\'s boundaries south.',
    significance: 'Intended to isolate and punish Massachusetts, the Acts have the opposite effect. Twelve colonies send delegates to the First Continental Congress. The colonies are now united. Britain has turned a tax dispute into a constitutional crisis.',
    quote: { text: 'I know not what course others may take, but as for me, give me liberty or give me death!', attribution: 'Patrick Henry, Virginia Convention, 1775' },
  },
  {
    year: '1776',
    era: 'The Founding',
    title: 'Declaration of Independence — Government by Consent',
    type: 'founding',
    description: 'Thomas Jefferson writes — and 56 men sign — a document declaring that governments derive their just powers from the consent of the governed, and that when any government becomes destructive of life, liberty, or the pursuit of happiness, it is the right of the people to alter or abolish it.',
    significance: 'Among the 27 grievances listed against King George: imposing taxes without consent, cutting off trade, stationing troops in civilian homes, and undermining colonial legislatures. The Declaration is fundamentally a document about taxation and representation.',
    taxDetail: 'The Declaration lists tax grievances explicitly: "For imposing Taxes on us without our Consent." The entire Revolution grew from a tax dispute into a statement of universal human rights.',
    quote: { text: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.', attribution: 'Thomas Jefferson, Declaration of Independence, July 4, 1776' },
  },
  {
    year: '1787',
    era: 'The Founding',
    title: 'The Constitution — "Power of the Purse"',
    type: 'founding',
    description: 'The Constitutional Convention gives Congress — the people\'s representatives — the exclusive power to levy taxes. Article I Section 8: "The Congress shall have Power To lay and collect Taxes, Duties, Imposts and Excises." Article I Section 7: All revenue bills must originate in the House of Representatives.',
    significance: 'The Founders embedded "no taxation without representation" directly into the Constitution. Every tax must be approved by elected representatives directly accountable to the people. The power of the purse — control over spending — was deliberately placed in the legislative branch closest to voters.',
    taxDetail: 'Original revenue came from tariffs (import taxes) and excise taxes. Direct taxes (like income taxes) on individuals were constitutionally prohibited — requiring apportionment among states by population.',
    quote: { text: 'All bills for raising Revenue shall originate in the House of Representatives.', attribution: 'U.S. Constitution, Article I, Section 7' },
  },
  {
    year: '1791',
    era: 'The Founding',
    title: 'The Whiskey Tax & Rebellion — History Repeats',
    type: 'founding',
    description: 'Treasury Secretary Alexander Hamilton imposes a tax on distilled spirits to pay off Revolutionary War debt. Farmers in western Pennsylvania, who convert surplus grain to whiskey as currency, revolt. In 1794, 500 armed men attack a tax collector\'s home.',
    significance: 'President Washington personally leads 13,000 troops — the only time a sitting U.S. president personally commanded troops in the field — to suppress the Whiskey Rebellion. The rebellion tests whether the new constitutional government can enforce laws. It can. But the tax is so despised that Jefferson repeals it when he becomes president in 1802.',
    taxDetail: 'Tax of 9 cents/gallon on large distillers, 6 cents/gallon on small ones. For frontier farmers, whiskey was both a trade good and a currency — the tax hit their entire economy.',
    quote: { text: 'Every new tribunal erected for the decision of facts, without the intervention of a jury...is a step towards establishing a tyranny.', attribution: 'Alexander Hamilton, Federalist No. 83' },
  },
  {
    year: '1861',
    era: 'Civil War Expansion',
    title: 'America\'s First Income Tax — Paying for War',
    type: 'expansion',
    description: 'To fund the Civil War, Congress passes the Revenue Act of 1861 — the first federal income tax in American history: 3% on all incomes over $800 (about $27,000 today).',
    significance: 'For the first time, the federal government reaches directly into the wallets of individual citizens. The tax raises $55 million over 10 years. When the war ends, the tax expires in 1872 — Americans assume it is a temporary wartime measure. They are wrong.',
    taxDetail: '3% on incomes over $800. In 1862, raised to 3% on $600-$10,000 and 5% on incomes above $10,000. Revised in 1864 to 5% on $600-$5,000, 7.5% on $5,000-$10,000, and 10% on $10,000+.',
  },
  {
    year: '1895',
    era: 'Civil War Expansion',
    title: 'Pollock v. Farmers\' Loan — Income Tax Struck Down',
    type: 'expansion',
    description: 'Congress passes a 2% income tax in 1894. The Supreme Court strikes it down 5-4 in Pollock v. Farmers\' Loan, ruling that a direct tax on income is unconstitutional without apportionment among states.',
    significance: 'The ruling creates a legal barrier to income taxation that stands for 18 years. But the industrial age is creating vast new wealth concentrated in few hands, and the political pressure for an income tax grows irresistible. The stage is set for a constitutional amendment.',
    taxDetail: '2% on incomes over $4,000 (about $140,000 today). Would have taxed roughly 10% of households. The Supreme Court called it "a stepping stone to others, larger and more sweeping."',
    quote: { text: 'The income tax is a just law. It simply intends to put the burdens of government justly upon the backs of the people.', attribution: 'William Jennings Bryan, Democratic National Convention, 1896' },
  },
  {
    year: '1913',
    era: 'Modern Tax System',
    title: '16th Amendment — The Income Tax Made Permanent',
    type: 'modern',
    description: 'February 3, 1913: The 16th Amendment is ratified, giving Congress permanent authority to "lay and collect taxes on incomes, from whatever source derived, without apportionment among the several States." The Revenue Act of 1913 immediately implements a graduated income tax.',
    significance: 'The modern American tax system is born. The 16th Amendment is arguably the most consequential constitutional change since the Bill of Rights. It transfers enormous power to the federal government and enables the growth of the welfare state, the New Deal, and everything that follows.',
    taxDetail: 'Initial rates: 1% on net income over $3,000 ($90,000 today), with a surtax reaching 7% on incomes over $500,000. Less than 2% of Americans paid any income tax. Top rate was 7%.',
    quote: { text: 'The Congress shall have power to lay and collect taxes on incomes, from whatever source derived.', attribution: '16th Amendment to the U.S. Constitution, February 3, 1913' },
  },
  {
    year: '1917',
    era: 'Modern Tax System',
    title: 'World War I — Rates Soar to 77%',
    type: 'modern',
    description: 'To fund American entry into WWI, Congress dramatically raises income tax rates. The top marginal rate reaches 77% on incomes over $1 million ($22 million today). The number of taxpayers grows from 437,000 to 4.4 million.',
    significance: 'The "temporary" wartime rates are never fully reversed. Each crisis — war, depression, war again — ratchets rates higher. The tax system designed as a mild levy on the wealthy becomes a mass taxation system touching nearly every American.',
    taxDetail: 'Revenue Act of 1917: rates of 2% to 67%. Revenue Act of 1918: rates of 6% to 77%. Corporate tax set at 12%. Estate tax introduced at 10% on estates over $50,000.',
  },
  {
    year: '1942',
    era: 'Modern Tax System',
    title: 'WWII & Withholding — Taxes Made Invisible',
    type: 'modern',
    description: 'The Revenue Act of 1942 — called "the most important tax legislation in the nation\'s history" — expands the income tax to cover nearly all Americans for the first time. The Victory Tax of 1942 adds automatic payroll withholding: taxes are taken from paychecks before workers ever see the money.',
    significance: 'Withholding is the single most consequential tax administration change in American history. When taxes are invisible — taken before you touch the money — people\'s awareness of what they pay collapses. Before withholding, taxpayers wrote annual checks and felt every dollar. After, most Americans have little idea what they actually pay in taxes.',
    taxDetail: 'Tax rates: 19% to 88% (top rate). Number of taxpayers: 28 million → 43 million in one year. With withholding, tax collection jumped from $5B to $35B. The top rate would reach 94% in 1944.',
    quote: { text: 'Taxes are what we pay for civilized society.', attribution: 'Oliver Wendell Holmes Jr., Compañia General de Tabacos v. Collector, 1927' },
  },
  {
    year: '1981',
    era: 'Modern Tax System',
    title: 'Reagan\'s Tax Revolution — Rates Cut in Half',
    type: 'modern',
    description: 'The Economic Recovery Tax Act of 1981 cuts the top marginal rate from 70% to 50%. The Tax Reform Act of 1986 further cuts it to 28%, while eliminating thousands of deductions and loopholes. The number of tax brackets shrinks from 14 to 2.',
    significance: '"Supply-side" economics (critics say "trickle-down") argues that lower taxes spur economic growth that offsets revenue losses. National debt triples from $994 billion to $2.9 trillion during Reagan\'s term. The debate over tax cuts vs. revenue needs continues to define American politics.',
    taxDetail: '1981 Act: top rate 70% → 50%. 1986 Act: top rate 50% → 28%, with only two brackets (15% and 28%). Capital gains taxed same as ordinary income for first time since 1942.',
    quote: { text: 'The nine most terrifying words in the English language are: I\'m from the Government and I\'m here to help.', attribution: 'President Ronald Reagan, 1986' },
  },
  {
    year: '2001',
    era: 'Modern Tax System',
    title: 'Bush Tax Cuts — "Temporary" Becomes Permanent',
    type: 'modern',
    description: 'The Economic Growth and Tax Relief Reconciliation Act of 2001 cuts income taxes across all brackets, phases out the estate tax, and creates new education and child tax credits. A second round in 2003 cuts dividend and capital gains rates. Both are designed to sunset in 2010 — but are repeatedly extended.',
    significance: 'The U.S. cut taxes while simultaneously launching two wars in Afghanistan and Iraq — the first time in history a nation cut taxes during wartime. The national debt grows from $5.8 trillion to $11.9 trillion over the decade. The "temporary" cuts become permanent when extended in 2012.',
    taxDetail: 'Top rate cut from 39.6% to 35%. New 10% bracket at bottom. Estate tax phased to zero by 2010 then reset. Long-term capital gains rate cut from 20% to 15%. Cost: $1.35 trillion over 10 years.',
  },
  {
    year: '2017',
    era: 'Modern Tax System',
    title: 'Tax Cuts and Jobs Act — Corporate Tax Revolution',
    type: 'modern',
    description: 'The TCJA cuts the corporate tax rate from 35% to a permanent 21%, establishes a 20% deduction for pass-through business income, and temporarily cuts individual rates while capping state and local tax deductions at $10,000.',
    significance: 'The corporate rate cut is permanent; individual cuts expire in 2025. National debt at passage: $20.2 trillion. Ten-year cost estimate: $1.5 trillion. As of 2024, most individual provisions expire at year-end — triggering a major congressional tax debate.',
    taxDetail: 'Corporate rate: 35% → 21% permanent. Top individual rate: 39.6% → 37%. Standard deduction nearly doubled. SALT deduction capped at $10,000. Pass-through deduction (Sec. 199A): 20% of QBI.',
    quote: { text: 'The hardest thing in the world to understand is the income tax.', attribution: 'Attributed to Albert Einstein' },
  },
  {
    year: '2024',
    era: 'Where We Stand',
    title: '$33.9 Trillion in Debt — The Bill Comes Due',
    type: 'crisis',
    description: 'The United States carries $33.9 trillion in national debt — 123% of GDP. Annual interest payments of $659 billion now exceed defense spending. The Congressional Budget Office projects debt will reach $54 trillion by 2034 if current policies continue.',
    significance: 'We are paying the accumulated cost of every tax cut not matched by spending cuts, every war put on the credit card, and every stimulus package issued since 1980. The Founders warned against this exact scenario. The question is whether this generation will address it — or pass the entire burden to our children.',
    taxDetail: 'Each American\'s share: $101,200. Annual interest per household: ~$5,000. If interest rates remain at current levels, interest payments will exceed Social Security within 10 years. CBO projects debt becomes "unsustainable" — their word — by 2035.',
    quote: { text: 'We must not let our rulers load us with perpetual debt. We must make our election between economy and liberty, or profusion and servitude.', attribution: 'Thomas Jefferson, Letter to Samuel Kercheval, 1816' },
  },
]

// Tailwind classes for era labels — light text on colored pill for dark mode readability
const ERA_BADGE_CLASSES: Record<string, string> = {
  'Colonial Era':        'bg-amber-100   dark:bg-amber-900/50   text-amber-900   dark:text-amber-200   border-amber-400   dark:border-amber-600',
  'Road to Revolution':  'bg-red-100     dark:bg-red-900/50     text-red-800     dark:text-red-200     border-red-400     dark:border-red-600',
  'The Founding':        'bg-blue-100    dark:bg-blue-900/50    text-blue-900    dark:text-blue-200    border-blue-400    dark:border-blue-500',
  'Civil War Expansion': 'bg-slate-100   dark:bg-slate-700      text-slate-800   dark:text-slate-200   border-slate-400   dark:border-slate-500',
  'Modern Tax System':   'bg-green-100   dark:bg-green-900/50   text-green-900   dark:text-green-200   border-green-400   dark:border-green-600',
  'Where We Stand':      'bg-red-200     dark:bg-red-900/60     text-red-900     dark:text-red-200     border-red-500     dark:border-red-600',
}

const TYPE_COLORS: Record<string, string> = {
  colonial: '#8B6914',
  revolution: '#B22234',
  founding: '#1E2864',
  expansion: '#555',
  modern: '#1a6b3a',
  crisis: '#7B0000',
}

export function TaxHistory() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ff = FOUNDING_FATHERS.history
  const eras = [...new Set(HISTORY.map(h => h.era))]

  return (
    <div className="min-h-screen bg-[#f8f7f2] dark:bg-[#0d1117]">

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3d2b0e] via-[#1E2864] to-[#0d1117] text-white py-20">
        <div className="absolute inset-0 stars-bg opacity-30" />
        <div className="absolute top-0 left-0 right-0 flex h-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: i % 2 === 0 ? '#B22234' : '#FFF' }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <Scroll className="w-6 h-6 text-amber-400" />
                <span className="text-amber-300 text-sm font-mono uppercase tracking-widest">American Tax History</span>
              </div>
              <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                From the Tea Party
                <br />
                <span className="text-amber-400">to the $33.9 Trillion Debt</span>
              </h1>
              <p className="text-white/85 text-lg max-w-2xl leading-relaxed font-sans-ui">
                America was literally founded over a tax dispute. Two and a half centuries later, every American
                citizen should know this history — because we are still living it.
              </p>
            </div>
            <div className="flex justify-center">
              <FoundingFatherBadge father={ff} variant="hero" />
            </div>
          </div>

          {/* Era quick-nav */}
          <div className="flex flex-wrap gap-2 mt-8">
            {eras.map(era => (
              <span key={era} className="text-xs px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 font-sans-ui">
                {era}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: i % 2 === 0 ? '#B22234' : '#FFF' }} />
          ))}
        </div>
      </section>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Context card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="parchment-card rounded-2xl p-6 mb-12"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Why Every American Needs to Know This
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans-ui text-sm">
            The United States was born in a tax revolt. The Founders didn't just complain — they organized,
            protested, dumped tea into a harbor, and ultimately fought a war over the principle that citizens
            must consent to taxation. They then built a government specifically designed to prevent future tyranny.
            Understanding this history is not academic. The same questions they wrestled with — how much should
            government take? For what purposes? With what accountability? — are questions we vote on today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B22234] via-[#1E2864] to-[#D4AF37]" />

          <div className="space-y-6 pl-16">
            {HISTORY.map((event, i) => {
              const isExpanded = expandedIndex === i
              const color = TYPE_COLORS[event.type]

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  {/* Era label */}
                  {(i === 0 || HISTORY[i - 1].era !== event.era) && (
                    <div className="mb-4 -ml-10">
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border font-sans-ui ${ERA_BADGE_CLASSES[event.era] ?? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-500'}`}>
                        {event.era}
                      </span>
                    </div>
                  )}

                  {/* Circle marker */}
                  <div
                    className="absolute left-3.5 w-5 h-5 rounded-full border-4 border-white dark:border-[#0d1117] shadow-md"
                    style={{ backgroundColor: color, marginTop: '0.75rem' }}
                  />

                  {/* Card */}
                  <div
                    className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                    style={{ borderColor: `${color}30` }}
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded font-mono"
                              style={{ backgroundColor: `${color}15`, color }}
                            >
                              {event.year}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                            {event.title}
                          </h3>
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-1">
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </motion.div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-sans-ui line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100 dark:border-slate-700 px-5 pb-5"
                      >
                        <div className="pt-4 space-y-4">
                          {/* Full description */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">What Happened</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans-ui">{event.description}</p>
                          </div>

                          {/* Significance */}
                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                            <h4 className="text-xs font-bold uppercase tracking-wide mb-2 text-slate-500 dark:text-slate-300">Why It Matters</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans-ui">{event.significance}</p>
                          </div>

                          {/* Tax detail */}
                          {event.taxDetail && (
                            <div className="parchment-card rounded-xl p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-2">The Numbers</h4>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans-ui">{event.taxDetail}</p>
                            </div>
                          )}

                          {/* Quote */}
                          {event.quote && (
                            <blockquote className="border-l-4 border-[#B22234] pl-4">
                              <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed font-sans-ui">
                                "{event.quote.text}"
                              </p>
                              <footer className="text-xs text-slate-400 mt-2 font-sans-ui">— {event.quote.attribution}</footer>
                            </blockquote>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-gradient-to-br from-[#1E2864] to-[#0d1117] text-white p-8 text-center"
        >
          <div className="text-4xl mb-4">🦅</div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>The Thread of History</h2>
          <p className="text-blue-200 leading-relaxed max-w-2xl mx-auto font-sans-ui mb-6">
            From a 3-pence tax on tea to a $33.9 trillion national debt. From "no taxation without
            representation" to a tax code over 70,000 pages long. The Founders' warning is more urgent than ever:
            citizens who don't understand their government's finances cannot hold it accountable.
            This is why you are here. This is why Citizen Audit exists.
          </p>
          <a
            href="/CitizenAudit/responsibility"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B22234] hover:bg-[#8B1A28] text-white font-bold transition-colors font-sans-ui"
          >
            What Can We Do About It? →
          </a>
        </motion.div>
      </div>
    </div>
  )
}
