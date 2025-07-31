import React from 'react'

interface StepIllustrationProps {
	stepIndex: number
	color: string
}

export default function StepIllustration({
	stepIndex,
	color: _color,
}: StepIllustrationProps): React.ReactElement {
	const illustrations = [
		// Discovery (Step 0)
		(): React.ReactElement => (
			<div className="relative z-10 w-full">
				<div className="text-center text-lg font-bold text-red-500">
					CARD 0 VIDE - DEBUG
				</div>
			</div>
		),

		// Design (Step 1)
		(): React.ReactElement => (
			<div className="relative z-10 w-full">
				<div className="text-center text-lg font-bold text-red-500">
					CARD 1 VIDE - DEBUG
				</div>
			</div>
		),

		// Development (Step 2)
		(): React.ReactElement => (
			<div className="relative z-10 w-full">
				<div className="text-center text-lg font-bold text-red-500">
					CARD 2 VIDE - DEBUG
				</div>
			</div>
		),

		// Testing (Step 3)
		(): React.ReactElement => (
			<div className="relative z-10 w-full">
				<div className="text-center text-lg font-bold text-red-500">
					CARD 3 VIDE - DEBUG
				</div>
			</div>
		),

		// Deployment (Step 4)
		(): React.ReactElement => (
			<div className="relative z-10 w-full">
				<div className="text-center text-lg font-bold text-red-500">
					CARD 4 VIDE - DEBUG
				</div>
			</div>
		),

		// Support (Step 5)
		(): React.ReactElement => (
			<div className="relative z-10 w-full">
				<div className="text-center text-lg font-bold text-red-500">
					CARD 5 VIDE - DEBUG
				</div>
			</div>
		),
	]

	return (
		<div className="group flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-800 dark:to-gray-900">
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-5">
				<svg
					className="h-full w-full"
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<pattern
							id={`pattern-${stepIndex}`}
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<circle
								cx="10"
								cy="10"
								r="1"
								fill="currentColor"
							></circle>
						</pattern>
					</defs>
					<rect
						width="100"
						height="100"
						fill={`url(#pattern-${stepIndex})`}
					></rect>
				</svg>
			</div>

			{illustrations[stepIndex]?.()}
		</div>
	)
}
