/**
 * Design & UX/UI Illustration
 * Abstract representation of design tools and creative process
 * Uses step-2 color variables for cohesive design
 */
export const DesignIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-full w-full"
			aria-hidden="true"
		>
			{/* Design grid background */}
			<rect
				x="80"
				y="80"
				width="240"
				height="240"
				stroke="var(--step-2-primary)"
				strokeWidth="2"
				opacity="0.2"
			/>

			{/* Pen tool */}
			<path
				d="M 150 150 L 200 100 L 220 120 L 170 170 Z"
				fill="var(--step-2-primary)"
				opacity="0.7"
			/>

			{/* Color swatches */}
			<circle cx="120" cy="280" r="20" fill="var(--step-2-primary)" />
			<circle cx="170" cy="280" r="20" fill="var(--step-2-accent)" />
			<circle
				cx="220"
				cy="280"
				r="20"
				fill="var(--step-2-primary)"
				opacity="0.6"
			/>

			{/* Design frame */}
			<rect
				x="200"
				y="200"
				width="140"
				height="100"
				rx="8"
				stroke="var(--step-2-accent)"
				strokeWidth="4"
				fill="none"
			/>

			{/* Grid dots inside frame */}
			<circle
				cx="230"
				cy="230"
				r="3"
				fill="var(--step-2-primary)"
				opacity="0.5"
			/>
			<circle
				cx="260"
				cy="230"
				r="3"
				fill="var(--step-2-primary)"
				opacity="0.5"
			/>
			<circle
				cx="290"
				cy="230"
				r="3"
				fill="var(--step-2-primary)"
				opacity="0.5"
			/>
			<circle
				cx="230"
				cy="260"
				r="3"
				fill="var(--step-2-primary)"
				opacity="0.5"
			/>
			<circle
				cx="260"
				cy="260"
				r="3"
				fill="var(--step-2-primary)"
				opacity="0.5"
			/>
			<circle
				cx="290"
				cy="260"
				r="3"
				fill="var(--step-2-primary)"
				opacity="0.5"
			/>
		</svg>
	)
}
