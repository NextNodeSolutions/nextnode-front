import { useRef } from 'react'

import { Zap } from 'lucide-react'
import { motion } from 'motion/react'

import { useScrollAnimation } from '../hooks'
import PerformanceMetricItem from './PerformanceMetricItem'

interface PerformanceMetricsProps {
	readonly subtitle: string
	readonly grade: string
	readonly badge: string
	readonly metrics: readonly {
		readonly label: string
		readonly value: string
		readonly description: string
		readonly icon: string
		readonly unit: string
	}[]
}

/**
 * Performance metrics section with grade display and metric grid
 */
const PerformanceMetrics = ({
	subtitle,
	grade,
	badge,
	metrics,
}: PerformanceMetricsProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const isVisible = useScrollAnimation<HTMLDivElement>(ref)

	const colors = [
		'#10b981',
		'#3b82f6',
		'#8b5cf6',
		'#f59e0b',
		'#ec4899',
		'#06b6d4',
	]

	return (
		<div ref={ref} className="flex flex-col gap-6">
			{/* Subtitle and Grade */}
			<div className="flex items-center justify-between">
				<p className="text-xs text-gray-400">{subtitle}</p>
				<div className="from-brand-blue to-brand-green rounded-md bg-gradient-to-r px-3 py-1">
					<span className="text-sm font-bold text-white">
						{grade}
					</span>
				</div>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-2 gap-3">
				{metrics.map((metric, index) => (
					<PerformanceMetricItem
						key={metric.label}
						metric={metric}
						color={colors[index] || '#10b981'}
						index={index}
						isVisible={isVisible}
					/>
				))}
			</div>

			{/* Performance Badge */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={
					isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
				}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="bg-brand-green/10 flex items-center justify-center gap-2 rounded-lg px-4 py-2"
			>
				<Zap className="text-brand-green h-4 w-4" />
				<span className="text-brand-green text-xs font-medium">
					{badge}
				</span>
			</motion.div>
		</div>
	)
}

export default PerformanceMetrics
