import { cn } from '@/lib/core/utils'

import { ProgressBar } from './ProgressBar'
import { StepCardDescription } from './StepCardDescription'
import { StepCardFooter } from './StepCardFooter'
import { StepCardTitle } from './StepCardTitle'

interface StepCardContentProps {
	readonly title: string
	readonly description: string
	readonly showDescription: boolean
	readonly showStepLabel: boolean
	readonly stepLabel: string
	readonly number: string
	readonly clickToSeeMore: string
	readonly index: number
}

/**
 * StepCardContent - Main card content section
 * Uses CSS Grid with custom properties for uniform heights
 * Grid structure: title / progress / description / footer
 */
export const StepCardContent = ({
	title,
	description,
	showDescription,
	showStepLabel,
	stepLabel,
	number,
	clickToSeeMore,
	index,
}: StepCardContentProps) => {
	return (
		<div
			className={cn(
				// Grid layout with responsive row heights
				'grid h-full',
				// XL/Desktop: 4 rows with description (default)
				'grid-rows-[var(--card-title-height)_var(--card-progress-height)_var(--card-description-height)_var(--card-footer-height)]',
				// MD: 3 rows without description row (description is hidden)
				'md:grid-rows-[var(--card-title-height)_var(--card-progress-height)_var(--card-footer-height)]',
				// LG: back to 4 rows with description
				'lg:grid-rows-[var(--card-title-height)_var(--card-progress-height)_var(--card-description-height)_var(--card-footer-height)]',
				'gap-[var(--card-gap)]',
				// Padding variations
				'p-4', // xl: large baseline
				'md:p-2', // md: mini
				'lg:p-3', // lg: compact
			)}
		>
			{/* Title - fixed height grid row */}
			<StepCardTitle title={title} />

			{/* Progress bar - fixed height grid row */}
			<ProgressBar currentStep={index + 1} totalSteps={6} />

			{/* Description - only rendered on LG+ breakpoint */}
			{showDescription && (
				<div className="hidden lg:block">
					<StepCardDescription description={description} />
				</div>
			)}

			{/* Footer - fixed height grid row */}
			<StepCardFooter
				showStepLabel={showStepLabel}
				stepLabel={stepLabel}
				number={number}
				clickToSeeMore={clickToSeeMore}
			/>
		</div>
	)
}
