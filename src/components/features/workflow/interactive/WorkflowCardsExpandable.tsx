import { useState } from 'react'

import { translateSteps } from '@/lib/i18n/translate-utils'

import StepCard from '../cards/StepCard'
import { STEP_KEYS } from '../workflow-constants'

import type { StepKey } from '@/types/i18n'

interface WorkflowCardsExpandableProps {
	readonly stepLabel: string
	readonly clickToSeeMore: string
	readonly positions?: ReadonlyArray<{
		x: number
		y: number
		width: number
		height: number
	}>
}

/**
 * WorkflowCardsExpandable - Orchestrates expandable workflow cards
 * Manages global state: only one card can be expanded at a time
 *
 * Following SOLID principles:
 * - Single Responsibility: Only manages expansion state
 * - Open/Closed: Extensible via props without modification
 * - Dependency Inversion: Uses StepCard abstraction
 */
const WorkflowCardsExpandable = ({
	stepLabel,
	clickToSeeMore,
	positions,
}: WorkflowCardsExpandableProps) => {
	// State: index of the currently expanded card (null if none)
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

	const handleExpand = (index: number) => {
		setExpandedIndex(index)
	}

	const handleCollapse = () => {
		setExpandedIndex(null)
	}

	return (
		<>
			{STEP_KEYS.map((stepKey, index) => {
				const step = translateSteps(stepKey as StepKey)
				const position = positions?.[index]

				// Placeholder expanded content (to be customized later)
				const expandedContent = (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-gray-900 dark:text-white">
							Detailed Information
						</h4>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							This is a placeholder for expanded content. You can
							customize this with detailed information about{' '}
							{step.title}.
						</p>
						<div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
							<p className="text-xs text-gray-500 dark:text-gray-400">
								More content will be added here in the future.
							</p>
						</div>
					</div>
				)

				return (
					<div
						key={stepKey}
						className="animate-fade-in-card absolute"
						style={
							position
								? {
										left: `${position.x}%`,
										top: `${position.y}%`,
										width: `${position.width}%`,
										height: `${position.height}%`,
										animationDelay: `${index * 150}ms`,
									}
								: undefined
						}
					>
						<div className="step-card-wrapper h-full w-full">
							<StepCard
								stepKey={stepKey}
								index={index}
								number={step.number}
								title={step.title}
								description={step.description}
								stepLabel={stepLabel}
								clickToSeeMore={clickToSeeMore}
								isExpanded={expandedIndex === index}
								onExpand={() => handleExpand(index)}
								onCollapse={handleCollapse}
								expandedContent={expandedContent}
							/>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default WorkflowCardsExpandable
