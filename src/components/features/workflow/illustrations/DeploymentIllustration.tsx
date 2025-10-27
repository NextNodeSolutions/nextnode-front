/**
 * Deployment & Infrastructure Illustration
 * Abstract representation of cloud deployment and scalability
 * Uses step-5 color variables for cohesive design
 */
export const DeploymentIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-full w-full"
			aria-hidden="true"
		>
			{/* Rocket body */}
			<path
				d="M200 80 L230 200 L200 280 L170 200 Z"
				fill="var(--step-5-primary)"
				stroke="var(--step-5-primary)"
				strokeWidth="2"
			/>

			{/* Rocket window */}
			<circle
				cx="200"
				cy="150"
				r="20"
				fill="var(--step-5-accent)"
				opacity="0.5"
			/>

			{/* Rocket fins */}
			<path
				d="M170 220 L140 260 L170 240 Z"
				fill="var(--step-5-accent)"
			/>
			<path
				d="M230 220 L260 260 L230 240 Z"
				fill="var(--step-5-accent)"
			/>

			{/* Flame/exhaust */}
			<ellipse
				cx="200"
				cy="290"
				rx="30"
				ry="40"
				fill="var(--step-5-primary)"
				opacity="0.3"
			/>
			<ellipse
				cx="200"
				cy="300"
				rx="20"
				ry="30"
				fill="var(--step-5-accent)"
				opacity="0.4"
			/>

			{/* Stars */}
			<circle cx="100" cy="100" r="3" fill="var(--step-5-primary)" />
			<circle cx="300" cy="120" r="3" fill="var(--step-5-accent)" />
			<circle
				cx="120"
				cy="180"
				r="2"
				fill="var(--step-5-primary)"
				opacity="0.6"
			/>
			<circle
				cx="310"
				cy="200"
				r="2"
				fill="var(--step-5-accent)"
				opacity="0.6"
			/>
		</svg>
	)
}
