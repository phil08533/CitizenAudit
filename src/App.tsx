import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { TaxEstimator } from './pages/TaxEstimator'
import { SpendingExplorer } from './pages/SpendingExplorer'
import { AgencyDetail } from './pages/AgencyDetail'
import { Representatives } from './pages/Representatives'
import { ContactAction } from './pages/ContactAction'
import { About } from './pages/About'
import { Sources } from './pages/Sources'

const BASE = import.meta.env.BASE_URL

export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tax-estimator" element={<TaxEstimator />} />
            <Route path="/spending" element={<SpendingExplorer />} />
            <Route path="/agency/:id" element={<AgencyDetail />} />
            <Route path="/representatives" element={<Representatives />} />
            <Route path="/contact" element={<ContactAction />} />
            <Route path="/about" element={<About />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="text-6xl">🏛️</div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400">This page doesn't exist in the federal record.</p>
      <a href={BASE} className="text-blue-500 hover:text-blue-600 font-medium">
        Return to Home
      </a>
    </div>
  )
}
