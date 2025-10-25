import PatternBackground from '@/components/ui/patterns/PatternBackground.tsx'
import { cn } from '@/lib/core/utils'

import { IconBadge } from './IconBadge'
import { NumberBadge } from './NumberBadge'
import { PulseElements } from './PulseElements'

type PatternType = 'dots' | 'grid' | 'waves' | 'circuit' | 'hexagon'

interface StepCardHeaderProps {
	readonly gradient: string
	readonly pattern: PatternType
	readonly stepKey: string
	readonly index: number
	readonly number: string
	readonly icon: string
}

/**
 * StepCardHeader - Gradient header with pattern background, badges, and decorative elements
 * Responsive sizing via Tailwind breakpoints
 */
export const StepCardHeader = ({
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
				'h-20', // xl: large baseline
				'md:h-12', // md: mini
				'lg:h-16', // lg: compact
			)}
		>
			<PatternBackground
				pattern={pattern}
				opacity={0.1}
				uniqueId={`${stepKey}-${index}`}
				className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-20"
			/>

			<NumberBadge number={number} />
			<IconBadge icon={icon} />
			<PulseElements />
		</div>
	)
}
