import React from 'react'
import type { ReactElement } from 'react'

export interface TextSegment {
	text: string
	isHighlighted: boolean
}

interface HighlightedTextProps {
	segments: TextSegment[]
	className?: string
}

export const HighlightedText = ({
	segments,
	className,
}: HighlightedTextProps): ReactElement => (
	<span className={className}>
		{segments.map((segment, index) =>
			segment.isHighlighted ? (
				<mark
					key={`${segment.text}-${index}`}
					className="bg-yellow-200 dark:bg-yellow-800/50"
				>
					{segment.text}
				</mark>
			) : (
				<React.Fragment key={`${segment.text}-${index}`}>
					{segment.text}
				</React.Fragment>
			),
		)}
	</span>
)
