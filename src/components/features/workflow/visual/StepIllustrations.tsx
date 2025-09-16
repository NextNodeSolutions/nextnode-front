import type React from 'react'

interface StepIllustrationProps {
	stepKey: string
}

export default function StepIllustration({
	stepKey,
}: StepIllustrationProps): React.ReactElement {
	const getIllustration = (): React.ReactElement => {
		switch (stepKey) {
			case 'discovery':
				return (
					<div className="flex h-full w-full items-center justify-center">
						<div className="text-center">
							<div className="text-6xl">🔍</div>
						</div>
					</div>
				)

			case 'design':
				return (
					<div className="flex h-full w-full items-center justify-center">
						<div className="text-center">
							<div className="text-6xl">🎨</div>
						</div>
					</div>
				)

			case 'development':
				return (
					<div className="flex h-full w-full items-center justify-center">
						<div className="text-center">
							<div className="text-6xl">⚡</div>
						</div>
					</div>
				)

			case 'testing':
				return (
					<div className="flex h-full w-full items-center justify-center">
						<div className="text-center">
							<div className="text-6xl">🧪</div>
						</div>
					</div>
				)

			case 'deployment':
				return (
					<div className="flex h-full w-full items-center justify-center">
						<div className="text-center">
							<div className="text-6xl">🚀</div>
						</div>
					</div>
				)

			case 'support':
				return (
					<div className="flex h-full w-full items-center justify-center">
						<div className="text-center">
							<div className="text-6xl">🛟</div>
						</div>
					</div>
				)

			default:
				return (
					<div className="flex items-center justify-center text-gray-500">
						<span className="text-sm">Illustration not found</span>
					</div>
				)
		}
	}

	return (
		<div className="flex h-full w-full items-center justify-center p-8">
			{getIllustration()}
		</div>
	)
}
