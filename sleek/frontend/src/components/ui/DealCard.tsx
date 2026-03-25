import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Opportunity } from '../../api/client'
import ScoreGauge from './ScoreGauge'
import RecommendationBadge from './RecommendationBadge'
import StatusIndicator from './StatusIndicator'
import PriceComparisonBar from './PriceComparisonBar'

interface DealCardProps {
  opportunity: Opportunity
  index?: number
}

function recToStatus(rec: string): 'hot' | 'warm' | 'cold' {
  if (rec === 'BUY') return 'hot'
  if (rec === 'REVIEW') return 'warm'
  return 'cold'
}

export default function DealCard({ opportunity: opp, index = 0 }: DealCardProps) {
  const isBuy = opp.recommendation === 'BUY'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/opportunities/${opp.id}`} className="block">
        <div
          className={`bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:-translate-y-1 p-4 border-l-4 ${
            isBuy ? 'border-l-green-500 ring-1 ring-green-100' : 'border-l-transparent'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <StatusIndicator status={recToStatus(opp.recommendation)} size="sm" />
                <span className="text-xs text-gray-400 capitalize">{opp.platform}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {opp.listing_title}
              </h3>
              {opp.model_name && (
                <p className="text-xs text-gray-500 mt-0.5">{opp.model_name}</p>
              )}
            </div>
            <ScoreGauge value={opp.deal_score ?? 0} size={48} />
          </div>

          {/* Price comparison */}
          <div className="mb-3 pt-1 pb-5">
            <PriceComparisonBar
              listedPrice={opp.listed_price}
              marketValue={opp.estimated_market_value}
              resaleValue={opp.estimated_resale_value}
              offerAmount={opp.offer_amount}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <RecommendationBadge recommendation={opp.recommendation} />
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">
                {opp.listed_price.toFixed(0)} EUR
              </div>
              {opp.expected_margin != null && (
                <div
                  className={`text-xs font-medium ${
                    opp.expected_margin > 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {opp.expected_margin > 0 ? '+' : ''}
                  {opp.expected_margin.toFixed(0)} EUR margin
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
