import { useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { api, DashboardStats } from '../api/client'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import ScoreGauge from '../components/ui/ScoreGauge'

const COLORS = { BUY: '#22c55e', REVIEW: '#f59e0b', IGNORE: '#9ca3af' }

export default function Analytics() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [scoreDistribution, setScoreDistribution] = useState<{ range: string; count: number }[]>([])

  useEffect(() => {
    api.dashboardStats().then(setStats).catch(console.error)

    // Fetch opportunities to build score distribution
    api.opportunities({ per_page: '200', sort_by: 'deal_score', sort_order: 'desc' })
      .then((res) => {
        const buckets: Record<string, number> = {
          '0-20': 0, '20-40': 0, '40-60': 0, '60-80': 0, '80-100': 0,
        }
        res.data.forEach((opp) => {
          const s = opp.deal_score ?? 0
          if (s < 20) buckets['0-20']++
          else if (s < 40) buckets['20-40']++
          else if (s < 60) buckets['40-60']++
          else if (s < 80) buckets['60-80']++
          else buckets['80-100']++
        })
        setScoreDistribution(
          Object.entries(buckets).map(([range, count]) => ({ range, count }))
        )
      })
      .catch(console.error)
  }, [])

  if (!stats) return <div className="p-8 text-gray-500">Loading analytics...</div>

  const pieData = [
    { name: 'BUY', value: stats.buy_count },
    { name: 'REVIEW', value: stats.review_count },
    { name: 'IGNORE', value: stats.ignore_count },
  ].filter((d) => d.value > 0)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pie chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recommendation Breakdown</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm">No data yet</p>
          )}
        </div>

        {/* Score distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Score Distribution</h2>
          {scoreDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm">Loading...</p>
          )}
        </div>
      </div>

      {/* Key metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Key Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <ScoreGauge value={stats.avg_deal_score ?? 0} size={100} label="Avg Deal Score" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              <AnimatedCounter value={stats.total_opportunities} />
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              <AnimatedCounter value={stats.avg_margin ?? 0} suffix=" EUR" />
            </p>
            <p className="text-sm text-gray-500 mt-1">Avg Margin</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              <AnimatedCounter value={stats.pending_reviews} />
            </p>
            <p className="text-sm text-gray-500 mt-1">Pending Reviews</p>
          </div>
        </div>
      </div>
    </div>
  )
}
