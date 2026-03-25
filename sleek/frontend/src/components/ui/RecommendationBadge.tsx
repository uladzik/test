import { HiCheck, HiEye, HiXMark } from 'react-icons/hi2'

interface RecommendationBadgeProps {
  recommendation: string
  size?: 'sm' | 'md'
}

const CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  BUY: {
    bg: 'bg-green-100 border-green-300',
    text: 'text-green-800',
    icon: <HiCheck className="w-3.5 h-3.5" />,
  },
  REVIEW: {
    bg: 'bg-amber-100 border-amber-300',
    text: 'text-amber-800',
    icon: <HiEye className="w-3.5 h-3.5" />,
  },
  IGNORE: {
    bg: 'bg-gray-100 border-gray-300',
    text: 'text-gray-600',
    icon: <HiXMark className="w-3.5 h-3.5" />,
  },
}

export default function RecommendationBadge({ recommendation, size = 'sm' }: RecommendationBadgeProps) {
  const cfg = CONFIG[recommendation] || CONFIG.IGNORE
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold ${cfg.bg} ${cfg.text} ${sizeClass}`}
    >
      {cfg.icon}
      {recommendation}
    </span>
  )
}
