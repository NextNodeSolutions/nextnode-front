import React from 'react'

interface StepIllustrationProps {
	stepKey: string
	color: string
	className?: string
}

export default function StepIllustration({
	stepKey,
	color: _color,
	className: _className = '',
}: StepIllustrationProps): React.ReactElement {
	const getIllustration = (): React.ReactElement => {
		switch (stepKey) {
			case 'discovery':
				return (
					<div className="w-full space-y-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-4 w-4 rounded-full bg-blue-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Research
								</span>
							</div>
							<div className="mx-4 h-2 flex-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
							<span className="text-sm font-bold text-gray-600 dark:text-gray-400">
								100%
							</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-4 w-4 rounded-full bg-purple-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Analysis
								</span>
							</div>
							<div className="mx-4 h-2 flex-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-300" />
							<span className="text-sm font-bold text-gray-600 dark:text-gray-400">
								95%
							</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-4 w-4 rounded-full bg-pink-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Planning
								</span>
							</div>
							<div className="mx-4 h-2 flex-1 rounded-full bg-gradient-to-r from-pink-500 to-pink-300" />
							<span className="text-sm font-bold text-gray-600 dark:text-gray-400">
								90%
							</span>
						</div>
					</div>
				)

			case 'design':
				return (
					<div className="grid w-full grid-cols-2 gap-4">
						<div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-sm dark:from-blue-900 dark:to-blue-800">
							<span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
								Mobile
							</span>
						</div>
						<div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 shadow-sm dark:from-purple-900 dark:to-purple-800">
							<span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
								Desktop
							</span>
						</div>
						<div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 shadow-sm dark:from-pink-900 dark:to-pink-800">
							<span className="text-sm font-semibold text-pink-700 dark:text-pink-300">
								Tablet
							</span>
						</div>
						<div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-sm dark:from-indigo-900 dark:to-indigo-800">
							<span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
								Watch
							</span>
						</div>
					</div>
				)

			case 'development':
				return (
					<div className="w-full space-y-4">
						<div className="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-700">
							<div className="font-mono text-sm font-bold text-green-600 dark:text-green-400">
								Frontend
							</div>
							<div className="font-mono text-sm text-gray-600 dark:text-gray-400">
								React, Next.js, Astro
							</div>
						</div>
						<div className="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-700">
							<div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
								Backend
							</div>
							<div className="font-mono text-sm text-gray-600 dark:text-gray-400">
								Node.js, APIs
							</div>
						</div>
						<div className="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-700">
							<div className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">
								Database
							</div>
							<div className="font-mono text-sm text-gray-600 dark:text-gray-400">
								PostgreSQL, MongoDB
							</div>
						</div>
					</div>
				)

			case 'testing':
				return (
					<div className="grid w-full grid-cols-3 gap-3">
						{[...Array(9)].map((_, i) => (
							<div
								key={i}
								className={`aspect-square rounded-lg shadow-sm ${
									i < 7
										? 'bg-green-200 dark:bg-green-800'
										: i < 8
											? 'bg-yellow-200 dark:bg-yellow-800'
											: 'bg-red-200 dark:bg-red-800'
								} flex items-center justify-center`}
							>
								<div
									className={`h-3 w-3 rounded-full ${
										i < 7
											? 'bg-green-500'
											: i < 8
												? 'bg-yellow-500'
												: 'bg-red-500'
									}`}
								/>
							</div>
						))}
					</div>
				)

			case 'deployment':
				return (
					<div className="flex w-full items-center justify-center">
						<div className="relative">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg">
								<svg
									className="h-10 w-10 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="absolute -inset-3 animate-pulse rounded-full bg-gradient-to-br from-green-400 to-blue-500 opacity-20" />
						</div>
					</div>
				)

			case 'support':
				return (
					<div className="w-full space-y-4 text-center">
						<div className="flex justify-center space-x-2">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`h-12 w-3 rounded-full shadow-sm ${
										i < 4
											? 'bg-gradient-to-t from-blue-500 to-purple-500'
											: 'bg-gray-300 dark:bg-gray-600'
									}`}
								/>
							))}
						</div>
						<div className="text-sm font-medium text-gray-600 dark:text-gray-400">
							24/7 Monitoring
						</div>
					</div>
				)

			default:
				return (
					<div className="flex items-center justify-center text-gray-500">
						<span className="text-sm">
							Illustration non trouvée
						</span>
					</div>
				)
		}
	}

	return (
		<div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
			{getIllustration()}
		</div>
	)
}
