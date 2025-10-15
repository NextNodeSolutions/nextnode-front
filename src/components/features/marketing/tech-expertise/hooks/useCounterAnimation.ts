import { useEffect, useState } from 'react'

interface UseCounterAnimationOptions {
	readonly targetValue: number
	readonly isVisible: boolean
	readonly delay?: number
	readonly duration?: number
	readonly steps?: number
}

/**
 * Reusable hook for animated counter effects
 * Animates from 0 to target value when element becomes visible
 */
const useCounterAnimation = ({
	targetValue,
	isVisible,
	delay = 0,
	duration = 1500,
	steps = 60,
}: UseCounterAnimationOptions): number => {
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		if (!isVisible) return

		const increment = targetValue / steps
		const stepDuration = duration / steps

		const timer = setTimeout(() => {
			let current = 0
			const interval = setInterval(() => {
				current += increment
				if (current >= targetValue) {
					setDisplayValue(targetValue)
					clearInterval(interval)
				} else {
					setDisplayValue(Math.floor(current))
				}
			}, stepDuration)

			return () => clearInterval(interval)
		}, delay)

		return () => clearTimeout(timer)
	}, [isVisible, targetValue, delay, duration, steps])

	return displayValue
}

export default useCounterAnimation
