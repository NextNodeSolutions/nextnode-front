/**
 * Discovery & Strategy Illustration
 * Abstract representation of exploration and strategic planning
 * Uses step-1 color variables for cohesive design
 */
export const DiscoveryIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-full w-full"
			aria-hidden="true"
		>
			{/* Background gradient circle */}
			<circle
				cx="200"
				cy="200"
				r="180"
				fill="var(--step-1-primary)"
				opacity="0.1"
			/>

			{/* Magnifying glass handle */}
			<line
				x1="280"
				y1="280"
				x2="340"
				y2="340"
				stroke="var(--step-1-primary)"
				strokeWidth="12"
				strokeLinecap="round"
			/>

			{/* Magnifying glass circle */}
			<circle
				cx="240"
				cy="240"
				r="80"
				stroke="var(--step-1-primary)"
				strokeWidth="8"
				fill="none"
			/>

			{/* Inner focus circle */}
			<circle
				cx="240"
				cy="240"
				r="40"
				fill="var(--step-1-accent)"
				opacity="0.3"
			/>

			{/* Search dots pattern */}
			<circle
				cx="150"
				cy="150"
				r="8"
				fill="var(--step-1-primary)"
				opacity="0.6"
			/>
			<circle
				cx="180"
				cy="120"
				r="6"
				fill="var(--step-1-primary)"
				opacity="0.5"
			/>
			<circle
				cx="130"
				cy="180"
				r="7"
				fill="var(--step-1-primary)"
				opacity="0.4"
			/>
			<circle
				cx="100"
				cy="200"
				r="9"
				fill="var(--step-1-accent)"
				opacity="0.5"
			/>
			<circle
				cx="120"
				cy="230"
				r="6"
				fill="var(--step-1-accent)"
				opacity="0.4"
			/>
		</svg>
	)
}
