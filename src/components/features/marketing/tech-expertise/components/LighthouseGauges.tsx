import { useRef } from 'react'

import { useScrollAnimation } from '../hooks'
import MetricCard from './MetricCard'

interface LighthouseGaugesProps {
	readonly performance: string
	readonly seo: string
	readonly accessibility: string
	readonly bestPractices: string
	readonly pwa: string
	readonly details: readonly {
		readonly label: string
		readonly description: string
		readonly icon: 'zap' | 'search' | 'eye' | 'shield-check' | 'smartphone'
	}[]
}

/**
 * Lighthouse metrics display with animated gauges
 */
const LighthouseGauges = ({
	performance,
	seo,
	accessibility,
	bestPractices,
	pwa,
	details,
}: LighthouseGaugesProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const isVisible = useScrollAnimation<HTMLDivElement>(ref)

	const values = [performance, seo, accessibility, bestPractices, pwa]
	const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899']

	const metrics = details.map((detail, index) => ({
		...detail,
		value: values[index] || '0',
		color: colors[index] || '#10b981',
		delay: index * 100,
	}))

	return (
		<div
			ref={ref}
			className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
		>
			{metrics.map(metric => (
				<MetricCard
					key={metric.label}
					value={metric.value}
					label={metric.label}
					description={metric.description}
					color={metric.color}
					isVisible={isVisible}
					delay={metric.delay}
				/>
			))}
		</div>
	)
}

export default LighthouseGauges
