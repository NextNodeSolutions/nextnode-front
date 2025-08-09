import { useCardEventListeners } from './useCardEventListeners'

import type { UseWorkflowInteractionReturn } from '@/types/workflow'

/**
 * Hook composite pour la gestion des interactions workflow
 * Simplifié grâce à la séparation des responsabilités
 */
export function useWorkflowInteraction(
	onCardClick: (index: number) => void,
): UseWorkflowInteractionReturn {
	const { initializeListeners, cleanup } = useCardEventListeners(
		'[data-step-card]',
		onCardClick,
	)

	return {
		initializeCardListeners: initializeListeners,
		cleanup,
	}
}
