import { Rocket } from 'lucide-react'
import { motion } from 'motion/react'

import { renderIcon } from '@/lib/ui/icon-mapper'

import BentoCard from './BentoCard'
import CounterMetric from './CounterMetric'

interface BentoSEOProps {
	readonly title: string
	readonly score: string
	readonly label: string
	readonly metrics: readonly {
		readonly label: string
		readonly value: string
		readonly icon: 'zap' | 'smartphone' | 'code'
	}[]
}

/**
 * SEO metrics section for Bento grid
 * Displays SEO score with supplementary metrics
 */
const BentoSEO = ({ title, score, label, metrics }: BentoSEOProps) => {
	return (
		<BentoCard>
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<Rocket className="text-brand-green h-6 w-6" />
					<h3 className="text-xl font-bold text-white">{title}</h3>
				</div>
				<div className="mb-6">
					<CounterMetric value={score} label={label} delay={300} />
				</div>
				<div className="border-brand-soft-black space-y-2 border-t pt-4">
					{metrics.map((metric, index) => (
						<motion.div
							key={metric.label}
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{
								delay: 0.4 + index * 0.1,
							}}
							className="flex items-center gap-2 text-sm"
						>
							{renderIcon(metric.icon, {
								className: 'text-brand-green h-4 w-4',
							})}
							<span className="text-gray-400">
								{metric.label}
							</span>
							<span className="ml-auto font-semibold text-white">
								{metric.value}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</BentoCard>
	)
}

export default BentoSEO
