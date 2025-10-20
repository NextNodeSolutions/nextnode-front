import { useRef } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import PatternBackground from '@/components/ui/patterns/PatternBackground'
import { useOutsideClick } from '@/hooks'
import { cn } from '@/lib/core/utils'

import { getStepDesign } from '../step-designs'
import type { StepCardVariant } from './step-card-variants'
import { getVariantClasses, VARIANT_FEATURES } from './step-card-variants'

export interface StepCardProps {
	readonly stepKey: string
	readonly index: number
	readonly number: string
	readonly title: string
	readonly description: string
	readonly variant?: StepCardVariant
	readonly stepLabel: string
	readonly clickToSeeMore: string
	readonly isExpanded?: boolean
	readonly onExpand?: () => void
	readonly onCollapse?: () => void
	readonly expandedContent?: React.ReactNode
}

/**
 * StepCard - React version of StepCard.astro with expandable behavior
 * Displays workflow step with gradient header, icon, and description
 * Maintains exact same design as Astro version for consistency
 * Adds click-to-expand functionality with smooth animations
 */
const StepCard = ({
	stepKey,
	index,
	number,
	title,
	description,
	variant = 'mobile',
	stepLabel,
	clickToSeeMore,
	isExpanded = false,
	onExpand,
	onCollapse,
	expandedContent,
}: StepCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null)

	// Use centralized variant configuration
	const showHeader = VARIANT_FEATURES.showHeader(variant)
	const showDescription = VARIANT_FEATURES.showDescription(variant)
	const showStepLabel = VARIANT_FEATURES.showStepLabel(variant)

	const design = getStepDesign(index)

	// Handle click outside to collapse
	useOutsideClick(cardRef, () => {
		if (isExpanded && onCollapse) {
			onCollapse()
		}
	})

	// Handle card click to expand
	const handleCardClick = () => {
		if (!isExpanded && onExpand) {
			onExpand()
		}
	}

	return (
		<motion.div
			ref={cardRef}
			className={cn(
				'group transition-smooth hover-lift-sm relative cursor-pointer',
				getVariantClasses(variant, 'container'),
				isExpanded && 'z-50',
			)}
			data-step-card
			data-step-index={index}
			onClick={handleCardClick}
			animate={{
				scale: isExpanded ? 1.05 : 1,
				zIndex: isExpanded ? 50 : 1,
			}}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
		>
			{/* Gradient overlay on hover */}
			<div
				className={cn(
					'absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-0 blur transition-all duration-500 group-hover:opacity-20',
					design.gradient,
				)}
			/>

			{/* Card container */}
			<div
				className={cn(
					'card-base relative overflow-hidden border border-gray-100 dark:border-gray-800',
					design.glow,
				)}
			>
				{/* Header section with gradient and patterns */}
				{showHeader && (
					<div
						className={cn(
							design.gradient,
							'relative overflow-hidden bg-gradient-to-br',
							getVariantClasses(variant, 'header'),
						)}
					>
						<PatternBackground
							pattern={design.pattern}
							opacity={0.1}
							uniqueId={`${stepKey}-${index}`}
							className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-20"
						/>

						{/* Number badge (top-right) */}
						<div
							className={cn(
								'absolute transform transition-transform duration-500 group-hover:rotate-12',
								getVariantClasses(variant, 'position'),
							)}
						>
							<div
								className={cn(
									'flex items-center justify-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/30 backdrop-blur-sm',
									getVariantClasses(variant, 'number'),
								)}
							>
								<span
									className={cn(
										'font-black text-white drop-shadow-sm',
										getVariantClasses(
											variant,
											'numberText',
										),
									)}
								>
									{number}
								</span>
							</div>
						</div>

						{/* Icon element (bottom-left) */}
						<div
							className={cn(
								'absolute transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6',
								getVariantClasses(variant, 'iconPosition'),
							)}
						>
							<div
								className={cn(
									'flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md',
									getVariantClasses(variant, 'icon'),
								)}
							>
								<span
									className={cn(
										'drop-shadow-lg filter',
										getVariantClasses(variant, 'iconText'),
									)}
								>
									{design.icon}
								</span>
							</div>
						</div>

						{/* Decorative pulse elements */}
						<div className="absolute top-2 left-2 h-4 w-4 animate-pulse rounded-full bg-white/20 blur-sm" />
						<div
							className="absolute right-2 bottom-2 h-3 w-3 animate-pulse rounded-full bg-white/30 blur-sm"
							style={{ animationDelay: '1s' }}
						/>
					</div>
				)}

				{/* Content section */}
				<div className={cn(getVariantClasses(variant, 'content'))}>
					<div className="space-y-2">
						{/* Title */}
						<h3
							className={cn(
								'leading-tight font-bold text-gray-900 transition-all duration-300 group-hover:scale-105 dark:text-white',
								getVariantClasses(variant, 'title'),
							)}
						>
							{title}
						</h3>

						{/* Progress bar visualization */}
						<div
							className={cn(
								'flex items-center space-x-1',
								variant === 'mini' ? 'py-1' : 'py-2',
							)}
						>
							{Array.from({ length: 6 }, (_, i) => (
								<div
									key={`progress-${stepKey}-${i}`}
									className={cn(
										'flex-1 rounded-full transition-all duration-700',
										variant === 'mini' ? 'h-0.5' : 'h-1',
										i <= index
											? cn(
													'bg-gradient-to-r shadow-sm',
													design.gradient,
												)
											: 'bg-gray-200 dark:bg-gray-700',
									)}
									style={{ transitionDelay: `${i * 50}ms` }}
								/>
							))}
						</div>
					</div>

					{/* Description (hidden for mini variant) */}
					{showDescription && (
						<p
							className={cn(
								'leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-200',
								getVariantClasses(variant, 'description'),
							)}
						>
							{description}
						</p>
					)}

					{/* Footer with step label and CTA */}
					<div className="pt-2">
						{showStepLabel && (
							<div className="mb-1">
								<span className="text-xs font-medium tracking-wider whitespace-nowrap text-gray-500 uppercase dark:text-gray-400">
									{stepLabel} {number}
								</span>
							</div>
						)}

						<div className="flex items-center">
							<span className="text-xs font-medium text-blue-600 dark:text-blue-400">
								{clickToSeeMore}
							</span>
							<span className="ml-1 text-xs font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-blue-400">
								&gt;
							</span>
						</div>
					</div>
				</div>

				{/* Expanded content area with animation */}
				<AnimatePresence>
					{isExpanded && expandedContent && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
						>
							<div className="p-6">{expandedContent}</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}

export default StepCard
