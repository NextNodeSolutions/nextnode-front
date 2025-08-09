import { useEffect, useCallback } from 'react'

export interface KeyboardHandlers {
	/** Gestionnaire pour la touche Escape */
	onEscape?: () => void
	/** Gestionnaire pour les touches fléchées */
	onArrowLeft?: () => void
	onArrowRight?: () => void
	onArrowUp?: () => void
	onArrowDown?: () => void
	/** Gestionnaire pour Entrée */
	onEnter?: () => void
	/** Condition pour activer les raccourcis (par ex: modal ouverte) */
	enabled?: boolean
}

/**
 * Hook spécialisé pour la gestion des raccourcis clavier
 * Sépare la logique clavier du reste de la gestion d'état
 */
export function useKeyboardShortcuts(handlers: KeyboardHandlers): void {
	const {
		onEscape,
		onArrowLeft,
		onArrowRight,
		onArrowUp,
		onArrowDown,
		onEnter,
		enabled = true,
	} = handlers

	const handleKeyDown = useCallback(
		(event: KeyboardEvent): void => {
			if (!enabled) return

			switch (event.key) {
				case 'Escape':
					onEscape?.()
					break
				case 'ArrowLeft':
					onArrowLeft?.()
					break
				case 'ArrowRight':
					onArrowRight?.()
					break
				case 'ArrowUp':
					onArrowUp?.()
					break
				case 'ArrowDown':
					onArrowDown?.()
					break
				case 'Enter':
					onEnter?.()
					break
			}
		},
		[
			enabled,
			onEscape,
			onArrowLeft,
			onArrowRight,
			onArrowUp,
			onArrowDown,
			onEnter,
		],
	)

	useEffect(() => {
		if (!enabled) return undefined

		document.addEventListener('keydown', handleKeyDown)

		return (): void => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [enabled, handleKeyDown])
}
