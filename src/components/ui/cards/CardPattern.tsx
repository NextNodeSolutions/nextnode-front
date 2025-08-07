import React from 'react'

export type CardPattern = 'dots' | 'geometric' | 'none'

interface CardPatternProps {
	pattern?: CardPattern
	color?: string
}

export const CardPatternBackground: React.FC<CardPatternProps> = ({
	pattern = 'none',
	color = 'currentColor',
}) => {
	if (pattern === 'none') return null

	const patternId = `card-pattern-${pattern}-${Math.random().toString(36).substring(2, 11)}`

	const renderPattern = (): React.ReactElement | null => {
		switch (pattern) {
			case 'dots':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width="10"
						height="10"
						patternUnits="userSpaceOnUse"
					>
						<circle cx="5" cy="5" r="1" fill={color} />
					</pattern>
				)
			case 'geometric':
				return (
					<pattern
						id={patternId}
						x="0"
						y="0"
						width="10"
						height="10"
						patternUnits="userSpaceOnUse"
					>
						<circle cx="2" cy="2" r="1" fill={color} />
						<circle cx="8" cy="8" r="1" fill={color} />
						<path
							d="M 0 5 L 10 5 M 5 0 L 5 10"
							stroke={color}
							strokeWidth="0.5"
						/>
					</pattern>
				)
			default:
				return null
		}
	}

	return (
		<div className="absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10">
			<svg viewBox="0 0 100 100" className="h-full w-full">
				<defs>{renderPattern()}</defs>
				<rect width="100%" height="100%" fill={`url(#${patternId})`} />
			</svg>
		</div>
	)
}
