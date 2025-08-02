import { useCallback, useEffect, useRef } from 'react'

import { domUtils } from '@/lib/modal-utils'

import type { UseWorkflowInteractionReturn } from '@/types/workflow'

/**
 * Hook personnalisé pour gérer les interactions avec les cartes du workflow
 * Gère les event listeners et le nettoyage automatique
 */
export function useWorkflowInteraction(
	onCardClick: (index: number) => void,
): UseWorkflowInteractionReturn {
	const cleanupRef = useRef<(() => void) | null>(null)

	/**
	 * Initialise les event listeners sur les cartes
	 */
	const initializeCardListeners = useCallback(() => {
		// Nettoie les anciens listeners s'ils existent
		if (cleanupRef.current) {
			cleanupRef.current()
		}

		// Ajoute les nouveaux listeners
		cleanupRef.current = domUtils.addEventListeners(
			'[data-step-card]',
			'click',
			(element, index) => {
				// Récupère l'index depuis l'attribut data ou utilise l'index de l'élément
				const stepIndex = element.getAttribute('data-step-index')
				const cardIndex = stepIndex ? parseInt(stepIndex, 10) : index

				if (!isNaN(cardIndex)) {
					onCardClick(cardIndex)
				}
			},
		)
	}, [onCardClick])

	/**
	 * Nettoie les event listeners
	 */
	const cleanup = useCallback(() => {
		if (cleanupRef.current) {
			cleanupRef.current()
			cleanupRef.current = null
		}
	}, [])

	/**
	 * Nettoie automatiquement lors du démontage
	 */
	useEffect(() => cleanup, [cleanup])

	return {
		initializeCardListeners,
		cleanup,
	}
}
