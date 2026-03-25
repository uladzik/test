import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const from = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const current = from + (value - from) * easeOut(progress)
      setDisplay(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value, duration])

  return (
    <span>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
