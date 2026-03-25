import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HiSquares2X2,
  HiBolt,
  HiCheckCircle,
  HiServerStack,
  HiTag,
  HiChartBar,
  HiArrowRightOnRectangle,
} from 'react-icons/hi2'
import { api } from '../api/client'

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: HiSquares2X2 },
  { path: '/opportunities', label: 'Opportunities', icon: HiBolt },
  { path: '/reviews', label: 'Reviews', icon: HiCheckCircle },
  { path: '/sources', label: 'Sources', icon: HiServerStack },
  { path: '/offers', label: 'Offers', icon: HiTag },
  { path: '/analytics', label: 'Analytics', icon: HiChartBar },
]

interface LayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

export default function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation()
  const [pendingReviews, setPendingReviews] = useState(0)

  useEffect(() => {
    api.dashboardStats()
      .then((s) => setPendingReviews(s.pending_reviews))
      .catch(() => {})
  }, [location.pathname])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col">
        <div className="p-5 border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-wide">SLEEK</h1>
          <p className="text-xs text-slate-400 mt-1">Deal Intelligence</p>
        </div>

        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors border-l-4 ${
                  isActive
                    ? 'border-l-blue-400 bg-slate-800 text-white'
                    : 'border-l-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.path === '/reviews' && pendingReviews > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingReviews > 9 ? '9+' : pendingReviews}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <HiArrowRightOnRectangle className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-slate-50">
        {children}
      </main>
    </div>
  )
}
