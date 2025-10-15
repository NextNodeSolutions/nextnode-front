import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'
import { renderIcon } from '@/lib/ui/icon-mapper'

import { useCounterAnimation } from '../hooks'

interface PerformanceMetricItemProps {
	readonly metric: {
		readonly label: string
		readonly value: string
		readonly description: string
		readonly icon: string
		readonly unit: string
	}
	readonly color: string
	readonly index: number
	readonly isVisible: boolean
}

/**
 * Individual performance metric item with icon and animated value
 */
const PerformanceMetricItem = ({
	metric,
	color,
	index,
	isVisible,
}: PerformanceMetricItemProps) => {
	const numericValue = Number.parseFloat(metric.value)
	const displayValue = useCounterAnimation({
		targetValue: numericValue,
		isVisible,
		delay: index * 100,
	})

	// Format display value to match original precision
	const formattedValue =
		numericValue % 1 === 0
			? displayValue.toString()
			: displayValue.toFixed(1)

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={
				isVisible
					? { opacity: 1, scale: 1 }
					: { opacity: 0, scale: 0.9 }
			}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className={cn(
				'flex flex-col gap-2 rounded-lg p-3',
				'from-brand-charcoal/30 to-brand-soft-black/30 bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green/30 transition-all duration-300',
			)}
		>
			{/* Icon and Label */}
			<div className="flex items-center gap-2">
				{renderIcon(metric.icon, {
					className: 'h-5 w-5',
					style: { color },
				})}
				<span className="text-xs font-semibold text-gray-300">
					{metric.label}
				</span>
			</div>

			{/* Value */}
			<div className="flex items-baseline gap-1">
				<span
					className="text-2xl font-bold text-white tabular-nums"
					style={{ color }}
				>
					{formattedValue}
				</span>
				<span className="text-xs text-gray-400">{metric.unit}</span>
			</div>

			{/* Description */}
			<p className="text-[10px] leading-tight text-gray-500">
				{metric.description}
			</p>
		</motion.div>
	)
}

export default PerformanceMetricItem
