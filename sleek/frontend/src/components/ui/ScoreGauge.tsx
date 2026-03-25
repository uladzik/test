import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ScoreGaugeProps {
  value: number
  maxValue?: number
  size?: number
  label?: string
  invertColors?: boolean
}

function getColor(pct: number, invert: boolean): string {
  const p = invert ? 1 - pct : pct
  if (p < 0.3) return '#ef4444'  // red
  if (p < 0.6) return '#f59e0b'  // amber
  return '#22c55e'                // green
}

export default function ScoreGauge({
  value,
  maxValue = 100,
  size = 120,
  label,
  invertColors = false,
}: ScoreGaugeProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const strokeWidth = size * 0.1
  const radius = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2

  // 270-degree arc starting from bottom-left
  const startAngle = 135
  const endAngle = 405
  const totalArc = 270

  const pct = Math.min(Math.max(value / maxValue, 0), 1)
  const circumference = (totalArc / 360) * 2 * Math.PI * radius
  const color = getColor(pct, invertColors)

  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
  }

  const start = polarToCartesian(startAngle)
  const end = polarToCartesian(endAngle)

  const bgPath = [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}`,
  ].join(' ')

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Animated value arc */}
        <motion.path
          d={bgPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: mounted ? circumference * (1 - pct) : circumference }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Center text */}
        <text
          x={cx}
          y={cy + size * 0.02}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-bold"
          style={{ fontSize: size * 0.26, fill: '#111827' }}
        >
          {Math.round(value)}
        </text>
      </svg>
      {label && <span className="text-xs text-gray-500 font-medium">{label}</span>}
    </div>
  )
}
