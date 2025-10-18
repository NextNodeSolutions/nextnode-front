import { useDeferredValue, useEffect, useState } from 'react'

import type { RefObject } from 'react'

interface UseScrollAnimationOptions {
	readonly threshold?: number
	readonly rootMargin?: string
}

/**
 * Reusable hook for IntersectionObserver-based scroll animations
 * Detects when an element becomes visible in viewport
 */
const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	options: UseScrollAnimationOptions = {},
): boolean => {
	const { threshold = 0.3, rootMargin = '0px' } = options
	const [isVisible, setIsVisible] = useState(false)
	const deferredIsVisible = useDeferredValue(isVisible)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0]?.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold, rootMargin },
		)

		const currentRef = ref.current
		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [ref, threshold, rootMargin])

	return deferredIsVisible
}

export default useScrollAnimation
