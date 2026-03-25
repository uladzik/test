import { useEffect, useState } from 'react'
import { HiArrowPath } from 'react-icons/hi2'
import { api, Source } from '../api/client'
import StatusIndicator from '../components/ui/StatusIndicator'

function healthToStatus(health: string): 'hot' | 'warm' | 'cold' | 'down' {
  if (health === 'healthy') return 'hot'
  if (health === 'degraded') return 'warm'
  if (health === 'down') return 'down'
  return 'cold'
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function Sources() {
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(true)
  const [crawling, setCrawling] = useState<string | null>(null)

  useEffect(() => {
    api.sources()
      .then(setSources)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleCrawl = async (sourceId: string) => {
    setCrawling(sourceId)
    try {
      await api.triggerCrawl(sourceId)
      setTimeout(() => {
        api.sources().then(setSources)
        setCrawling(null)
      }, 2000)
    } catch (err) {
      console.error(err)
      setCrawling(null)
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading sources...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <div key={source.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <StatusIndicator
                  status={healthToStatus(source.health_status)}
                  size="md"
                  pulse={source.health_status === 'healthy' && source.is_active}
                />
                <h2 className="font-semibold">{source.display_name}</h2>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${source.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {source.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="text-sm text-gray-500 space-y-1 mb-4">
              <p>Country: {source.country}</p>
              <p>Crawl interval: {source.crawl_interval_minutes} min</p>
              <p>
                Last crawl:{' '}
                {source.last_crawl_at ? (
                  <span title={new Date(source.last_crawl_at).toLocaleString()}>
                    {timeAgo(source.last_crawl_at)}
                  </span>
                ) : (
                  'Never'
                )}
              </p>
            </div>

            <button
              onClick={() => handleCrawl(source.id)}
              disabled={!source.is_active || crawling === source.id}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {crawling === source.id ? (
                <>
                  <HiArrowPath className="w-4 h-4 animate-spin" />
                  Crawling...
                </>
              ) : (
                'Trigger Crawl'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
