interface StatusIndicatorProps {
  status: 'hot' | 'warm' | 'cold' | 'down'
  pulse?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const SIZE_MAP = { sm: 'w-2.5 h-2.5', md: 'w-3.5 h-3.5', lg: 'w-5 h-5' }

const COLOR_MAP = {
  hot: 'bg-green-500',
  warm: 'bg-amber-400',
  cold: 'bg-gray-400',
  down: 'bg-red-500',
}

export default function StatusIndicator({
  status,
  pulse = status === 'hot',
  size = 'sm',
  label,
}: StatusIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex">
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-50 animate-pulse-glow ${COLOR_MAP[status]}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${SIZE_MAP[size]} ${COLOR_MAP[status]}`} />
      </span>
      {label && <span className="text-xs text-gray-500">{label}</span>}
    </span>
  )
}
