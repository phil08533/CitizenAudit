export interface FoundingFather {
  name: string
  title: string
  years: string
  quote: string
  quoteSource: string
  image: string
  bio: string
  relevance: string
}

// All portraits are public domain images from Wikimedia Commons
export const FOUNDING_FATHERS: Record<string, FoundingFather> = {
  home: {
    name: 'George Washington',
    title: '1st President of the United States',
    years: '1732 – 1799',
    quote: 'Government is not reason, it is not eloquence — it is force. Like fire, it is a dangerous servant and a fearful master.',
    quoteSource: 'Attributed to Washington, 1796',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/400px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
    bio: 'Commander of the Continental Army, President of the Constitutional Convention, and first President of the United States.',
    relevance: 'Washington warned against the dangers of an unchecked government and believed citizens must remain eternally vigilant over their elected leaders.',
  },
  taxEstimator: {
    name: 'Benjamin Franklin',
    title: 'Founding Father, Diplomat, Inventor',
    years: '1706 – 1790',
    quote: 'In this world nothing can be said to be certain, except death and taxes.',
    quoteSource: 'Letter to Jean-Baptiste Leroy, November 13, 1789',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Joseph_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/400px-Joseph_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg',
    bio: 'Printer, scientist, diplomat, and author of Poor Richard\'s Almanack. Served as U.S. Minister to France and helped secure the alliance that won the Revolution.',
    relevance: 'Franklin understood the inevitability of taxation — but also believed taxes must be just, transparent, and consented to by the governed.',
  },
  spending: {
    name: 'Thomas Jefferson',
    title: '3rd President, Author of the Declaration of Independence',
    years: '1743 – 1826',
    quote: 'A government big enough to supply you with everything you need is a government big enough to take everything you have.',
    quoteSource: 'Attributed to Jefferson; paraphrased from various writings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%281%29.jpg/400px-Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%281%29.jpg',
    bio: 'Author of the Declaration of Independence, first Secretary of State, and champion of individual liberty and limited government.',
    relevance: 'Jefferson was deeply skeptical of centralized federal power and believed citizens must scrutinize every dollar spent by their government.',
  },
  agency: {
    name: 'Alexander Hamilton',
    title: '1st Secretary of the Treasury',
    years: '1755 – 1804',
    quote: 'A national debt, if it is not excessive, will be to us a national blessing.',
    quoteSource: 'Letter to Robert Morris, April 30, 1781',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Hamilton_portrait_by_John_Trumbull_1806.jpg/400px-Hamilton_portrait_by_John_Trumbull_1806.jpg',
    bio: 'First Secretary of the Treasury who established the U.S. financial system, the national bank, and a coherent federal budget framework.',
    relevance: 'Hamilton built the architecture of American government finance — the same system we still use today, now carrying $33.9 trillion in debt.',
  },
  representatives: {
    name: 'James Madison',
    title: '4th President, Father of the Constitution',
    years: '1751 – 1836',
    quote: 'Knowledge will forever govern ignorance; and a people who mean to be their own governors must arm themselves with the power which knowledge gives.',
    quoteSource: 'Letter to W. T. Barry, August 4, 1822',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/James_Madison.jpg/400px-James_Madison.jpg',
    bio: 'Primary architect of the U.S. Constitution and Bill of Rights. Served as Secretary of State and 4th President.',
    relevance: 'Madison designed the system of representation to give every citizen a voice. He believed an informed citizenry contacting their representatives was essential to democracy.',
  },
  contact: {
    name: 'John Adams',
    title: '2nd President, Diplomat & Founding Father',
    years: '1735 – 1826',
    quote: 'Liberty cannot be preserved without a general knowledge among the people, who have a right... to knowledge.',
    quoteSource: 'A Dissertation on the Canon and Feudal Law, 1765',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Gilbert_Stuart%2C_John_Adams%2C_c._1800-1815%2C_NGA_42933.jpg/400px-Gilbert_Stuart%2C_John_Adams%2C_c._1800-1815%2C_NGA_42933.jpg',
    bio: 'First Vice President, second President, and lead author of the Massachusetts Constitution — the oldest functioning written constitution in the world.',
    relevance: 'Adams believed citizens have not just a right but a duty to communicate their concerns to government. He would recognize the need for what we call "contact action" today.',
  },
  about: {
    name: 'Thomas Paine',
    title: 'Revolutionary Pamphleteer & Author of Common Sense',
    years: '1737 – 1809',
    quote: 'It is the responsibility of the patriot to protect his country from its government.',
    quoteSource: 'Attributed to Thomas Paine',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Thomas_Paine_print.jpg/400px-Thomas_Paine_print.jpg',
    bio: 'Author of Common Sense (1776), which galvanized public support for American independence, and The American Crisis, read to Washington\'s troops at Valley Forge.',
    relevance: 'Paine believed that governments derive legitimacy from the people, not the other way around — and that citizens must actively hold power accountable.',
  },
  sources: {
    name: 'Patrick Henry',
    title: 'Governor of Virginia, Revolutionary Orator',
    years: '1736 – 1799',
    quote: 'The liberties of a people never were, nor ever will be, secure when the transactions of their rulers may be concealed from them.',
    quoteSource: 'Speech to the Virginia Ratifying Convention, June 9, 1788',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Patrick_Henry_Rothermel.jpg/400px-Patrick_Henry_Rothermel.jpg',
    bio: 'Famous for his "Give me liberty or give me death!" speech. Led opposition to the Constitution until a Bill of Rights was guaranteed.',
    relevance: 'Henry\'s demand for transparency in government is the foundation of Citizen Audit. He believed secrecy in government was incompatible with liberty.',
  },
  history: {
    name: 'Samuel Adams',
    title: 'Leader of the Sons of Liberty, Governor of Massachusetts',
    years: '1722 – 1803',
    quote: 'It does not require a majority to prevail, but rather an irate, tireless minority keen to set brushfires in people\'s minds.',
    quoteSource: 'Attributed to Samuel Adams',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Samuel_Adams_by_John_Singleton_Copley.jpg/400px-Samuel_Adams_by_John_Singleton_Copley.jpg',
    bio: 'Master organizer of the resistance to British taxation. Led the Boston Tea Party, founded the Committees of Correspondence, and signed the Declaration of Independence.',
    relevance: 'Adams transformed tax protests into a revolutionary movement. His tactics — public organizing, petitions, and direct action — remain the playbook for civic engagement.',
  },
  responsibility: {
    name: 'Benjamin Rush',
    title: 'Founding Father, Physician, Signer of the Declaration',
    years: '1745 – 1813',
    quote: 'Let the Citizen be responsible for the preservation of liberty, and then make it a crime to speak, print, write, or publish anything contrary to the great principles of our free government.',
    quoteSource: 'Essays, Literary, Moral and Philosophical, 1798',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Benjamin_Rush_Painting_by_Peale_1783.jpg/400px-Benjamin_Rush_Painting_by_Peale_1783.jpg',
    bio: 'Physician, educator, and signer of the Declaration. Called the "Father of American Psychiatry" and champion of public education and civic virtue.',
    relevance: 'Rush believed that an educated, engaged citizenry was the ultimate safeguard of republican government — not laws or institutions alone.',
  },
}
