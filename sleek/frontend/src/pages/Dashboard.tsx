import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, DashboardStats } from '../api/client'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import ScoreGauge from '../components/ui/ScoreGauge'
import StatusIndicator from '../components/ui/StatusIndicator'

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.dashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-10 text-gray-400 text-sm">Loading...</div>
  if (!stats) return <div className="p-10 text-red-500 text-sm">Failed to load dashboard</div>

  return (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-5 mb-5">

        {/* BUY Deals */}
        <Link
          to="/opportunities?recommendation=BUY"
          className="group bg-white rounded-xl border border-gray-100 shadow-sm p-7 hover:shadow-md transition-shadow flex flex-col"
        >
          <span className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
            BUY Deals
          </span>
          <span className="text-7xl font-bold text-gray-900 tabular-nums leading-none mb-5">
            <AnimatedCounter value={stats.buy_count} />
          </span>
          <span className="text-sm text-green-600 mt-auto group-hover:underline">
            View opportunities →
          </span>
        </Link>

        {/* Review Queue */}
        <Link
          to="/reviews"
          className="group bg-white rounded-xl border border-gray-100 shadow-sm p-7 hover:shadow-md transition-shadow flex flex-col"
        >
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-4">
            Review Queue
          </span>
          <span className="text-7xl font-bold text-gray-900 tabular-nums leading-none mb-5">
            <AnimatedCounter value={stats.pending_reviews} />
          </span>
          <span className="text-sm text-amber-500 mt-auto group-hover:underline">
            Go to queue →
          </span>
        </Link>

        {/* Avg Score */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-7 flex flex-col">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Avg Deal Score
          </span>
          <div className="flex-1 flex items-center justify-center">
            <ScoreGauge value={stats.avg_deal_score ?? 0} size={110} />
          </div>
          {stats.avg_margin != null && (
            <p className="text-sm text-gray-400 text-center mt-3">
              avg margin{' '}
              <span className="text-gray-700 font-semibold">
                {stats.avg_margin.toFixed(0)} EUR
              </span>
            </p>
          )}
        </div>

      </div>

      {/* Pipeline strip */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-7 py-4 flex items-center gap-6 text-sm text-gray-500">
        <div>
          Total tracked
          <span className="ml-2 font-semibold text-gray-800">{stats.total_opportunities}</span>
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div>
          BUY
          <span className="ml-2 font-semibold text-green-600">{stats.buy_count}</span>
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div>
          Review
          <span className="ml-2 font-semibold text-amber-500">{stats.review_count}</span>
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div>
          Ignore
          <span className="ml-2 font-semibold text-gray-400">{stats.ignore_count}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StatusIndicator status={stats.active_sources > 0 ? 'hot' : 'down'} />
          <span>
            {stats.active_sources} active source{stats.active_sources !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
