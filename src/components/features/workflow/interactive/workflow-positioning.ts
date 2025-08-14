import { DESKTOP_WORKFLOW_POSITIONS } from '../workflow-constants'

import type { WorkflowPosition } from '@/types/workflow'

export type WorkflowVariant = 'mini' | 'compact' | 'large'

// ViewBox dimensions - same as the working old version
export const VIEWBOX_WIDTH = 1000
export const VIEWBOX_HEIGHT = 500

// Card dimensions in viewBox units - aligned with actual Tailwind CSS dimensions
export const CARD_DIMENSIONS = {
	compact: { width: 200, height: 215 },
	mini: { width: 190, height: 155 },
	large: { width: 190, height: 180 },
} as const

/**
 * Calculate the correct rectangle position based on line direction and rectangle dimensions
 */
export function calculateRectangleWorkflowPosition(
	position: WorkflowPosition,
	width: number,
	height: number,
): { x: number; y: number } {
	// Offset by half the rectangle's width and height to center it on the line endpoint
	const x = position.x - width / 2
	const y = position.y - height / 2

	// Clamp values to ensure the rectangle stays within bounds
	const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH - width, x))
	const clampedY = Math.max(0, Math.min(VIEWBOX_HEIGHT - height, y))

	return { x: clampedX, y: clampedY }
}

/**
 * Get positioning data for workflow components
 */
export function getWorkflowWorkflowPositioning(variant: WorkflowVariant): {
	positions: WorkflowPosition[]
	cardWidth: number
	cardHeight: number
	stepCardVariant: 'compact' | 'mini'
	viewBox: { width: number; height: number }
} {
	const positions = DESKTOP_WORKFLOW_POSITIONS
	const { width: cardWidth, height: cardHeight } = CARD_DIMENSIONS[variant]

	// Map workflow-journey variants to StepCard variants
	const stepCardVariant = variant === 'large' ? 'compact' : variant

	return {
		positions,
		cardWidth,
		cardHeight,
		stepCardVariant,
		viewBox: {
			width: VIEWBOX_WIDTH,
			height: VIEWBOX_HEIGHT,
		},
	}
}

/**
 * Calculate positions for all step cards
 */
export function calculateAllStepWorkflowPositions(
	variant: WorkflowVariant,
): Array<{
	x: number
	y: number
	stepIndex: number
	originalWorkflowPosition: WorkflowPosition
}> {
	const { positions, cardWidth, cardHeight } =
		getWorkflowWorkflowPositioning(variant)

	return positions.map((position, index) => ({
		...calculateRectangleWorkflowPosition(position, cardWidth, cardHeight),
		stepIndex: index,
		originalWorkflowPosition: position,
	}))
}
