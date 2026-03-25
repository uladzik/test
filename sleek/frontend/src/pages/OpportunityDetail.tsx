import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { api, Opportunity } from '../api/client'
import ScoreGauge from '../components/ui/ScoreGauge'
import RecommendationBadge from '../components/ui/RecommendationBadge'
import PriceComparisonBar from '../components/ui/PriceComparisonBar'
import { useToast } from '../components/ui/ToastProvider'

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [opp, setOpp] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionFlash, setActionFlash] = useState<'approve' | 'reject' | null>(null)

  useEffect(() => {
    if (!id) return
    api.opportunity(id)
      .then(setOpp)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleAction = async (action: 'approve' | 'reject') => {
    if (!id) return
    try {
      setActionFlash(action)
      const updated = action === 'approve'
        ? await api.approveOpportunity(id)
        : await api.rejectOpportunity(id)
      setOpp(updated)
      toast(
        action === 'approve' ? 'success' : 'info',
        action === 'approve' ? 'Opportunity approved!' : 'Opportunity rejected'
      )
    } catch (err) {
      console.error(err)
      toast('error', 'Action failed')
    } finally {
      setTimeout(() => setActionFlash(null), 600)
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>
  if (!opp) return <div className="p-8 text-red-500">Opportunity not found</div>

  return (
    <AnimatePresence>
      <motion.div
        className={`p-8 max-w-4xl transition-colors duration-500 ${
          actionFlash === 'approve'
            ? 'bg-green-50'
            : actionFlash === 'reject'
            ? 'bg-red-50'
            : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{opp.listing_title}</h1>
            <p className="text-sm text-gray-500">
              {opp.platform} &middot; {opp.source_listing_id} &middot;{' '}
              <a
                href={opp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                View listing <HiArrowTopRightOnSquare className="w-3 h-3" />
              </a>
            </p>
          </div>
          <RecommendationBadge recommendation={opp.recommendation} size="md" />
        </div>

        {/* Score gauges */}
        <div className="flex items-center gap-8 mb-8 bg-white rounded-lg shadow p-6">
          <ScoreGauge
            value={opp.deal_score ?? 0}
            size={120}
            label="Deal Score"
          />
          <ScoreGauge
            value={(opp.confidence_score ?? 0) * 100}
            size={80}
            label="Confidence"
          />
          <ScoreGauge
            value={(opp.risk_score ?? 0) * 100}
            size={80}
            label="Risk"
            invertColors
          />
        </div>

        {/* Price comparison */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6">Price Comparison</h2>
          <div className="pt-5 pb-6 px-4">
            <PriceComparisonBar
              listedPrice={opp.listed_price}
              marketValue={opp.estimated_market_value}
              resaleValue={opp.estimated_resale_value}
              offerAmount={opp.offer_amount}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <Row label="Listed Price" value={`${opp.listed_price.toFixed(2)} EUR`} />
            <Row label="Market Value" value={opp.estimated_market_value ? `${opp.estimated_market_value.toFixed(2)} EUR` : '-'} />
            <Row label="Resale Value" value={opp.estimated_resale_value ? `${opp.estimated_resale_value.toFixed(2)} EUR` : '-'} />
            <Row label="Offer %" value={opp.offer_percentage ? `${(opp.offer_percentage * 100).toFixed(0)}%` : '-'} />
            <Row label="Offer Amount" value={opp.offer_amount ? `${opp.offer_amount.toFixed(2)} EUR` : '-'} bold />
            <Row label="Expected Margin" value={opp.expected_margin ? `${opp.expected_margin.toFixed(2)} EUR` : '-'} bold
              valueColor={opp.expected_margin ? (opp.expected_margin > 0 ? 'text-green-600' : 'text-red-500') : undefined}
            />
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Status</h2>
          <p className="text-sm mb-4">
            Current: <span className="font-medium uppercase">{opp.status}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">Model: {opp.model_name || 'Unmatched'}</p>
        </div>

        {/* Actions */}
        {opp.status === 'NEW' && (
          <motion.div className="flex gap-3" layout>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction('approve')}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition-colors"
            >
              Approve
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction('reject')}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium transition-colors"
            >
              Reject
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

function Row({
  label,
  value,
  bold,
  valueColor,
}: {
  label: string
  value: string
  bold?: boolean
  valueColor?: string
}) {
  return (
    <div className="flex justify-between py-1 border-b border-gray-50">
      <span className="text-gray-500">{label}</span>
      <span className={`${bold ? 'font-semibold' : ''} ${valueColor || ''}`}>{value}</span>
    </div>
  )
}
