import { useCallback, useEffect, useRef } from 'react'

import { domUtils } from '@/lib/ui/modal-utils'

import type { UseWorkflowInteractionReturn } from '@/types/workflow'

/**
 * Custom hook to handle interactions with workflow cards
 * Handles event listeners and automatic cleanup
 */
export function useWorkflowInteraction(
	onCardClick: (index: number) => void,
): UseWorkflowInteractionReturn {
	const cleanupRef = useRef<(() => void) | null>(null)

	/**
	 * Initialize event listeners on cards
	 */
	const initializeCardListeners = useCallback(() => {
		// Clean up old listeners if they exist
		if (cleanupRef.current) {
			cleanupRef.current()
		}

		// Add new listeners
		cleanupRef.current = domUtils.addEventListeners(
			'[data-step-card]',
			'click',
			(element, index) => {
				// Get index from data attribute or use element index
				const stepIndex = element.getAttribute('data-step-index')
				const cardIndex = stepIndex ? parseInt(stepIndex, 10) : index

				if (!isNaN(cardIndex)) {
					onCardClick(cardIndex)
				}
			},
		)
	}, [onCardClick])

	/**
	 * Clean up event listeners
	 */
	const cleanup = useCallback(() => {
		if (cleanupRef.current) {
			cleanupRef.current()
			cleanupRef.current = null
		}
	}, [])

	/**
	 * Automatically clean up on unmount
	 */
	useEffect(() => cleanup, [cleanup])

	return {
		initializeCardListeners,
		cleanup,
	}
}
