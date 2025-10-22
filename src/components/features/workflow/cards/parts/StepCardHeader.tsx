import PatternBackground from '@/components/ui/patterns/PatternBackground.tsx'
import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'
import { getVariantClasses } from '../step-card-variants'
import { IconBadge } from './IconBadge'
import { NumberBadge } from './NumberBadge'
import { PulseElements } from './PulseElements'

type PatternType = 'dots' | 'grid' | 'waves' | 'circuit' | 'hexagon'

interface StepCardHeaderProps {
	readonly variant: StepCardVariant
	readonly gradient: string
	readonly pattern: PatternType
	readonly stepKey: string
	readonly index: number
	readonly number: string
	readonly icon: string
}

/**
 * StepCardHeader - Gradient header with pattern background, badges, and decorative elements
 * Composes: PatternBackground, NumberBadge, IconBadge, PulseElements
 */
export const StepCardHeader = ({
	variant,
	gradient,
	pattern,
	stepKey,
	index,
	number,
	icon,
}: StepCardHeaderProps) => {
	return (
		<div
			className={cn(
				gradient,
				'relative overflow-hidden bg-gradient-to-br',
				getVariantClasses(variant, 'header'),
			)}
		>
			<PatternBackground
				pattern={pattern}
				opacity={0.1}
				uniqueId={`${stepKey}-${index}`}
				className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-20"
			/>

			<NumberBadge number={number} variant={variant} />
			<IconBadge icon={icon} variant={variant} />
			<PulseElements />
		</div>
	)
}
