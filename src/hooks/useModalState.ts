import { useState, useCallback } from 'react'

/**
 * Hook spécialisé pour la gestion d'état des modales
 * Gère seulement l'état, pas les interactions DOM
 */
export function useModalState(initialIndex: number | null = null): {
	openModalIndex: number | null
	openModal: (index: number) => void
	closeModal: () => void
	toggleModal: (index: number) => void
	isModalOpen: (index: number) => boolean
	hasOpenModal: boolean
} {
	const [openModalIndex, setOpenModalIndex] = useState<number | null>(
		initialIndex,
	)

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
	 * Bascule l'état d'une modale (ouvrir si fermée, fermer si ouverte)
	 */
	const toggleModal = useCallback((index: number) => {
		setOpenModalIndex(prev => (prev === index ? null : index))
	}, [])

	/**
	 * Vérifie si une modale spécifique est ouverte
	 */
	const isModalOpen = useCallback(
		(index: number): boolean => openModalIndex === index,
		[openModalIndex],
	)

	/**
	 * Vérifie si une modale est actuellement ouverte
	 */
	const hasOpenModal = openModalIndex !== null

	return {
		openModalIndex,
		openModal,
		closeModal,
		toggleModal,
		isModalOpen,
		hasOpenModal,
	}
}
