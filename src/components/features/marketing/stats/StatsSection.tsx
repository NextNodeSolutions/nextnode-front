import { cn } from '@/lib/core/utils'

import StatsCounter, { type StatItem } from './StatsCounter'

export type { StatItem }

interface StatsSectionProps {
	title: string
	stats: readonly StatItem[]
}

const StatsSection = ({ title, stats }: StatsSectionProps) => {
	return (
		<section
			className={cn(
				'relative py-12 sm:py-18 lg:py-24',
				'from-brand-black via-brand-charcoal to-brand-black bg-gradient-to-br',
			)}
		>
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
			</div>

			<div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				{/* Section Header */}
				<div className="mb-16 text-center">
					<h2
						className={cn(
							'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
							'mb-4 text-white',
						)}
					>
						{title}
					</h2>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					{stats.map(stat => (
						<StatsCounter
							key={`${stat.value}-${stat.label}`}
							value={stat.value}
							label={stat.label}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default StatsSection
