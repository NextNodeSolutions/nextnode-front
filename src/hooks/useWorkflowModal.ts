import { useState, useCallback, useEffect } from 'react'

import type { UseWorkflowModalReturn } from '@/types/workflow'

/**
 * Hook personnalisé pour gérer l'état des modales du workflow
 * Gère l'ouverture/fermeture et l'état actuel de la modale
 */
export function useWorkflowModal(): UseWorkflowModalReturn {
	const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)

	/**
	 * Ouvre une modale à l'index spécifié
	 */
	const openModal = useCallback((index: number) => {
		setOpenModalIndex(index)
	}, [])

	/**
	 * Ferme la modale actuellement ouverte
	 */
	const closeModal = useCallback(() => {
		setOpenModalIndex(null)
	}, [])

	/**
	 * Gère la fermeture via ESC
	 */
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent): void => {
			if (event.key === 'Escape' && openModalIndex !== null) {
				closeModal()
			}
		}

		if (openModalIndex !== null) {
			document.addEventListener('keydown', handleEscape)
			return (): void =>
				document.removeEventListener('keydown', handleEscape)
		}

		return undefined
	}, [openModalIndex, closeModal])

	return {
		openModalIndex,
		openModal,
		closeModal,
	}
}
