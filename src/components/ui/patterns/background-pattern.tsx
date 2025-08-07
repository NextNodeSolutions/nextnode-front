import React from 'react'

import { cn } from '@/lib/core/utils'

interface BackgroundPatternProps {
	className?: string
	opacity?: number
	color?: string
	pattern?: 'dots' | 'grid' | 'diagonal'
}

/**
 * Composant réutilisable pour les motifs de fond
 * Utilisé pour créer des patterns subtils en arrière-plan
 */
export default function BackgroundPattern({
	className = '',
	opacity = 0.1,
	color = '#ffffff',
	pattern = 'dots',
}: BackgroundPatternProps): React.ReactElement {
	const patternId = `pattern-${pattern}-${Math.random().toString(36).substring(2, 11)}`

	const renderPattern = (): React.ReactElement | null => {
		switch (pattern) {
			case 'dots':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse"
					>
						<circle
							cx="2"
							cy="2"
							r="1"
							fill={color}
							opacity={opacity}
						/>
					</pattern>
				)
			case 'grid':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 20 0 L 0 0 0 20"
							fill="none"
							stroke={color}
							strokeWidth="0.5"
							opacity={opacity}
						/>
					</pattern>
				)
			case 'diagonal':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width="10"
						height="10"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 0 10 L 10 0"
							stroke={color}
							strokeWidth="0.5"
							opacity={opacity}
						/>
					</pattern>
				)
			default:
				return null
		}
	}

	return (
		<svg
			className={cn(
				'pointer-events-none absolute inset-0 h-full w-full',
				className,
			)}
			aria-hidden="true"
		>
			<defs>{renderPattern()}</defs>
			<rect width="100%" height="100%" fill={`url(#${patternId})`} />
		</svg>
	)
}
