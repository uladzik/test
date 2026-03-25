interface PriceComparisonBarProps {
  listedPrice: number
  marketValue?: number | null
  resaleValue?: number | null
  offerAmount?: number | null
}

export default function PriceComparisonBar({
  listedPrice,
  marketValue,
  resaleValue,
  offerAmount,
}: PriceComparisonBarProps) {
  const values = [listedPrice, marketValue, resaleValue, offerAmount].filter(
    (v): v is number => v != null && v > 0
  )
  if (values.length === 0) return null

  const max = Math.max(...values) * 1.1
  const pct = (v: number) => `${(v / max) * 100}%`

  const markers: { label: string; value: number; color: string }[] = []

  if (offerAmount && offerAmount > 0)
    markers.push({ label: 'Offer', value: offerAmount, color: '#3b82f6' })
  markers.push({ label: 'Listed', value: listedPrice, color: '#6b7280' })
  if (marketValue && marketValue > 0)
    markers.push({ label: 'Market', value: marketValue, color: '#8b5cf6' })
  if (resaleValue && resaleValue > 0)
    markers.push({ label: 'Resale', value: resaleValue, color: '#22c55e' })

  // Profit zone: between listed price (or offer) and resale value
  const buyAt = offerAmount && offerAmount > 0 ? offerAmount : listedPrice
  const profitStart = resaleValue && resaleValue > buyAt ? buyAt : null
  const profitEnd = resaleValue && resaleValue > buyAt ? resaleValue : null

  return (
    <div className="w-full">
      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
        {/* Profit zone */}
        {profitStart != null && profitEnd != null && (
          <div
            className="absolute top-0 bottom-0 bg-green-100"
            style={{ left: pct(profitStart), width: pct(profitEnd - profitStart) }}
          />
        )}
        {/* Markers */}
        {markers.map((m) => (
          <div
            key={m.label}
            className="absolute top-0 bottom-0 w-0.5"
            style={{ left: pct(m.value), backgroundColor: m.color }}
          >
            <div
              className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap"
              style={{ color: m.color }}
            >
              {m.label}
            </div>
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap"
              style={{ color: m.color }}
            >
              {m.value.toFixed(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
