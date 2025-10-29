import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

import { STAGGER_CONFIG, STAGGER_VARIANTS } from '../workflow-animation-config'

interface Benefit {
	id?: string
	title: string
	description: string
	icon: string
}

interface ModalBenefitsGridProps {
	/** Section title (e.g., "Key Benefits") */
	title: string

	/** Array of benefits */
	benefits: readonly Benefit[]

	/** Accent color for visual elements */
	accentColor: string
}

/**
 * ModalBenefitsGrid - Minimal benefit cards
 *
 * Features:
 * - Clean cards with generous spacing
 * - Focus on typography
 * - Simple hover effects
 * - Responsive grid layout
 */
export const ModalBenefitsGrid = ({
	title,
	benefits,
	accentColor,
}: ModalBenefitsGridProps) => {
	return (
		<motion.div variants={STAGGER_VARIANTS} className="space-y-6">
			{/* Section Header */}
			<div className="flex items-center gap-2.5">
				{/* Simple icon */}
				<Sparkles
					className="h-5 w-5 flex-shrink-0"
					style={{ color: accentColor }}
					aria-hidden="true"
				/>

				<h3
					className={cn(
						// Typography
						'font-bold tracking-tight',

						// Compact sizing
						'text-xl',
						'sm:text-2xl',
						'md:text-3xl',

						// Colors
						'text-gray-900 dark:text-gray-50',
					)}
				>
					{title}
				</h3>
			</div>

			{/* Benefits Grid */}
			<motion.div
				variants={{
					visible: {
						transition: STAGGER_CONFIG.fast,
					},
				}}
				className={cn(
					// Grid layout with compact gap
					'grid gap-4',
					'sm:gap-6',

					// Responsive columns
					'grid-cols-1',
					'sm:grid-cols-2',
					'lg:grid-cols-3',
				)}
			>
				{benefits.map((benefit, index) => (
					<BenefitCard
						key={benefit.id || benefit.title}
						benefit={benefit}
						index={index}
					/>
				))}
			</motion.div>
		</motion.div>
	)
}

/**
 * Individual Benefit Card - Minimal & Clean
 */
const BenefitCard = ({
	benefit,
	index,
}: {
	benefit: Benefit
	index: number
}) => {
	return (
		<motion.div variants={STAGGER_VARIANTS} custom={index}>
			<div
				className={cn(
					// Structure - compact
					'h-full rounded-xl p-6',
					'space-y-3',

					// Simple background
					'bg-gray-50 dark:bg-gray-900',

					// Subtle border
					'border border-gray-200 dark:border-gray-800',

					// Simple hover
					'transition-all duration-200',
					'hover:-translate-y-1 hover:shadow-lg',
					'hover:border-gray-300 dark:hover:border-gray-700',
				)}
			>
				{/* Emoji Icon - smaller */}
				<div className="text-4xl" role="img" aria-label={benefit.title}>
					{benefit.icon}
				</div>

				{/* Title - Very Compact */}
				<h4
					className={cn(
						// Typography
						'font-bold tracking-tight',
						'text-sm',
						'sm:text-base',

						// Colors
						'text-gray-900 dark:text-gray-50',
					)}
				>
					{benefit.title}
				</h4>

				{/* Description - Very Small */}
				<p
					className={cn(
						// Typography - very compact
						'text-xs leading-relaxed',

						// Colors
						'text-gray-600 dark:text-gray-400',
					)}
				>
					{benefit.description}
				</p>
			</div>
		</motion.div>
	)
}
