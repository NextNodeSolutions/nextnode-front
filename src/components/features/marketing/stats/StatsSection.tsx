import { useEffect, useRef, useState } from 'react'

import { useScrollAnimation } from '@/hooks'
import { cn } from '@/lib/core/utils'

export interface StatItem {
	readonly value: string
	readonly label: string
}

interface StatsSectionProps {
	title: string
	stats: readonly StatItem[]
}

const StatsCounter = ({ value, label }: StatItem) => {
	const [count, setCount] = useState(0)
	const ref = useRef<HTMLDivElement>(null)
	const isVisible = useScrollAnimation(ref, { threshold: 0.3 })

	useEffect(() => {
		if (!isVisible) return

		const numValue = value.match(/\d+/)
		if (!numValue) return

		const target = Number.parseInt(numValue[0], 10)
		const duration = 2000
		const steps = 60
		const increment = target / steps
		const stepDuration = duration / steps

		let current = 0
		const timer = setInterval(() => {
			current += increment
			if (current >= target) {
				setCount(target)
				clearInterval(timer)
			} else {
				setCount(Math.floor(current))
			}
		}, stepDuration)

		return () => clearInterval(timer)
	}, [isVisible, value])

	const displayValue = value.replace(/\d+/, count.toString())

	return (
		<div
			ref={ref}
			className={cn(
				'group relative rounded-2xl p-8 text-center',
				'from-brand-charcoal to-brand-soft-black bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green transition-all duration-300',
				'hover:shadow-brand-green/10 cursor-pointer hover:shadow-xl',
			)}
		>
			<div className="relative space-y-3">
				<div
					className={cn(
						'text-4xl font-bold sm:text-5xl lg:text-6xl',
						'from-brand-blue to-brand-green bg-gradient-to-r',
						'bg-clip-text text-transparent',
						'transition-transform duration-300 group-hover:scale-110',
						'inline-block',
					)}
				>
					{displayValue}
				</div>
				<p className="text-lg font-medium text-gray-400">{label}</p>
			</div>

			{/* Animated glow */}
			<div
				className={cn(
					'absolute inset-0 rounded-2xl opacity-0',
					'from-brand-blue/20 to-brand-green/20 bg-gradient-to-br',
					'blur-xl transition-opacity duration-500 group-hover:opacity-100',
				)}
			/>
		</div>
	)
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
