/**
 * SimpleTechCard - Simplified version of TechCard using BaseCard
 * Demonstrates how to migrate existing cards to use BaseCard patterns
 */

import React from 'react'

import { getTechColorClasses } from '@/data/tech-stack'

import { BaseCard } from './BaseCard'

import type { Technology, TechCategory } from '@/data/tech-stack'

export interface SimpleTechCardProps {
	/** Technology data to display */
	technology: Technology
	/** Category data for color theming */
	category: TechCategory
	/** Animation delay index for staggered animations */
	animationIndex?: number
	/** Additional CSS classes */
	className?: string
	/** Size variant */
	size?: 'compact' | 'standard' | 'large'
}

export const SimpleTechCard: React.FC<SimpleTechCardProps> = ({
	technology,
	category,
	animationIndex = 0,
	className,
	size = 'standard',
}) => {
	const colors = getTechColorClasses(category.color)

	// Create a hex color from the gradient classes for BaseCard
	const colorMap = {
		blue: '#3B82F6',
		purple: '#8B5CF6',
		green: '#10B981',
		orange: '#F59E0B',
		red: '#EF4444',
	}
	const accentColor = colorMap[category.color]

	// Progress bar component
	const ProgressSection = (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
					Expertise Level
				</span>
				<span className={`text-xs font-bold ${colors.text}`}>
					{technology.level}%
				</span>
			</div>
			<div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
				<div
					className={`h-2 rounded-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 ease-out`}
					style={{ width: `${technology.level}%` }}
				/>
			</div>
		</div>
	)

	return (
		<BaseCard
			variant={size}
			layout="with-icon"
			color={accentColor}
			pattern="dots"
			hover="lift"
			animationDelay={animationIndex * 100}
			icon={technology.icon}
			title={technology.name}
			description="Technology expertise level"
			badge={{
				text: `${technology.level}% Mastery`,
				color: accentColor,
			}}
			className={className}
		>
			{ProgressSection}
		</BaseCard>
	)
}
