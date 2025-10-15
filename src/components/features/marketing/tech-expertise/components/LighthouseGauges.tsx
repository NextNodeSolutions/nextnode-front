import { useRef } from 'react'

import { getMetricColor } from '@/lib/config/metrics-config'

import { useScrollAnimation } from '../hooks'
import MetricCard from './MetricCard'

interface LighthouseGaugesProps {
	readonly data: {
		readonly performance: string
		readonly seo: string
		readonly accessibility: string
		readonly bestPractices: string
		readonly pwa: string
		readonly details: readonly {
			readonly label: string
			readonly description: string
			readonly icon:
				| 'zap'
				| 'search'
				| 'eye'
				| 'shield-check'
				| 'smartphone'
		}[]
	}
}

/**
 * Lighthouse metrics display with animated gauges
 * Receives all data as a single prop for cleaner composition
 */
const LighthouseGauges = ({ data }: LighthouseGaugesProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const isVisible = useScrollAnimation<HTMLDivElement>(ref)

	const values = [
		data.performance,
		data.seo,
		data.accessibility,
		data.bestPractices,
		data.pwa,
	]

	const metrics = data.details.map((detail, index) => ({
		...detail,
		value: values[index] || '0',
		color: getMetricColor(index),
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
