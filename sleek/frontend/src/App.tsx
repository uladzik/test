import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import Layout from './components/Layout'
import Login from './pages/Login'
import ToastProvider from './components/ui/ToastProvider'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Opportunities = lazy(() => import('./pages/Opportunities'))
const OpportunityDetail = lazy(() => import('./pages/OpportunityDetail'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Sources = lazy(() => import('./pages/Sources'))
const Offers = lazy(() => import('./pages/Offers'))
const Analytics = lazy(() => import('./pages/Analytics'))

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <ToastProvider>
      <Layout onLogout={handleLogout}>
        <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </ToastProvider>
  )
}

export default App
