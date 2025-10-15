import { useEffect, useRef, useState } from 'react'

import { useScrollAnimation } from '@/hooks'
import { cn } from '@/lib/core/utils'

export interface StatItem {
	readonly value: string
	readonly label: string
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

export default StatsCounter
