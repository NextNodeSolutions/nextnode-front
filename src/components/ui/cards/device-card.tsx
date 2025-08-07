/**
 * DeviceCard - Reusable device representation card
 * Refactored to use BaseCard for consistent styling patterns
 */

import React from 'react'

import { BaseCard, type CardVariant } from './BaseCard'

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

const deviceIcons: Record<DeviceType, string> = {
	Mobile: '📱',
	Desktop: '💻',
	Tablet: '📱',
	Watch: '⌚',
}

// Map device sizes to card variants
const sizeToVariant: Record<'sm' | 'md' | 'lg', CardVariant> = {
	sm: 'compact',
	md: 'standard',
	lg: 'large',
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
	deviceType,
	style,
	className,
	size = 'md',
	showIcon = true,
}) => {
	const icon = deviceIcons[deviceType]
	const variant = sizeToVariant[size]

	return (
		<BaseCard
			variant={variant}
			layout="simple"
			hover="lift-sm"
			title={deviceType}
			icon={showIcon ? icon : undefined}
			className={`${style.bg} ${style.text} ${className || ''}`}
		/>
	)
}
