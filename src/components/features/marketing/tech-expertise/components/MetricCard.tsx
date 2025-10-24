import { motion } from 'motion/react'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/core/utils'

import { useCounterAnimation } from '../hooks'

interface MetricCardProps {
	readonly value: string
	readonly label: string
	readonly description: string
	readonly color: string
	readonly isVisible: boolean
	readonly delay: number
}

/**
 * Individual metric card with progress bar and animated counter
 */
const MetricCard = ({
	value,
	label,
	description,
	color,
	isVisible,
	delay,
}: MetricCardProps) => {
	const numericValue = Number.parseInt(value, 10)
	const displayValue = useCounterAnimation({
		targetValue: numericValue,
		isVisible,
		delay,
	})

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.6, delay: delay / 1000 }}
			className={cn(
				'flex h-full flex-col justify-between gap-3 rounded-xl p-4',
				'from-brand-charcoal/50 to-brand-soft-black/50 bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green/50 transition-all duration-300',
				'hover:shadow-brand-green/10 hover:scale-105 hover:shadow-xl',
				'relative overflow-hidden',
			)}
		>
			{/* Colored Accent Bar */}
			<div
				className="absolute top-0 bottom-0 left-0 w-1 rounded-l-xl"
				style={{
					backgroundColor: color,
					boxShadow: `0 0 8px ${color}60`,
				}}
			/>

			{/* Title and Score Row */}
			<div className="flex items-start justify-between">
				<div className="flex-1 pr-3">
					<div className="text-base font-bold text-white">
						{label}
					</div>
					<div className="text-xs text-gray-400">{description}</div>
				</div>
				<div
					className="min-w-14 shrink-0 text-right text-2xl font-bold tabular-nums"
					style={{ color }}
				>
					{displayValue}
				</div>
			</div>

			{/* Progress Bar */}
			<div className="w-full">
				<Progress
					value={isVisible ? numericValue : 0}
					aria-label={`${label}: ${displayValue}%`}
					className="h-2"
					style={
						{
							'--progress-color': color,
						} as React.CSSProperties
					}
				/>
			</div>

			{/* Hover Glow Effect */}
			<div
				className={cn(
					'absolute inset-0 rounded-xl opacity-0',
					'from-brand-blue/5 to-brand-green/5 bg-gradient-to-br',
					'blur-xl transition-opacity duration-500 group-hover:opacity-100',
				)}
			/>
		</motion.div>
	)
}

export default MetricCard
