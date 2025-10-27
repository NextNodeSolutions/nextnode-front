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
 * Responsive sizing via Tailwind breakpoints
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
				'flex h-full flex-col',
				'space-y-2 p-4', // xl: large baseline
				'md:p-2', // md: mini
				'lg:space-y-1 lg:p-3', // lg: compact
			)}
		>
			{/* Title and progress bar - fixed at top */}
			<div className="space-y-2">
				<StepCardTitle title={title} />
				<ProgressBar currentStep={index + 1} totalSteps={6} />
			</div>

			{/* Description - flexible space */}
			{showDescription && (
				<StepCardDescription description={description} />
			)}

			{/* Footer - fixed at bottom */}
			<StepCardFooter
				showStepLabel={showStepLabel}
				stepLabel={stepLabel}
				number={number}
				clickToSeeMore={clickToSeeMore}
			/>
		</div>
	)
}
