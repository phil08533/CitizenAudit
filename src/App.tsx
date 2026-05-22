import { Component, type ReactNode } from 'react'
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
import { TaxHistory } from './pages/TaxHistory'
import { CitizenResponsibility } from './pages/CitizenResponsibility'

const BASE = import.meta.env.BASE_URL

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', backgroundColor: '#fff', minHeight: '100vh' }}>
          <h1 style={{ color: '#B22234' }}>CitizenAudit — Something went wrong</h1>
          <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, overflow: 'auto', color: '#1a1a2e' }}>
            {String(this.state.error)}
          </pre>
          <p><a href={BASE} style={{ color: '#1E2864' }}>← Reload the app</a></p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASE}>
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f7f2', color: '#1a1a2e' }}>
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
              <Route path="/tax-history" element={<TaxHistory />} />
              <Route path="/responsibility" element={<CitizenResponsibility />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="text-6xl font-serif text-glory-red">★</div>
      <h1 className="text-3xl font-bold" style={{ color: '#1a1a2e' }}>Page Not Found</h1>
      <p className="text-slate-500">This page doesn't exist in the federal record.</p>
      <a href={BASE} className="text-glory-blue hover:underline font-medium">
        Return to Home
      </a>
    </div>
  )
}
