/**
 * Support & Maintenance Illustration
 * Abstract representation of continuous support and system maintenance
 * Uses step-6 color variables for cohesive design
 */
export const SupportIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-full w-full"
			aria-hidden="true"
		>
			{/* Central gear */}
			<circle
				cx="200"
				cy="200"
				r="60"
				fill="var(--step-6-primary)"
				opacity="0.1"
			/>
			<circle
				cx="200"
				cy="200"
				r="60"
				stroke="var(--step-6-primary)"
				strokeWidth="6"
			/>

			{/* Gear teeth (simplified - no complex loops) */}
			<rect
				x="192"
				y="130"
				width="16"
				height="20"
				fill="var(--step-6-primary)"
			/>
			<rect
				x="230"
				y="155"
				width="20"
				height="16"
				fill="var(--step-6-primary)"
			/>
			<rect
				x="192"
				y="250"
				width="16"
				height="20"
				fill="var(--step-6-primary)"
			/>
			<rect
				x="150"
				y="155"
				width="20"
				height="16"
				fill="var(--step-6-primary)"
			/>

			{/* Inner circle */}
			<circle
				cx="200"
				cy="200"
				r="30"
				fill="var(--step-6-accent)"
				opacity="0.3"
			/>

			{/* Wrench */}
			<rect
				x="260"
				y="140"
				width="12"
				height="80"
				rx="6"
				fill="var(--step-6-accent)"
				opacity="0.7"
			/>
			<circle
				cx="266"
				cy="135"
				r="15"
				stroke="var(--step-6-accent)"
				strokeWidth="4"
				fill="none"
			/>

			{/* Support dots */}
			<circle
				cx="120"
				cy="200"
				r="8"
				fill="var(--step-6-primary)"
				opacity="0.5"
			/>
			<circle
				cx="280"
				cy="200"
				r="8"
				fill="var(--step-6-primary)"
				opacity="0.5"
			/>
			<circle
				cx="200"
				cy="120"
				r="8"
				fill="var(--step-6-accent)"
				opacity="0.5"
			/>
			<circle
				cx="200"
				cy="280"
				r="8"
				fill="var(--step-6-accent)"
				opacity="0.5"
			/>
		</svg>
	)
}
