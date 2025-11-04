import { useEffect, useState } from 'react'

/**
 * useMediaQuery - React hook for responsive media queries
 *
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean - true if the media query matches, false otherwise
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export const useMediaQuery = (query: string): boolean => {
	// Server-side rendering safe: default to false
	const [matches, setMatches] = useState(() => {
		if (typeof window === 'undefined') return false
		return window.matchMedia(query).matches
	})

	useEffect(() => {
		// Skip if window is undefined (SSR)
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia(query)

		// Update state when media query changes
		const handleChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches)
		}

		// Set initial value
		setMatches(mediaQuery.matches)

		// Modern browsers: use addEventListener
		mediaQuery.addEventListener('change', handleChange)

		// Cleanup
		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	}, [query])

	return matches
}
