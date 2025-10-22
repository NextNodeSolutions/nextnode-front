import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'
import { getVariantClasses } from '../step-card-variants'

interface StepCardDescriptionProps {
	readonly description: string
	readonly variant: StepCardVariant
}

/**
 * StepCardDescription - Card description with line-clamp and hover color change
 */
export const StepCardDescription = ({
	description,
	variant,
}: StepCardDescriptionProps) => {
	return (
		<p
			className={cn(
				'leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-200',
				getVariantClasses(variant, 'description'),
				'flex-1',
			)}
		>
			{description}
		</p>
	)
}
