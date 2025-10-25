import { useRef } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { useOutsideClick } from '@/hooks'
import { cn } from '@/lib/core/utils'

import { getStepDesign } from '../step-designs'
import { StepCardContainer } from './parts/StepCardContainer'
import { StepCardContent } from './parts/StepCardContent'
import { StepCardGradientOverlay } from './parts/StepCardGradientOverlay'
import { StepCardHeader } from './parts/StepCardHeader'
import { CARD_FEATURES } from './step-card-variants'

export interface StepCardProps {
	readonly stepKey: string
	readonly index: number
	readonly number: string
	readonly title: string
	readonly description: string
	readonly stepLabel: string
	readonly clickToSeeMore: string
	readonly isExpanded?: boolean
	readonly onExpand?: () => void
	readonly onCollapse?: () => void
	readonly expandedContent?: React.ReactNode
}

/**
 * StepCard - Composable React card component with expandable behavior
 * Displays workflow step using fine-grained composition of reusable parts
 * Single responsive render with Tailwind breakpoint classes
 */
const StepCard = ({
	stepKey,
	index,
	number,
	title,
	description,
	stepLabel,
	clickToSeeMore,
	isExpanded = false,
	onExpand,
	onCollapse,
	expandedContent,
}: StepCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null)

	// Use centralized feature flags
	const { showHeader, showDescription, showStepLabel } = CARD_FEATURES

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
				'group transition-smooth hover-lift-sm relative h-full w-full cursor-pointer',
				'duration-500 hover:scale-[1.04]',
				// Responsive overrides: md=mini, lg=compact, xl=large(default)
				'md:duration-200 md:hover:scale-[1.02]',
				'lg:duration-300 lg:hover:scale-[1.03]',
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
			<StepCardGradientOverlay gradient={design.gradient} />

			{/* Card container with all sections */}
			<StepCardContainer glow={design.glow}>
				{/* Header section with gradient and patterns */}
				{showHeader && (
					<StepCardHeader
						gradient={design.gradient}
						pattern={design.pattern}
						stepKey={stepKey}
						index={index}
						number={number}
						icon={design.icon}
					/>
				)}

				{/* Content section (includes footer) */}
				<StepCardContent
					title={title}
					description={description}
					showDescription={showDescription}
					showStepLabel={showStepLabel}
					stepLabel={stepLabel}
					number={number}
					clickToSeeMore={clickToSeeMore}
					index={index}
					stepKey={stepKey}
					gradient={design.gradient}
				/>

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
			</StepCardContainer>
		</motion.div>
	)
}

export default StepCard
