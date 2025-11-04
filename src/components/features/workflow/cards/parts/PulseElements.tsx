/**
 * PulseElements - Decorative pulse animations for header
 * Two small circles with staggered animations
 */
export const PulseElements = () => {
	return (
		<>
			<div className="absolute top-2 left-2 h-4 w-4 animate-pulse rounded-full bg-white/20 blur-sm" />
			<div
				className="absolute right-2 bottom-2 h-3 w-3 animate-pulse rounded-full bg-white/30 blur-sm"
				style={{ animationDelay: '1s' }}
			/>
		</>
	)
}
