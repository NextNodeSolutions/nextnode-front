import { useCallback, useEffect, useRef } from 'react'

/**
 * Hook spécialisé pour la gestion des event listeners DOM sur les cartes
 * Sépare la logique DOM de la gestion d'état React
 */
export function useCardEventListeners(
	selector: string,
	onClick: (index: number) => void,
): { initializeListeners: () => boolean; cleanup: () => void } {
	const cleanupRef = useRef<(() => void) | null>(null)

	/**
	 * Attache les event listeners aux éléments correspondant au sélecteur
	 */
	const attachListeners = useCallback((): void => {
		// Nettoyage des anciens listeners
		if (cleanupRef.current) {
			cleanupRef.current()
		}

		const elements = document.querySelectorAll(selector)
		const listeners: Array<{ element: Element; handler: EventListener }> =
			[]

		elements.forEach((element, index) => {
			const eventHandler = (): void => {
				// Récupère l'index depuis l'attribut data ou utilise l'index de l'élément
				const stepIndex = element.getAttribute('data-step-index')
				const cardIndex = stepIndex ? parseInt(stepIndex, 10) : index

				if (!isNaN(cardIndex)) {
					onClick(cardIndex)
				}
			}

			element.addEventListener('click', eventHandler)
			listeners.push({ element, handler: eventHandler })
		})

		// Fonction de nettoyage
		cleanupRef.current = (): void => {
			listeners.forEach(({ element, handler }) => {
				element.removeEventListener('click', handler)
			})
		}
	}, [selector, onClick])

	/**
	 * Initialise les listeners quand les éléments sont prêts dans le DOM
	 */
	const initializeListeners = useCallback((): boolean => {
		// Vérification immédiate
		const elements = document.querySelectorAll(selector)
		if (elements.length > 0) {
			attachListeners()
			return true
		}

		// Si pas d'éléments, utiliser MutationObserver
		const observer = new MutationObserver((): void => {
			const elements = document.querySelectorAll(selector)
			if (elements.length > 0) {
				attachListeners()
				observer.disconnect()
			}
		})

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		})

		// Nettoyage de l'observer après timeout
		const timeout = setTimeout((): void => {
			observer.disconnect()
			attachListeners() // Tentative finale
		}, 2000)

		cleanupRef.current = (): void => {
			observer.disconnect()
			clearTimeout(timeout)
		}

		return false
	}, [selector, attachListeners])

	/**
	 * Nettoyage manuel des listeners
	 */
	const cleanup = useCallback((): void => {
		if (cleanupRef.current) {
			cleanupRef.current()
			cleanupRef.current = null
		}
	}, [])

	// Nettoyage automatique au démontage
	useEffect(() => cleanup, [cleanup])

	return {
		initializeListeners,
		cleanup,
	}
}
