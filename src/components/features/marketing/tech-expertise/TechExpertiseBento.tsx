import {
	Activity,
	CheckCircle,
	Code,
	Code2,
	Gauge,
	GitBranch,
	Lock,
	Rocket,
	Shield,
	Smartphone,
	Zap,
} from 'lucide-react'
import { motion } from 'motion/react'

import CodeBlock from '@/components/ui/CodeBlock'
import { cn } from '@/lib/core/utils'

import {
	BentoCard,
	CounterMetric,
	InfiniteMarquee,
	LighthouseGauges,
	PerformanceMetrics,
} from './components'

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

const CODE_SAMPLE = `// Track customer engagement with type-safe scoring
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
}`

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
							<CodeBlock
								code={CODE_SAMPLE}
								language="typescript"
							/>
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
