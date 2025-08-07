import React from 'react'

interface StepIllustrationProps {
	stepKey: string
}

const DEVICE_TYPES = ['Mobile', 'Desktop', 'Tablet', 'Watch'] as const

const DISCOVERY_ITEMS = [
	{
		name: 'Research',
		dotClass: 'bg-blue-500',
		gradientClass: 'bg-gradient-to-r from-blue-500 to-blue-300',
		progress: 100,
	},
	{
		name: 'Analysis',
		dotClass: 'bg-purple-500',
		gradientClass: 'bg-gradient-to-r from-purple-500 to-purple-300',
		progress: 95,
	},
	{
		name: 'Planning',
		dotClass: 'bg-pink-500',
		gradientClass: 'bg-gradient-to-r from-pink-500 to-pink-300',
		progress: 90,
	},
] as const

const DEVICE_STYLES = [
	{
		bg: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800',
		text: 'text-blue-700 dark:text-blue-300',
	},
	{
		bg: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800',
		text: 'text-purple-700 dark:text-purple-300',
	},
	{
		bg: 'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800',
		text: 'text-pink-700 dark:text-pink-300',
	},
	{
		bg: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800',
		text: 'text-indigo-700 dark:text-indigo-300',
	},
] as const

const STACK_ITEMS = [
	{
		label: 'Frontend',
		tech: 'React, Next.js, Astro',
		textClass: 'text-green-600 dark:text-green-400',
	},
	{
		label: 'Backend',
		tech: 'Node.js, APIs',
		textClass: 'text-blue-600 dark:text-blue-400',
	},
	{
		label: 'Database',
		tech: 'PostgreSQL, MongoDB',
		textClass: 'text-purple-600 dark:text-purple-400',
	},
] as const

export default function StepIllustration({
	stepKey,
}: StepIllustrationProps): React.ReactElement {
	const getIllustration = (): React.ReactElement => {
		switch (stepKey) {
			case 'discovery':
				return (
					<div className="w-full space-y-8">
						{DISCOVERY_ITEMS.map(item => (
							<div
								key={item.name}
								className="flex items-center justify-between"
							>
								<div className="flex items-center gap-4">
									<div
										className={`h-6 w-6 rounded-full shadow-sm ${item.dotClass}`}
									/>
									<span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
										{item.name}
									</span>
								</div>
								<div
									className={`mx-6 h-4 flex-1 rounded-full shadow-sm ${item.gradientClass}`}
								/>
								<span className="text-lg font-bold text-gray-600 dark:text-gray-400">
									{item.progress}%
								</span>
							</div>
						))}
					</div>
				)

			case 'design':
				return (
					<div className="grid w-full grid-cols-2 gap-6">
						{DEVICE_TYPES.map((device, i) =>
							DEVICE_STYLES[i] ? (
								<div
									key={device}
									className={`flex aspect-square items-center justify-center rounded-2xl p-6 shadow-lg ${DEVICE_STYLES[i].bg}`}
								>
									<span
										className={`text-lg font-bold ${DEVICE_STYLES[i].text}`}
									>
										{device}
									</span>
								</div>
							) : null,
						)}
					</div>
				)

			case 'development':
				return (
					<div className="w-full space-y-6">
						{STACK_ITEMS.map(item => (
							<div
								key={item.label}
								className="rounded-xl bg-gray-100 p-6 shadow-lg dark:bg-gray-700"
							>
								<div
									className={`font-mono text-lg font-bold ${item.textClass}`}
								>
									{item.label}
								</div>
								<div className="mt-1 font-mono text-base text-gray-600 dark:text-gray-400">
									{item.tech}
								</div>
							</div>
						))}
					</div>
				)

			case 'testing':
				return (
					<div className="grid w-full grid-cols-3 gap-5">
						{[...Array(9)].map((_, i) => (
							<div
								key={i}
								className={`aspect-square rounded-xl shadow-lg ${
									i < 7
										? 'bg-green-200 dark:bg-green-800'
										: i < 8
											? 'bg-yellow-200 dark:bg-yellow-800'
											: 'bg-red-200 dark:bg-red-800'
								} flex items-center justify-center p-2`}
							>
								<div
									className={`h-5 w-5 rounded-full shadow-sm ${
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
							<div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-xl">
								<svg
									className="h-14 w-14 text-white"
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
							<div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-br from-green-400 to-blue-500 opacity-25" />
						</div>
					</div>
				)

			case 'support':
				return (
					<div className="w-full space-y-6 text-center">
						<div className="flex justify-center space-x-3">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`h-16 w-4 rounded-full shadow-lg ${
										i < 4
											? 'bg-gradient-to-t from-blue-500 to-purple-500'
											: 'bg-gray-300 dark:bg-gray-600'
									}`}
								/>
							))}
						</div>
						<p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
							24/7 Monitoring
						</p>
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
