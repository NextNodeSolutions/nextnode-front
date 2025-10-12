import { useEffect, useRef, useState } from 'react'

import {
	Activity,
	CheckCircle,
	Code2,
	Gauge,
	GitBranch,
	Lock,
	Rocket,
	Shield,
	Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { cn } from '@/lib/core/utils'

interface TechExpertiseBentoProps {
	readonly title: string
	readonly subtitle: string
	readonly qualityBadges: {
		readonly title: string
		readonly items: readonly {
			readonly label: string
			readonly value: string
			readonly icon: 'shield' | 'check' | 'activity' | 'lock'
		}[]
	}
	readonly metrics: {
		readonly lighthouse: {
			readonly title: string
			readonly score: string
		}
		readonly performance: {
			readonly title: string
			readonly value: string
		}
		readonly bundle: {
			readonly title: string
			readonly value: string
		}
		readonly seo: {
			readonly title: string
			readonly score: string
		}
		readonly labels: {
			readonly performance: string
			readonly loadTime: string
			readonly seoPerformance: string
		}
	}
	readonly codeExample: {
		readonly title: string
	}
	readonly tools: {
		readonly title: string
		readonly items: readonly string[]
	}
}

const CounterMetric = ({
	value,
	label,
	delay = 0,
}: {
	value: string
	label: string
	delay?: number
}) => {
	const [count, setCount] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0]?.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.3 },
		)

		const currentRef = ref.current
		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [])

	useEffect(() => {
		if (!isVisible) return

		const numValue = value.match(/\d+/)
		if (!numValue) return

		const target = Number.parseInt(numValue[0], 10)
		const duration = 1500
		const steps = 60
		const increment = target / steps
		const stepDuration = duration / steps

		const timer = setTimeout(() => {
			let current = 0
			const interval = setInterval(() => {
				current += increment
				if (current >= target) {
					setCount(target)
					clearInterval(interval)
				} else {
					setCount(Math.floor(current))
				}
			}, stepDuration)
		}, delay)

		return () => clearTimeout(timer)
	}, [isVisible, value, delay])

	const displayValue = value.replace(/\d+/, count.toString())

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

const BentoCard = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{ duration: 0.5 }}
			whileHover={{ scale: 1.02 }}
			className={cn(
				'group relative overflow-hidden rounded-2xl',
				'from-brand-charcoal/50 to-brand-soft-black/50 bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green/50 p-6 transition-all duration-300',
				'hover:shadow-brand-green/10 hover:shadow-xl',
				'cursor-pointer backdrop-blur-sm',
				className,
			)}
		>
			{children}
			<div
				className={cn(
					'absolute inset-0 rounded-2xl opacity-0',
					'from-brand-blue/10 to-brand-green/10 bg-gradient-to-br',
					'blur-xl transition-opacity duration-500 group-hover:opacity-100',
				)}
			/>
		</motion.div>
	)
}

const TechExpertiseBento = ({
	title,
	subtitle,
	qualityBadges,
	metrics,
	codeExample,
	tools,
}: TechExpertiseBentoProps) => {
	const getIcon = (iconName: string) => {
		switch (iconName) {
			case 'shield':
				return <Shield className="text-brand-green h-5 w-5" />
			case 'check':
				return <CheckCircle className="text-brand-green h-5 w-5" />
			case 'activity':
				return <Activity className="text-brand-green h-5 w-5" />
			case 'lock':
				return <Lock className="text-brand-green h-5 w-5" />
			default:
				return <CheckCircle className="text-brand-green h-5 w-5" />
		}
	}
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
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className={cn(
							'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
							'mb-4 text-white',
						)}
					>
						{title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mx-auto max-w-3xl text-lg text-gray-400"
					>
						{subtitle}
					</motion.p>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{/* Quality Badges - Span 2 columns on large screens */}
					<BentoCard className="lg:col-span-2">
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<Shield className="text-brand-blue h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{qualityBadges.title}
								</h3>
							</div>
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
								{qualityBadges.items.map((badge, index) => (
									<motion.div
										key={badge.label}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className={cn(
											'flex flex-col items-center gap-2 rounded-lg p-4',
											'from-brand-green/10 to-brand-blue/10 bg-gradient-to-br',
											'border-brand-green/30 border',
											'hover:border-brand-green/50 transition-colors',
										)}
									>
										<div className="flex items-center gap-2">
											{getIcon(badge.icon)}
											<span className="text-lg font-bold text-white">
												{badge.value}
											</span>
										</div>
										<span className="text-xs text-gray-400">
											{badge.label}
										</span>
									</motion.div>
								))}
							</div>
						</div>
					</BentoCard>

					{/* Lighthouse Metrics */}
					<BentoCard>
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<Gauge className="text-brand-green h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{metrics.lighthouse.title}
								</h3>
							</div>
							<CounterMetric
								value={metrics.lighthouse.score}
								label={metrics.labels.performance}
								delay={0}
							/>
						</div>
					</BentoCard>

					{/* Code Example - Span 2 columns on large screens */}
					<BentoCard className="lg:col-span-2">
						<div className="relative z-10">
							<div className="mb-4 flex items-center gap-3">
								<Code2 className="text-brand-blue h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{codeExample.title}
								</h3>
							</div>
							<div className="overflow-hidden rounded-lg">
								<SyntaxHighlighter
									language="typescript"
									style={nord}
									customStyle={{
										margin: 0,
										padding: '1rem',
										fontSize: '0.875rem',
									}}
								>
									{`// Track customer engagement with type-safe scoring
type EngagementAction = 'visit' | 'click' | 'signup' | 'purchase'

interface EngagementScore {
  stage: string
  points: number
}

const getEngagementScore = (action: EngagementAction): EngagementScore => {
  const stages: Record<EngagementAction, EngagementScore> = {
    visit: { stage: 'Discovery', points: 10 },
    click: { stage: 'Interest', points: 25 },
    signup: { stage: 'Lead', points: 50 },
    purchase: { stage: 'Customer', points: 100 }
  }

  return stages[action]
}`}
								</SyntaxHighlighter>
							</div>
						</div>
					</BentoCard>

					{/* Performance Stats */}
					<BentoCard>
						<div className="relative z-10 space-y-6">
							<div className="flex items-center gap-3">
								<Zap className="text-brand-green h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{metrics.performance.title}
								</h3>
							</div>
							<CounterMetric
								value={metrics.performance.value}
								label={metrics.labels.loadTime}
								delay={200}
							/>
							<div className="border-brand-soft-black border-t pt-4">
								<CounterMetric
									value={metrics.bundle.value}
									label={metrics.bundle.title}
									delay={400}
								/>
							</div>
						</div>
					</BentoCard>

					{/* Developer Tools */}
					<BentoCard>
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<GitBranch className="text-brand-blue h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{tools.title}
								</h3>
							</div>
							<ul className="space-y-3">
								{tools.items.map((tool, index) => (
									<motion.li
										key={tool}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className="flex items-center gap-2 text-gray-300"
									>
										<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
										{tool}
									</motion.li>
								))}
							</ul>
						</div>
					</BentoCard>

					{/* SEO Score */}
					<BentoCard>
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<Rocket className="text-brand-green h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{metrics.seo.title}
								</h3>
							</div>
							<CounterMetric
								value={metrics.seo.score}
								label={metrics.labels.seoPerformance}
								delay={300}
							/>
						</div>
					</BentoCard>
				</div>
			</div>
		</section>
	)
}

export default TechExpertiseBento
