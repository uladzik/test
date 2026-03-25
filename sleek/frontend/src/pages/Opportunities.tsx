import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HiSquares2X2, HiTableCells } from 'react-icons/hi2'
import { api, OpportunityListResponse } from '../api/client'
import RecommendationBadge from '../components/ui/RecommendationBadge'
import DealCard from '../components/ui/DealCard'

export default function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<OpportunityListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [page, setPage] = useState(1)
  const [minScore, setMinScore] = useState(0)

  const currentFilter = searchParams.get('recommendation') || ''

  useEffect(() => {
    setLoading(true)
    const params: Record<string, string> = {}
    if (currentFilter) params.recommendation = currentFilter
    params.sort_by = 'deal_score'
    params.sort_order = 'desc'
    params.page = String(page)
    params.per_page = '20'
    if (minScore > 0) params.min_deal_score = String(minScore)

    api.opportunities(params)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [currentFilter, page, minScore])

  const setFilter = (rec: string) => {
    setPage(1)
    if (rec) {
      setSearchParams({ recommendation: rec })
    } else {
      setSearchParams({})
    }
  }

  const filterTabs = [
    { key: '', label: 'All' },
    { key: 'BUY', label: 'BUY' },
    { key: 'REVIEW', label: 'REVIEW' },
    { key: 'IGNORE', label: 'IGNORE' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded ${viewMode === 'cards' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <HiSquares2X2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <HiTableCells className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentFilter === tab.key
                  ? tab.key === 'BUY'
                    ? 'bg-green-600 text-white'
                    : tab.key === 'REVIEW'
                    ? 'bg-amber-500 text-white'
                    : tab.key === 'IGNORE'
                    ? 'bg-gray-500 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Min score filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Min Score:</label>
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(e) => { setMinScore(Number(e.target.value)); setPage(1) }}
            className="w-24"
          />
          <span className="text-xs font-medium text-gray-700 w-6">{minScore}</span>
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {data && (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {data.meta.total} opportunities &middot; Page {data.meta.page} of {data.meta.total_pages}
          </p>

          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.data.map((opp, i) => (
                <DealCard key={opp.id} opportunity={opp} index={i} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-600">Platform</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Model</th>
                    <th className="px-4 py-3 font-medium text-gray-600 text-right">Price</th>
                    <th className="px-4 py-3 font-medium text-gray-600 text-right">Offer</th>
                    <th className="px-4 py-3 font-medium text-gray-600 text-right">Margin</th>
                    <th className="px-4 py-3 font-medium text-gray-600 text-right">Score</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Rec</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.data.map((opp) => (
                    <tr key={opp.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 capitalize">{opp.platform}</td>
                      <td className="px-4 py-3">
                        <Link to={`/opportunities/${opp.id}`} className="text-blue-600 hover:underline">
                          {opp.listing_title.length > 40 ? opp.listing_title.slice(0, 40) + '...' : opp.listing_title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{opp.model_name || '-'}</td>
                      <td className="px-4 py-3 text-right">{opp.listed_price.toFixed(0)} EUR</td>
                      <td className="px-4 py-3 text-right">{opp.offer_amount?.toFixed(0) ?? '-'} EUR</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {opp.expected_margin ? (
                          <span className={opp.expected_margin > 0 ? 'text-green-600' : 'text-red-600'}>
                            {opp.expected_margin.toFixed(0)} EUR
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right font-bold">{opp.deal_score?.toFixed(0) ?? '-'}</td>
                      <td className="px-4 py-3">
                        <RecommendationBadge recommendation={opp.recommendation} />
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs uppercase">{opp.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {data.meta.total_pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm bg-white border rounded-md hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(data.meta.total_pages, 7) }, (_, i) => {
                const p = i + 1
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      p === page ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                )
              })}
              <button
                onClick={() => setPage(Math.min(data.meta.total_pages, page + 1))}
                disabled={page >= data.meta.total_pages}
                className="px-3 py-1.5 text-sm bg-white border rounded-md hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
