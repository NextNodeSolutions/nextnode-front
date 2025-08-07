import React from 'react'

import { cn } from '@/lib/core/utils'
import { DeviceCard } from '@/components/ui/cards/device-card'
import { ProgressBar } from '@/components/ui/progress/progress-bar'
import {
	DEVICE_TYPES,
	DISCOVERY_ITEMS,
	STACK_ITEMS,
	getDeviceStyle,
	type DeviceType,
} from '@/data/workflow-illustrations'

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
					<div className="w-full space-y-8">
						{DISCOVERY_ITEMS.map(item => (
							<ProgressBar
								key={item.name}
								label={item.name}
								progress={item.progress}
								dotClass={item.dotClass}
								gradientClass={item.gradientClass}
								size="lg"
							/>
						))}
					</div>
				)

			case 'design':
				return (
					<div className="grid w-full grid-cols-2 gap-6">
						{DEVICE_TYPES.map((device, i) => (
							<DeviceCard
								key={device}
								deviceType={device as DeviceType}
								style={getDeviceStyle(i)}
								size="lg"
								className="aspect-square"
							/>
						))}
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
									className={cn(
										'font-mono text-lg font-bold',
										item.textClass,
									)}
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
								className={cn(
									'flex aspect-square items-center justify-center rounded-xl p-2 shadow-lg',
									i < 7
										? 'bg-green-200 dark:bg-green-800'
										: i < 8
											? 'bg-yellow-200 dark:bg-yellow-800'
											: 'bg-red-200 dark:bg-red-800',
								)}
							>
								<div
									className={cn(
										'h-5 w-5 rounded-full shadow-sm',
										i < 7
											? 'bg-green-500'
											: i < 8
												? 'bg-yellow-500'
												: 'bg-red-500',
									)}
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
