import CalEmbed from '@/components/ui/CalEmbed'
import { cn } from '@/lib/core/utils'

import type { Locale } from '@/types/i18n'

export interface PremiumCalButtonProps {
	/** Cal.com username/link (e.g., 'walid-mos') */
	calLink: string
	/** Button text */
	buttonText: string
	/** Locale for i18n */
	locale: Locale
}

/**
 * Premium styled Cal.com button for hero sections
 * Uses only Tailwind classes following CLAUDE.md guidelines
 * Replaces the custom CSS from PremiumHero.astro
 */
export const PremiumCalButton = ({
	calLink,
	buttonText,
	locale,
}: PremiumCalButtonProps) => {
	return (
		<CalEmbed
			calLink={calLink}
			mode="popup"
			buttonText={buttonText}
			locale={locale}
			buttonClassName={cn(
				// Base structural classes - reset default styles
				'relative overflow-hidden rounded-xl',
				'px-6 py-3 font-bold text-sm text-white',
				'shadow-xl transition-all duration-300',
				'!bg-transparent', // Override CalEmbed's default background

				// Responsive breakpoints
				'sm:px-8 sm:py-4 sm:text-base',
				'md:text-lg',

				// Hover states
				'hover:scale-105',
				'hover:shadow-2xl hover:shadow-blue-500/50',

				// Gradient background pseudo-element (::before)
				'before:absolute before:inset-0 before:-z-10',
				'before:bg-gradient-to-r',
				'before:from-brand-blue before:via-brand-green-muted before:to-brand-green',
				'before:bg-[length:200%_200%]',
				'before:animate-gradient-shift',

				// Speed up animation on hover
				'hover:before:duration-[2s]',

				// Border effect pseudo-element (::after)
				'after:absolute after:inset-0 after:rounded-xl',
				'after:border-2 after:border-white/20',
				'after:pointer-events-none',

				// Button content flex layout
				'flex items-center justify-center gap-2',
			)}
		/>
	)
}

export default PremiumCalButton
