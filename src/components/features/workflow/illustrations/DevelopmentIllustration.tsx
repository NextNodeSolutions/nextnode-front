/**
 * Full-Stack Development Illustration
 * Abstract representation of code and development
 * Uses step-3 color variables for cohesive design
 */
export const DevelopmentIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-full w-full"
			aria-hidden="true"
		>
			{/* Terminal/IDE window */}
			<rect
				x="60"
				y="80"
				width="280"
				height="240"
				rx="12"
				fill="var(--step-3-primary)"
				opacity="0.1"
			/>
			<rect
				x="60"
				y="80"
				width="280"
				height="240"
				rx="12"
				stroke="var(--step-3-primary)"
				strokeWidth="4"
			/>

			{/* Window controls */}
			<circle cx="85" cy="105" r="6" fill="var(--step-3-accent)" />
			<circle
				cx="105"
				cy="105"
				r="6"
				fill="var(--step-3-accent)"
				opacity="0.7"
			/>
			<circle
				cx="125"
				cy="105"
				r="6"
				fill="var(--step-3-accent)"
				opacity="0.5"
			/>

			{/* Code lines */}
			<line
				x1="90"
				y1="150"
				x2="180"
				y2="150"
				stroke="var(--step-3-primary)"
				strokeWidth="4"
				strokeLinecap="round"
			/>
			<line
				x1="110"
				y1="180"
				x2="220"
				y2="180"
				stroke="var(--step-3-accent)"
				strokeWidth="4"
				strokeLinecap="round"
			/>
			<line
				x1="110"
				y1="210"
				x2="200"
				y2="210"
				stroke="var(--step-3-primary)"
				strokeWidth="4"
				strokeLinecap="round"
				opacity="0.7"
			/>
			<line
				x1="90"
				y1="240"
				x2="240"
				y2="240"
				stroke="var(--step-3-accent)"
				strokeWidth="4"
				strokeLinecap="round"
				opacity="0.6"
			/>
			<line
				x1="110"
				y1="270"
				x2="190"
				y2="270"
				stroke="var(--step-3-primary)"
				strokeWidth="4"
				strokeLinecap="round"
				opacity="0.5"
			/>

			{/* Bracket symbols */}
			<text
				x="260"
				y="200"
				fill="var(--step-3-primary)"
				fontSize="48"
				opacity="0.3"
			>
				{'{ }'}
			</text>
		</svg>
	)
}
