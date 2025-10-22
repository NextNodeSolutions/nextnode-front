import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'
import { getVariantClasses } from '../step-card-variants'

interface StepCardTitleProps {
	readonly title: string
	readonly variant: StepCardVariant
}

/**
 * StepCardTitle - Card title with line-clamp and hover scale
 */
export const StepCardTitle = ({ title, variant }: StepCardTitleProps) => {
	return (
		<h3
			className={cn(
				'leading-tight font-bold text-gray-900 transition-all duration-300 group-hover:scale-105 dark:text-white',
				getVariantClasses(variant, 'title'),
			)}
		>
			{title}
		</h3>
	)
}
