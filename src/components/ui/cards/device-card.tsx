/**
 * DeviceCard - Reusable device representation card
 * Extracted from StepIllustrations for consistent device display across workflow
 */

import React from 'react'

import { cn } from '@/lib/core/utils'

import type { DeviceType, DeviceStyle } from '@/data/workflow-illustrations'

export interface DeviceCardProps {
	/** Type of device to display */
	deviceType: DeviceType
	/** Styling configuration for the card */
	style: DeviceStyle
	/** Additional className for the container */
	className?: string
	/** Size variant */
	size?: 'sm' | 'md' | 'lg'
	/** Show device icon */
	showIcon?: boolean
}

const sizeClasses = {
	sm: {
		container: 'p-3',
		text: 'text-xs',
		icon: 'text-lg',
	},
	md: {
		container: 'p-4',
		text: 'text-sm',
		icon: 'text-xl',
	},
	lg: {
		container: 'p-6',
		text: 'text-base',
		icon: 'text-2xl',
	},
} as const

const deviceIcons: Record<DeviceType, string> = {
	Mobile: '📱',
	Desktop: '💻',
	Tablet: '📱',
	Watch: '⌚',
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
	deviceType,
	style,
	className,
	size = 'md',
	showIcon = true,
}) => {
	const sizeStyle = sizeClasses[size]
	const icon = deviceIcons[deviceType]

	return (
		<div
			className={cn(
				'flex flex-col items-center rounded-xl shadow-sm transition-shadow hover:shadow-md',
				style.bg,
				sizeStyle.container,
				className,
			)}
		>
			{showIcon && (
				<div className={cn('mb-2', sizeStyle.icon)}>{icon}</div>
			)}
			<span className={cn('font-semibold', style.text, sizeStyle.text)}>
				{deviceType}
			</span>
		</div>
	)
}
