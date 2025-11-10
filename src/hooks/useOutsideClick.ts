import { useEffect } from 'react'

import type { RefObject } from 'react'

/**
 * Hook to detect clicks outside of a referenced element
 * Useful for closing modals, dropdowns, or expanded cards
 *
 * @param ref - React ref to the element to monitor
 * @param handler - Callback function to execute when outside click is detected
 */
const useOutsideClick = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	handler: () => void,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler()
			}
		}

		// Add event listeners for both mouse and touch events
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('touchstart', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [ref, handler])
}

export default useOutsideClick
