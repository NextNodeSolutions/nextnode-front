/**
 * Testing & Optimization Illustration
 * Abstract representation of testing, metrics, and optimization
 * Uses step-4 color variables for cohesive design
 */
export const TestingIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-full w-full"
			aria-hidden="true"
		>
			{/* Chart container */}
			<rect
				x="60"
				y="100"
				width="280"
				height="200"
				rx="8"
				stroke="var(--step-4-primary)"
				strokeWidth="3"
				fill="none"
			/>

			{/* Chart bars */}
			<rect
				x="100"
				y="220"
				width="40"
				height="60"
				fill="var(--step-4-primary)"
				opacity="0.6"
			/>
			<rect
				x="160"
				y="180"
				width="40"
				height="100"
				fill="var(--step-4-accent)"
			/>
			<rect
				x="220"
				y="200"
				width="40"
				height="80"
				fill="var(--step-4-primary)"
				opacity="0.7"
			/>
			<rect
				x="280"
				y="160"
				width="40"
				height="120"
				fill="var(--step-4-accent)"
				opacity="0.8"
			/>

			{/* Checkmark */}
			<circle
				cx="200"
				cy="140"
				r="30"
				fill="var(--step-4-primary)"
				opacity="0.2"
			/>
			<path
				d="M 185 140 L 195 150 L 215 130"
				stroke="var(--step-4-primary)"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	)
}
