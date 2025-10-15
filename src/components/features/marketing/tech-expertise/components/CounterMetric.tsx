import { useRef } from 'react'

import { cn } from '@/lib/core/utils'

import { useCounterAnimation, useScrollAnimation } from '../hooks'

interface CounterMetricProps {
	readonly value: string
	readonly label: string
	readonly delay?: number
}

/**
 * Animated counter metric display
 * Counts from 0 to target value when scrolled into view
 */
const CounterMetric = ({ value, label, delay = 0 }: CounterMetricProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const isVisible = useScrollAnimation<HTMLDivElement>(ref)

	const numValue = value.match(/\d+/)
	const targetValue = numValue ? Number.parseInt(numValue[0], 10) : 0
	const displayCount = useCounterAnimation({
		targetValue,
		isVisible,
		delay,
	})

	const displayValue = value.replace(/\d+/, displayCount.toString())

	return (
		<div ref={ref} className="text-center">
			<div
				className={cn(
					'text-3xl font-bold sm:text-4xl',
					'from-brand-blue to-brand-green bg-gradient-to-r',
					'bg-clip-text text-transparent',
				)}
			>
				{displayValue}
			</div>
			<p className="mt-2 text-sm text-gray-400">{label}</p>
		</div>
	)
}

export default CounterMetric
