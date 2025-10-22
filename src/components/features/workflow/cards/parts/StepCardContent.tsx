import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'
import { getVariantClasses } from '../step-card-variants'
import { ProgressBar } from './ProgressBar'
import { StepCardDescription } from './StepCardDescription'
import { StepCardFooter } from './StepCardFooter'
import { StepCardTitle } from './StepCardTitle'

interface StepCardContentProps {
	readonly variant: StepCardVariant
	readonly title: string
	readonly description: string
	readonly showDescription: boolean
	readonly showStepLabel: boolean
	readonly stepLabel: string
	readonly number: string
	readonly clickToSeeMore: string
	readonly index: number
	readonly stepKey: string
	readonly gradient: string
}

/**
 * StepCardContent - Main card content section
 * Composes: StepCardTitle, ProgressBar, StepCardDescription, StepCardFooter
 */
export const StepCardContent = ({
	variant,
	title,
	description,
	showDescription,
	showStepLabel,
	stepLabel,
	number,
	clickToSeeMore,
	index,
	stepKey,
	gradient,
}: StepCardContentProps) => {
	return (
		<div
			className={cn(
				getVariantClasses(variant, 'content'),
				'flex h-full flex-col',
			)}
		>
			{/* Title and progress bar - fixed at top */}
			<div className="space-y-2">
				<StepCardTitle title={title} variant={variant} />
				<ProgressBar
					index={index}
					stepKey={stepKey}
					variant={variant}
					gradient={gradient}
				/>
			</div>

			{/* Description - flexible space */}
			{showDescription && (
				<StepCardDescription
					description={description}
					variant={variant}
				/>
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
