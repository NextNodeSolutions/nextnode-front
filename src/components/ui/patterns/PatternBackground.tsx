import { cn } from '@/lib/core/utils'

type PatternType = 'dots' | 'grid' | 'waves' | 'circuit' | 'hexagon'

interface PatternBackgroundProps {
	readonly pattern: PatternType
	readonly className?: string
	readonly opacity?: number
	readonly color?: string
	readonly uniqueId?: string
	readonly animated?: boolean
}

// Pattern-specific configurations
const PATTERN_CONFIGS = {
	dots: {
		patternUnits: 'userSpaceOnUse' as const,
		width: '10',
		height: '10',
	},
	grid: {
		patternUnits: 'userSpaceOnUse' as const,
		width: '10',
		height: '10',
	},
	waves: {
		patternUnits: 'userSpaceOnUse' as const,
		width: '20',
		height: '20',
	},
	circuit: {
		patternUnits: 'userSpaceOnUse' as const,
		width: '20',
		height: '20',
	},
	hexagon: {
		patternUnits: 'userSpaceOnUse' as const,
		width: '15',
		height: '13',
	},
}

const ANIMATION_CLASSES: Record<PatternType, string> = {
	dots: 'animate-pulse',
	grid: 'animate-pulse',
	waves: 'animate-pulse-slow',
	circuit: 'animate-bounce',
	hexagon: 'animate-pulse',
}

/**
 * PatternBackground - React component for decorative SVG patterns
 * Port of PatternBackground.astro for React components
 */
const PatternBackground = ({
	pattern,
	className = 'absolute inset-0',
	opacity = 0.1,
	color = 'currentColor',
	uniqueId,
	animated = false,
}: PatternBackgroundProps) => {
	// Generate unique ID if not provided
	const patternId =
		uniqueId ||
		`pattern-${pattern}-${Math.random().toString(36).slice(2, 11)}`

	const config = PATTERN_CONFIGS[pattern]
	const animationClass = animated ? ANIMATION_CLASSES[pattern] : ''

	const renderPattern = () => {
		switch (pattern) {
			case 'dots':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width={config.width}
						height={config.height}
						patternUnits={config.patternUnits}
					>
						<circle cx="5" cy="5" r="1" fill="currentColor" />
					</pattern>
				)

			case 'grid':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width={config.width}
						height={config.height}
						patternUnits={config.patternUnits}
					>
						<path
							d="M 10 0 L 0 0 0 10"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.5"
						/>
					</pattern>
				)

			case 'circuit':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width={config.width}
						height={config.height}
						patternUnits={config.patternUnits}
					>
						<circle
							cx="2"
							cy="2"
							r="1"
							fill="currentColor"
							opacity="0.3"
						/>
						<path
							d="M2,2 L10,2 L10,10 L18,10"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.5"
							opacity="0.5"
						/>
					</pattern>
				)

			case 'hexagon':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width={config.width}
						height={config.height}
						patternUnits={config.patternUnits}
					>
						<path
							d="M7.5 1 L11.5 4 L11.5 9 L7.5 12 L3.5 9 L3.5 4 Z"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.5"
							opacity="0.4"
						/>
					</pattern>
				)

			case 'waves':
				return null // Waves use direct path rendering
		}
	}

	return (
		<div
			className={cn(className, animationClass, 'pointer-events-none')}
			style={color !== 'currentColor' ? { color } : undefined}
		>
			<svg
				className="h-full w-full"
				viewBox="0 0 100 100"
				role="img"
				aria-label={`${pattern} pattern background`}
			>
				<defs>{renderPattern()}</defs>

				{pattern === 'waves' ? (
					<>
						<path
							d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
							fill="currentColor"
							opacity="0.1"
						/>
						<path
							d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z"
							fill="currentColor"
							opacity="0.05"
						/>
					</>
				) : (
					<rect
						width="100%"
						height="100%"
						fill={`url(#${patternId})`}
						opacity={opacity}
					/>
				)}
			</svg>
		</div>
	)
}

export default PatternBackground
