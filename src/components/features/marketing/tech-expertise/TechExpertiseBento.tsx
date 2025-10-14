import { useEffect, useRef, useState } from 'react'

import {
	Activity,
	CheckCircle,
	Code,
	Code2,
	Eye,
	Gauge,
	GitBranch,
	Lock,
	MousePointer,
	Package,
	Rocket,
	Shield,
	Smartphone,
	Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/core/utils'

interface TechExpertiseBentoProps {
	readonly title: string
	readonly subtitle: string
	readonly qualityBadges: {
		readonly title: string
		readonly items: readonly {
			readonly title: string
			readonly subtitle: string
			readonly icon: 'shield' | 'check' | 'activity' | 'lock'
		}[]
	}
	readonly metrics: {
		readonly lighthouse: {
			readonly title: string
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
		readonly performance: {
			readonly title: string
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
		readonly seo: {
			readonly title: string
			readonly score: string
			readonly metrics: readonly {
				readonly label: string
				readonly value: string
				readonly icon: 'zap' | 'smartphone' | 'code'
			}[]
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

const MetricCard = ({
	value,
	label,
	description,
	color,
	isVisible,
	delay,
}: {
	value: string
	label: string
	description: string
	color: string
	isVisible: boolean
	delay: number
}) => {
	const numericValue = Number.parseInt(value, 10)
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		if (!isVisible) return

		const duration = 1500
		const steps = 60
		const increment = numericValue / steps
		const stepDuration = duration / steps

		const timer = setTimeout(() => {
			let current = 0
			const interval = setInterval(() => {
				current += increment
				if (current >= numericValue) {
					setDisplayValue(numericValue)
					clearInterval(interval)
				} else {
					setDisplayValue(Math.floor(current))
				}
			}, stepDuration)
		}, delay)

		return () => clearTimeout(timer)
	}, [isVisible, numericValue, delay])

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

const LighthouseGauges = ({
	performance,
	seo,
	accessibility,
	bestPractices,
	pwa,
	details,
}: {
	performance: string
	seo: string
	accessibility: string
	bestPractices: string
	pwa: string
	details: readonly {
		readonly label: string
		readonly description: string
		readonly icon: 'zap' | 'search' | 'eye' | 'shield-check' | 'smartphone'
	}[]
}) => {
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

const PerformanceMetricItem = ({
	metric,
	color,
	index,
	isVisible,
}: {
	metric: {
		readonly label: string
		readonly value: string
		readonly description: string
		readonly icon: string
		readonly unit: string
	}
	color: string
	index: number
	isVisible: boolean
}) => {
	const numericValue = Number.parseFloat(metric.value)
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		if (!isVisible) return

		const duration = 1500
		const steps = 60
		const increment = numericValue / steps
		const stepDuration = duration / steps

		const timer = setTimeout(() => {
			let current = 0
			const interval = setInterval(() => {
				current += increment
				if (current >= numericValue) {
					setDisplayValue(numericValue)
					clearInterval(interval)
				} else {
					setDisplayValue(Number(current.toFixed(1)))
				}
			}, stepDuration)
		}, index * 100)

		return () => clearTimeout(timer)
	}, [numericValue, index, isVisible])

	const getIcon = (iconName: string, color: string) => {
		const iconProps = { className: 'h-5 w-5', style: { color } }
		switch (iconName) {
			case 'eye':
				return <Eye {...iconProps} />
			case 'zap':
				return <Zap {...iconProps} />
			case 'mouse-pointer':
				return <MousePointer {...iconProps} />
			case 'activity':
				return <Activity {...iconProps} />
			case 'gauge':
				return <Gauge {...iconProps} />
			case 'package':
				return <Package {...iconProps} />
			default:
				return <Zap {...iconProps} />
		}
	}

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
				{getIcon(metric.icon, color)}
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
					{displayValue}
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

const PerformanceMetrics = ({
	subtitle,
	grade,
	badge,
	metrics,
}: {
	subtitle: string
	grade: string
	badge: string
	metrics: readonly {
		readonly label: string
		readonly value: string
		readonly description: string
		readonly icon: string
		readonly unit: string
	}[]
}) => {
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

const InfiniteMarquee = ({
	items,
	direction = 'horizontal',
}: {
	items: readonly string[]
	direction?: 'horizontal' | 'vertical'
}) => {
	const itemsWithIds = items.map((item, idx) => ({
		id: `${item}-${idx}`,
		text: item,
	}))
	const duplicatedItems = [
		...itemsWithIds,
		...itemsWithIds.map(item => ({ ...item, id: `${item.id}-dup` })),
	]

	if (direction === 'vertical') {
		return (
			<div className="relative h-full overflow-hidden">
				<div className="from-brand-charcoal/50 absolute top-0 left-0 z-10 h-12 w-full bg-gradient-to-b to-transparent" />
				<div className="from-brand-charcoal/50 absolute bottom-0 left-0 z-10 h-12 w-full bg-gradient-to-t to-transparent" />
				<motion.div
					className="flex flex-col gap-3"
					animate={{
						y: [0, -40 * items.length],
					}}
					transition={{
						y: {
							repeat: Number.POSITIVE_INFINITY,
							repeatType: 'loop',
							duration: 15,
							ease: 'linear',
						},
					}}
				>
					{duplicatedItems.map(item => (
						<div
							key={item.id}
							className={cn(
								'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2',
								'from-brand-blue/10 to-brand-green/10 bg-gradient-to-r',
								'border-brand-blue/20 border',
								'text-sm text-white',
							)}
						>
							<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
							{item.text}
						</div>
					))}
				</motion.div>
			</div>
		)
	}

	return (
		<div className="relative w-full overflow-hidden">
			<div className="from-brand-charcoal/50 absolute top-0 left-0 z-10 h-full w-12 bg-gradient-to-r to-transparent" />
			<div className="from-brand-charcoal/50 absolute top-0 right-0 z-10 h-full w-12 bg-gradient-to-l to-transparent" />
			<motion.div
				className="flex gap-4"
				animate={{
					x: [0, -50 * items.length],
				}}
				transition={{
					x: {
						repeat: Number.POSITIVE_INFINITY,
						repeatType: 'loop',
						duration: 20,
						ease: 'linear',
					},
				}}
			>
				{duplicatedItems.map(item => (
					<div
						key={item.id}
						className={cn(
							'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2',
							'from-brand-blue/10 to-brand-green/10 bg-gradient-to-r',
							'border-brand-blue/20 border',
							'text-sm whitespace-nowrap text-white',
						)}
					>
						<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
						{item.text}
					</div>
				))}
			</motion.div>
		</div>
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
	const getQualityIcon = (iconName: string) => {
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

	const getSeoIcon = (iconName: string) => {
		switch (iconName) {
			case 'zap':
				return <Zap className="text-brand-green h-4 w-4" />
			case 'smartphone':
				return <Smartphone className="text-brand-green h-4 w-4" />
			case 'code':
				return <Code className="text-brand-green h-4 w-4" />
			default:
				return <CheckCircle className="text-brand-green h-4 w-4" />
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
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
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
										key={badge.subtitle}
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
											{getQualityIcon(badge.icon)}
											<span className="text-lg font-bold text-white">
												{badge.title}
											</span>
										</div>
										<span className="text-xs text-gray-400">
											{badge.subtitle}
										</span>
									</motion.div>
								))}
							</div>
						</div>
					</BentoCard>

					{/* Developer Tools - Horizontal Marquee */}
					<BentoCard>
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<GitBranch className="text-brand-blue h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{tools.title}
								</h3>
							</div>
							<InfiniteMarquee
								items={tools.items}
								direction="horizontal"
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

					{/* Performance Metrics */}
					<BentoCard>
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<Zap className="text-brand-green h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{metrics.performance.title}
								</h3>
							</div>
							<PerformanceMetrics
								subtitle={metrics.performance.subtitle}
								grade={metrics.performance.grade}
								badge={metrics.performance.badge}
								metrics={metrics.performance.metrics}
							/>
						</div>
					</BentoCard>

					{/* Lighthouse Multi-Metrics - Mini Gauges */}
					<BentoCard className="lg:col-span-2">
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<Gauge className="text-brand-green h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{metrics.lighthouse.title}
								</h3>
							</div>
							<LighthouseGauges
								performance={metrics.lighthouse.performance}
								seo={metrics.lighthouse.seo}
								accessibility={metrics.lighthouse.accessibility}
								bestPractices={metrics.lighthouse.bestPractices}
								pwa={metrics.lighthouse.pwa}
								details={metrics.lighthouse.details}
							/>
						</div>
					</BentoCard>

					{/* SEO Score - Enhanced with Metrics */}
					<BentoCard>
						<div className="relative z-10">
							<div className="mb-6 flex items-center gap-3">
								<Rocket className="text-brand-green h-6 w-6" />
								<h3 className="text-xl font-bold text-white">
									{metrics.seo.title}
								</h3>
							</div>
							<div className="mb-6">
								<CounterMetric
									value={metrics.seo.score}
									label={metrics.labels.seoPerformance}
									delay={300}
								/>
							</div>
							<div className="border-brand-soft-black space-y-2 border-t pt-4">
								{metrics.seo.metrics.map((metric, index) => (
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
										{getSeoIcon(metric.icon)}
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
				</div>
			</div>
		</section>
	)
}

export default TechExpertiseBento
