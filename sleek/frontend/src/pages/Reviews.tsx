import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi2'
import { api, Review } from '../api/client'
import { useToast } from '../components/ui/ToastProvider'

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [decidedToday, setDecidedToday] = useState(0)
  const [exitingId, setExitingId] = useState<string | null>(null)
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right')
  const { toast } = useToast()

  useEffect(() => {
    api.reviews('PENDING')
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDecide = async (reviewId: string, decision: string) => {
    const direction = decision === 'APPROVED' ? 'right' : 'left'
    setExitDirection(direction)
    setExitingId(reviewId)

    try {
      await api.decideReview(reviewId, decision)
      // Wait for animation before removing
      setTimeout(() => {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId))
        setExitingId(null)
        setDecidedToday((c) => c + 1)
      }, 300)
      toast(
        decision === 'APPROVED' ? 'success' : decision === 'REJECTED' ? 'info' : 'warning',
        decision === 'APPROVED' ? 'Review approved' : decision === 'REJECTED' ? 'Review rejected' : 'Review escalated'
      )
    } catch (err) {
      console.error(err)
      setExitingId(null)
      toast('error', 'Action failed')
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading reviews...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
        {decidedToday > 0 && (
          <span className="text-sm text-gray-500">
            Reviewed today: <span className="font-bold text-gray-700">{decidedToday}</span>
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <HiCheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">All caught up!</p>
          <p className="text-sm text-gray-400 mt-1">No pending reviews right now</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: exitingId === review.id ? 0 : 1,
                  x: exitingId === review.id ? (exitDirection === 'right' ? 200 : -200) : 0,
                  backgroundColor: exitingId === review.id
                    ? exitDirection === 'right' ? '#dcfce7' : '#fee2e2'
                    : '#ffffff',
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Link
                      to={`/opportunities/${review.opportunity_id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View Opportunity
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Reason: {review.reason}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecide(review.id, 'APPROVED')}
                    disabled={exitingId === review.id}
                    className="px-4 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecide(review.id, 'REJECTED')}
                    disabled={exitingId === review.id}
                    className="px-4 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDecide(review.id, 'ESCALATED')}
                    disabled={exitingId === review.id}
                    className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 disabled:opacity-50 transition-colors"
                  >
                    Escalate
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
