import { useState, useCallback, useEffect } from 'react'

import type { UseWorkflowModalReturn } from '@/types/workflow'

/**
 * Custom hook to manage workflow modal state
 * Handles opening/closing and current modal state
 */
export function useWorkflowModal(): UseWorkflowModalReturn {
	const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)

	/**
	 * Opens a modal at the specified index
	 */
	const openModal = useCallback((index: number) => {
		setOpenModalIndex(index)
	}, [])

	/**
	 * Closes the currently open modal
	 */
	const closeModal = useCallback(() => {
		setOpenModalIndex(null)
	}, [])

	/**
	 * Handles closing via ESC key
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
